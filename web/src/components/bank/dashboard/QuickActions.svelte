<script lang="ts">
  import { ArrowDownLeft, ArrowUpRight, FileText, Send, type LucideIcon } from '@lucide/svelte'
  import { push } from 'svelte-spa-router'
  import { toast } from 'svelte-sonner'
  import { m } from '@/lib/i18n.svelte'
  import { PATHS } from '@/lib/routes'

  interface Action {
    id: string
    label: () => string
    icon: LucideIcon
    /** Where the action leads; an action without one is announced, not built yet. */
    path?: string
  }

  const actions: Action[] = [
    {
      id: 'transfer',
      label: () => m.dashboard_action_transfer(),
      icon: Send,
      path: PATHS.transfers,
    },
    { id: 'deposit', label: () => m.dashboard_action_deposit(), icon: ArrowDownLeft },
    { id: 'withdraw', label: () => m.dashboard_action_withdraw(), icon: ArrowUpRight },
    {
      id: 'statement',
      label: () => m.dashboard_action_statement(),
      icon: FileText,
      path: PATHS.history,
    },
  ]

  const run = (action: Action): void => {
    if (action.path) {
      push(action.path)
    } else {
      toast.info(m.dashboard_soon())
    }
  }
</script>

<div class="grid grid-cols-4 gap-3">
  {#each actions as action (action.id)}
    <button
      type="button"
      class="sk-glass sk-glass--hover sk-focus flex flex-col items-start gap-4 p-4"
      onclick={() => run(action)}
    >
      <span class="sk-tile h-9 w-9 bg-sk-tint text-sk-accent">
        <action.icon class="h-4 w-4" />
      </span>
      <span class="text-[13px] font-medium text-sk">{action.label()}</span>
    </button>
  {/each}
</div>
