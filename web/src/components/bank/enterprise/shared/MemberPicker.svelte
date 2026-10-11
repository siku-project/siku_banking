<script lang="ts">
  import { Check } from '@lucide/svelte'
  import MemberAvatar from '@/components/bank/enterprise/shared/MemberAvatar.svelte'
  import type { Member } from '@/lib/enterprise.svelte'

  let {
    selected = $bindable(null),
    members,
    label,
  }: { selected?: number | null; members: Member[]; label: string } = $props()
</script>

<div class="flex flex-col gap-2">
  <span class="sk-label">{label}</span>
  <div class="sk-scroll flex max-h-[240px] flex-col gap-1.5 overflow-y-auto pr-1">
    {#each members as member (member.id)}
      {@const active = selected === member.id}
      <button
        type="button"
        class="sk-row sk-focus flex items-center gap-3 px-3 py-2.5 text-left"
        class:sk-row--active={active}
        aria-pressed={active}
        onclick={() => (selected = member.id)}
      >
        <MemberAvatar name={member.name} />
        <span class="flex min-w-0 flex-1 flex-col leading-tight">
          <span class="truncate text-[13px] font-medium text-sk">{member.name}</span>
          <span class="truncate text-[11px] text-sk-soft">
            {member.role}
          </span>
        </span>
        {#if active}
          <Check class="h-4 w-4 text-sk-accent" />
        {/if}
      </button>
    {/each}
  </div>
</div>
