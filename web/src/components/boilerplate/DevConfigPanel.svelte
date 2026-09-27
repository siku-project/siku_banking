<script lang="ts">
  import { Settings2 } from '@lucide/svelte'
  import { Button } from '$lib/components/ui/button'
  import * as Dialog from '$lib/components/ui/dialog'
  import { Label } from '$lib/components/ui/label'
  import { Separator } from '$lib/components/ui/separator'
  import { Switch } from '$lib/components/ui/switch'
  import * as Tooltip from '$lib/components/ui/tooltip'
  import { app } from '@/lib/app.svelte'
  import { locale } from '@/lib/locale.svelte'

  let open = $state(false)
</script>

<div class="fixed bottom-7 left-24 z-50">
  <Tooltip.Provider>
    <Tooltip.Root>
      <Tooltip.Trigger>
        {#snippet child({ props })}
          <Button
            {...props}
            variant="outline"
            size="icon"
            class="sk-panel h-12 w-12 !rounded-full text-sk-soft hover:text-sk"
            onclick={() => (open = true)}
          >
            <Settings2 class="h-[17px] w-[17px]" />
          </Button>
        {/snippet}
      </Tooltip.Trigger>
      <Tooltip.Content side="right" class="sk-panel border-white/[0.08] text-xs text-sk-body">
        Simulation
      </Tooltip.Content>
    </Tooltip.Root>
  </Tooltip.Provider>

  <Dialog.Root bind:open>
    <Dialog.Content
      class="sk-panel w-[440px] gap-0 border-white/[0.105] bg-[var(--sk-panel)] p-7 sm:rounded-[var(--sk-radius-panel)]"
    >
      <Dialog.Header class="mb-6 space-y-1 text-center sm:text-center">
        <Dialog.Title class="sk-label text-center font-medium">Simulation</Dialog.Title>
        <Dialog.Description class="text-xs text-sk-faint">
          What the server would send. Nothing here reaches the game.
        </Dialog.Description>
      </Dialog.Header>

      <div class="flex flex-col gap-5">
        <div class="flex items-center justify-between">
          <Label for="dev-visible" class="text-sm text-sk-body">Interface visible</Label>
          <Switch
            id="dev-visible"
            checked={app.visible}
            onCheckedChange={(value) => app.setVisible(value)}
          />
        </div>

        <Separator class="bg-white/[0.085]" />

        <div class="flex items-center justify-between">
          <span class="text-sm text-sk-body">Language</span>
          <div class="flex gap-1.5">
            {#each locale.all as language (language)}
              <button
                type="button"
                class="sk-chip px-3 py-1.5 text-xs uppercase {locale.current === language
                  ? 'sk-chip--active'
                  : ''}"
                onclick={() => locale.set(language)}
              >
                {language}
              </button>
            {/each}
          </div>
        </div>
      </div>
    </Dialog.Content>
  </Dialog.Root>
</div>
