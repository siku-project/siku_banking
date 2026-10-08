<script lang="ts">
  import MemberAvatar from '@/components/bank/enterprise/shared/MemberAvatar.svelte'
  import Amount from '@/components/bank/shared/Amount.svelte'
  import GlassCard from '@/components/bank/shared/GlassCard.svelte'
  import type { CompanyOperation } from '@/lib/enterprise.svelte'
  import { formatTime } from '@/lib/format'
  import { m } from '@/lib/i18n.svelte'
  import { dayLabel } from '@/lib/labels'
  import { locale } from '@/lib/locale.svelte'

  let { operations }: { operations: CompanyOperation[] } = $props()
</script>

<GlassCard padding="sm" class="flex flex-col gap-2">
  <span class="sk-title px-3 pt-1 text-[15px]">{m.transfers_recent()}</span>

  {#if operations.length === 0}
    <p class="px-3 py-4 text-[12.5px] text-sk-faint">{m.transfers_recent_hint()}</p>
  {:else}
    <div class="flex flex-col">
      {#each operations as operation (operation.id)}
        <div
          class="flex items-center gap-3 rounded-[var(--sk-radius-row)] px-3 py-2.5 transition-colors hover:bg-sk-hover"
        >
          <MemberAvatar name={operation.author} size={30} />
          <div class="flex min-w-0 flex-1 flex-col gap-0.5">
            <span class="truncate text-[13px] font-medium text-sk">{operation.label}</span>
            <span class="truncate text-[11px] text-sk-soft">
              {dayLabel(operation.at, locale.current)} · {formatTime(operation.at, locale.current)}
              · {operation.author}
            </span>
          </div>
          <Amount value={operation.amount} size="sm" signed />
        </div>
      {/each}
    </div>
  {/if}
</GlassCard>
