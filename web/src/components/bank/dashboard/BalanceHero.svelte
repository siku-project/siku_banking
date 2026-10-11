<script lang="ts">
  import { TrendingDown, TrendingUp } from '@lucide/svelte'
  import Amount from '@/components/bank/shared/Amount.svelte'
  import GlassCard from '@/components/bank/shared/GlassCard.svelte'
  import { bank } from '@/lib/bank.svelte'
  import { formatAccountNumber, formatAmount } from '@/lib/format'
  import { m } from '@/lib/i18n.svelte'
  import { locale } from '@/lib/locale.svelte'
</script>

<GlassCard padding="lg" class="hero relative overflow-hidden">
  <div class="hero__glow"></div>

  <div class="relative flex items-start justify-between gap-8">
    <div class="flex flex-col gap-4">
      <span class="sk-label">{m.dashboard_total_balance()}</span>
      <Amount value={bank.totalBalance} size="xl" />

      <span class="text-sm text-sk-muted">
        {m.dashboard_monthly_delta({
          amount: formatAmount(bank.monthly.net, locale.current, true),
        })}
      </span>
    </div>

    <div class="flex flex-col items-end gap-5">
      {#if bank.mainAccount}
        <div class="flex flex-col items-end gap-1">
          <span class="sk-label">{m.dashboard_main_account()}</span>
          <span class="sk-mono text-sm tracking-[0.12em] text-sk-body">
            {formatAccountNumber(bank.mainAccount.number)}
          </span>
        </div>
      {/if}

      <div class="flex gap-3">
        <div
          class="flex items-center gap-2.5 rounded-[var(--sk-radius-control)] border border-sk-soft bg-sk-quiet px-3.5 py-2"
        >
          <TrendingUp class="h-3.5 w-3.5 text-sk-accent" />
          <div class="flex flex-col leading-tight">
            <span class="text-[10px] uppercase tracking-[0.16em] text-sk-soft">
              {m.dashboard_month_in()}
            </span>
            <Amount value={bank.monthly.credits} size="sm" class="text-sk-accent" />
          </div>
        </div>
        <div
          class="flex items-center gap-2.5 rounded-[var(--sk-radius-control)] border border-sk-soft bg-sk-quiet px-3.5 py-2"
        >
          <TrendingDown class="h-3.5 w-3.5 text-sk-soft" />
          <div class="flex flex-col leading-tight">
            <span class="text-[10px] uppercase tracking-[0.16em] text-sk-soft">
              {m.dashboard_month_out()}
            </span>
            <Amount value={-bank.monthly.debits} size="sm" signed class="text-sk-body" />
          </div>
        </div>
      </div>
    </div>
  </div>
</GlassCard>

<style>
  .hero__glow {
    position: absolute;
    right: -120px;
    top: -160px;
    width: 420px;
    height: 420px;
    border-radius: 9999px;
    background: radial-gradient(circle, var(--sk-accent-haze) 0%, transparent 60%);
    pointer-events: none;
  }
</style>
