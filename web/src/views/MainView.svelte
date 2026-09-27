<script lang="ts">
  import { fade } from 'svelte/transition'
  import { X } from '@lucide/svelte'
  import { Button } from '$lib/components/ui/button'
  import { app } from '@/lib/app.svelte'
  import { m } from '@/lib/i18n.svelte'
  import { RESOURCE } from '@/lib/nui'
</script>

{#if app.visible}
  <div
    class="fixed inset-0 z-40 flex items-center justify-center"
    transition:fade={{ duration: 200 }}
  >
    <div class="sk-panel flex w-[420px] flex-col gap-6 p-8">
      <div class="flex items-center justify-between">
        <span class="sk-brand">{m.app_title({ name: RESOURCE })}</span>
        <Button
          variant="ghost"
          size="icon"
          class="h-8 w-8 text-sk-soft hover:text-sk"
          aria-label={m.app_close()}
          onclick={() => app.close()}
        >
          <X class="h-4 w-4" />
        </Button>
      </div>

      <div class="sk-rule"></div>

      <p class="text-sm text-sk-body">{m.app_hint()}</p>
    </div>
  </div>
{/if}
