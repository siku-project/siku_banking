<script lang="ts">
  import Amount from '@/components/bank/shared/Amount.svelte'
  import EmptyState from '@/components/bank/shared/EmptyState.svelte'
  import GlassCard from '@/components/bank/shared/GlassCard.svelte'
  import type { CompanyOperation } from '@/lib/enterprise.svelte'
  import { enterprise } from '@/lib/enterprise.svelte'
  import { formatTime } from '@/lib/format'
  import { m } from '@/lib/i18n.svelte'
  import { CATEGORY_ICONS, dayLabel } from '@/lib/labels'
  import { locale } from '@/lib/locale.svelte'

  let { operations, title }: { operations: CompanyOperation[]; title?: string } = $props()

  const initialsOf = (name: string): string =>
    name
      .split(/\s+/)
      .map((part) => part.charAt(0).toUpperCase())
      .slice(0, 2)
      .join('')
</script>

<GlassCard padding="sm" class="flex flex-col gap-2">
  <span class="sk-title px-3 pt-1 text-[15px]">{title ?? m.enterprise_operations()}</span>

  {#if operations.length === 0}
    <EmptyState title={m.enterprise_operations_empty()} hint={m.common_empty_hint()} />
  {:else}
    <div class="flex flex-col">
      {#each operations as operation, index (operation.id)}
        {@const Icon = CATEGORY_ICONS[operation.category]}
        {#if index > 0}
          <div class="sk-rule mx-3"></div>
        {/if}
        <div
          class="flex items-center gap-4 rounded-[var(--sk-radius-row)] px-3 py-3 transition-colors hover:bg-sk-hover"
        >
          <span class="sk-tile h-10 w-10 shrink-0 border border-sk-soft bg-sk-quiet text-sk-muted">
            <Icon class="h-4 w-4" />
          </span>

          <div class="flex min-w-0 flex-1 flex-col gap-0.5">
            <span class="truncate text-sm font-medium text-sk">{operation.label}</span>
            <span class="truncate text-xs text-sk-soft">
              {enterprise.account(operation.accountId)?.label ?? ''}
            </span>
          </div>

          <span class="author" title={operation.author}>
            <span class="author__mark sk-mono">{initialsOf(operation.author)}</span>
            <span class="truncate">{operation.author}</span>
          </span>

          <div class="flex w-[88px] shrink-0 flex-col items-end gap-0.5">
            <span class="text-xs text-sk-muted">{dayLabel(operation.at, locale.current)}</span>
            <span class="sk-mono text-[11px] text-sk-faint">
              {formatTime(operation.at, locale.current)}
            </span>
          </div>

          <Amount value={operation.amount} signed class="w-[110px] text-right" />
        </div>
      {/each}
    </div>
  {/if}
</GlassCard>

<style>
  .author {
    display: flex;
    align-items: center;
    gap: 8px;
    width: 150px;
    flex-shrink: 0;
    font-size: 12px;
    color: var(--sk-text-muted);
  }

  .author__mark {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 24px;
    flex-shrink: 0;
    border-radius: 9999px;
    border: 1px solid var(--sk-border);
    background: var(--sk-quiet);
    font-size: 9.5px;
    font-weight: 600;
    color: var(--sk-text-body);
  }
</style>
