<script lang="ts">
  import { Pencil, Star } from '@lucide/svelte'
  import AccessSection from '@/components/bank/enterprise/accounts/AccessSection.svelte'
  import CompanyCardsSection from '@/components/bank/enterprise/accounts/CompanyCardsSection.svelte'
  import OperationsList from '@/components/bank/enterprise/OperationsList.svelte'
  import LabelDialog from '@/components/bank/enterprise/shared/LabelDialog.svelte'
  import Amount from '@/components/bank/shared/Amount.svelte'
  import GlassCard from '@/components/bank/shared/GlassCard.svelte'
  import StateBadge from '@/components/bank/shared/StateBadge.svelte'
  import { enterpriseApi } from '@/lib/enterprise-api'
  import { settleAction } from '@/lib/enterprise-actions'
  import { enterprise, type CompanyAccount } from '@/lib/enterprise.svelte'
  import { formatAccountNumber, formatPercent } from '@/lib/format'
  import { m } from '@/lib/i18n.svelte'
  import { locale } from '@/lib/locale.svelte'

  let { account, companyId }: { account: CompanyAccount; companyId: number } = $props()

  let renaming = $state(false)

  const share = $derived(
    enterprise.summary.treasury > 0 ? account.balance / enterprise.summary.treasury : 0,
  )

  const rename = (label: string): Promise<boolean> =>
    settleAction(
      enterpriseApi.renameAccount({ companyId, accountId: account.id, label }),
      m.accounts_renamed_toast(),
    )
</script>

<div class="flex flex-col gap-6">
  <GlassCard padding="lg" class="relative overflow-hidden">
    <div class="glow"></div>

    <div class="relative flex flex-col gap-6">
      <div class="flex items-start justify-between gap-6">
        <div class="flex flex-col gap-2">
          <div class="flex items-center gap-2.5">
            <h2 class="text-[22px] font-semibold tracking-[-0.01em] text-sk">{account.label}</h2>
            {#if account.main}
              <span class="sk-badge sk-badge--accent">
                <Star class="h-3 w-3 fill-current" />
                {m.enterprise_account_main()}
              </span>
            {/if}
          </div>
          <span class="sk-mono text-[12px] tracking-[0.14em] text-sk-soft">
            {formatAccountNumber(account.number)}
          </span>
        </div>
        <StateBadge state={account.state} />
      </div>

      <div class="flex items-end justify-between gap-6">
        <div class="flex flex-col gap-1.5">
          <span class="sk-label">{m.accounts_balance()}</span>
          <Amount value={account.balance} size="xl" />
        </div>

        <div class="flex flex-col items-end gap-3">
          <button
            type="button"
            class="sk-btn sk-btn--ghost !px-4"
            onclick={() => (renaming = true)}
          >
            <Pencil class="h-3.5 w-3.5" />
            {m.accounts_rename()}
          </button>
        </div>
      </div>

      <div class="flex flex-col gap-2">
        <div class="flex items-center justify-between text-[11.5px]">
          <span class="text-sk-muted">{m.enterprise_account_share()}</span>
          <span class="sk-mono text-sk-body">{formatPercent(share, locale.current)}</span>
        </div>
        <span class="bar">
          <span class="bar__fill" style:width="{share * 100}%"></span>
        </span>
      </div>
    </div>
  </GlassCard>

  <AccessSection {account} {companyId} />
  <CompanyCardsSection {account} {companyId} />
  <OperationsList
    operations={enterprise.operationsOf(account.id).slice(0, 8)}
    title={m.accounts_transactions()}
  />
</div>

<LabelDialog
  bind:open={renaming}
  title={m.accounts_rename()}
  description={m.enterprise_account_rename_text()}
  label={m.accounts_label()}
  initial={account.label}
  confirm={m.common_save()}
  onSubmit={rename}
/>

<style>
  .glow {
    position: absolute;
    right: -140px;
    top: -180px;
    width: 420px;
    height: 420px;
    border-radius: 9999px;
    background: radial-gradient(circle, var(--sk-accent-haze) 0%, transparent 60%);
    pointer-events: none;
  }

  .bar {
    display: block;
    height: 4px;
    overflow: hidden;
    border-radius: 9999px;
    background: var(--sk-rule);
  }

  .bar__fill {
    display: block;
    height: 100%;
    border-radius: inherit;
    background: var(--sk-accent);
    box-shadow: 0 0 10px var(--sk-accent-glow);
  }
</style>
