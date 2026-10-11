<script lang="ts">
  import MemberAvatar from '@/components/bank/enterprise/shared/MemberAvatar.svelte'
  import Amount from '@/components/bank/shared/Amount.svelte'
  import EmptyState from '@/components/bank/shared/EmptyState.svelte'
  import GlassCard from '@/components/bank/shared/GlassCard.svelte'
  import { companyHistory } from '@/lib/company-history.svelte'
  import { enterprise } from '@/lib/enterprise.svelte'
  import { formatTime } from '@/lib/format'
  import { m } from '@/lib/i18n.svelte'
  import { CATEGORY_ICONS, categoryLabel, dayLabel } from '@/lib/labels'
  import { locale } from '@/lib/locale.svelte'
</script>

{#if companyHistory.groups.length === 0}
  <GlassCard padding="none">
    <EmptyState title={m.history_empty_title()} hint={m.history_empty_hint()} />
  </GlassCard>
{:else}
  <div class="flex flex-col gap-4">
    {#each companyHistory.groups as group (group.day)}
      <GlassCard padding="sm" class="flex flex-col gap-1">
        <div class="flex items-center justify-between px-3 pb-1 pt-1.5">
          <span class="sk-label">{dayLabel(group.day, locale.current, true)}</span>
          <span class="flex items-center gap-2 text-[11px] text-sk-faint">
            {m.history_day_net()}
            <Amount value={group.net} size="sm" signed class="text-sk-muted" />
          </span>
        </div>

        <div class="flex flex-col">
          {#each group.items as operation, index (operation.id)}
            {@const Icon = CATEGORY_ICONS[operation.category]}
            {#if index > 0}
              <div class="sk-rule mx-3"></div>
            {/if}
            <div
              class="flex items-center gap-4 rounded-[var(--sk-radius-row)] px-3 py-3 transition-colors hover:bg-sk-hover"
            >
              <span
                class="sk-tile h-10 w-10 shrink-0 border border-sk-soft bg-sk-quiet text-sk-muted"
              >
                <Icon class="h-4 w-4" />
              </span>

              <div class="flex min-w-0 flex-1 flex-col gap-0.5">
                <span class="truncate text-sm font-medium text-sk">{operation.label}</span>
                <span class="truncate text-xs text-sk-soft">
                  {categoryLabel(operation.category)} · {enterprise.account(operation.accountId)
                    ?.label ?? ''}
                </span>
              </div>

              <span class="flex w-[170px] shrink-0 items-center gap-2 text-[12px] text-sk-muted">
                <MemberAvatar name={operation.author} size={24} />
                <span class="truncate">{operation.author}</span>
              </span>

              <span class="sk-mono w-[52px] shrink-0 text-right text-[11px] text-sk-faint">
                {formatTime(operation.at, locale.current)}
              </span>

              <Amount value={operation.amount} signed class="w-[110px] text-right" />
            </div>
          {/each}
        </div>
      </GlassCard>
    {/each}
  </div>
{/if}
