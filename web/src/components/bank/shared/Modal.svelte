<script lang="ts">
  import { Dialog } from 'bits-ui'
  import type { Snippet } from 'svelte'

  let {
    open = $bindable(false),
    title,
    description,
    width = 440,
    onClose,
    children,
    footer,
  }: {
    open?: boolean
    title: string
    description?: string
    width?: number
    /** Called when the dialog closes itself, on Escape or a click outside. */
    onClose?: () => void
    children: Snippet
    footer?: Snippet
  } = $props()
</script>

<Dialog.Root bind:open onOpenChange={(value) => !value && onClose?.()}>
  <Dialog.Portal>
    <Dialog.Overlay
      class="modal__overlay fixed inset-0 z-[60] data-[state=closed]:animate-out data-[state=open]:animate-in data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"
    />
    <Dialog.Content
      class="modal sk-panel fixed left-1/2 top-1/2 z-[70] flex -translate-x-1/2 -translate-y-1/2 flex-col data-[state=closed]:animate-out data-[state=open]:animate-in data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95"
      style="width: min({width}px, 92vw)"
    >
      <div class="flex flex-col gap-1.5 px-7 pt-7">
        <Dialog.Title class="sk-title">{title}</Dialog.Title>
        {#if description}
          <Dialog.Description class="text-[13px] leading-relaxed text-sk-muted">
            {description}
          </Dialog.Description>
        {/if}
      </div>

      <div class="flex flex-col gap-5 px-7 py-6">
        {@render children()}
      </div>

      {#if footer}
        <div class="flex items-center justify-end gap-2.5 border-t border-sk-soft px-7 py-5">
          {@render footer()}
        </div>
      {/if}
    </Dialog.Content>
  </Dialog.Portal>
</Dialog.Root>

<style>
  :global(.modal__overlay) {
    background: rgba(6, 7, 9, 0.55);
  }

  :global(.modal) {
    animation-duration: 220ms;
  }
</style>
