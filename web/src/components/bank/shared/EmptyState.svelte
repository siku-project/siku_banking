<script lang="ts">
  import { Inbox } from '@lucide/svelte'
  import { m } from '@/lib/i18n.svelte'

  let { title, hint }: { title?: string; hint?: string } = $props()
</script>

<div class="flex flex-col items-center gap-3 px-6 py-12 text-center">
  <span class="sk-tile h-12 w-12 border border-sk-soft bg-sk-quiet">
    <Inbox class="h-5 w-5 text-sk-soft" />
  </span>
  <span class="text-sm font-medium text-sk-muted">{title ?? m.common_empty_title()}</span>
  <span class="text-xs text-sk-faint">{hint ?? m.common_empty_hint()}</span>
</div>
