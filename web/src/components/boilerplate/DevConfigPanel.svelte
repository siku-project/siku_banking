<script lang="ts">
  import { RotateCcw, Settings2 } from '@lucide/svelte'
  import { toast } from 'svelte-sonner'
  import { Button } from '$lib/components/ui/button'
  import * as Dialog from '$lib/components/ui/dialog'
  import { Input } from '$lib/components/ui/input'
  import { Label } from '$lib/components/ui/label'
  import { Separator } from '$lib/components/ui/separator'
  import { Switch } from '$lib/components/ui/switch'
  import * as Tooltip from '$lib/components/ui/tooltip'
  import { app } from '@/lib/app.svelte'
  import { bank } from '@/lib/bank.svelte'
  import { formatAmount } from '@/lib/format'
  import { locale } from '@/lib/locale.svelte'
  import { mockCustomer, mockData, readScenario, SCENARIOS, type Scenario } from '@/lib/mock'
  import { onboarding } from '@/lib/onboarding.svelte'
  import { session } from '@/lib/session.svelte'
  import { theme } from '@/lib/theme.svelte'

  const INCOMING_AMOUNT = 1250

  let open = $state(false)
  let scenario = $state<Scenario>(readScenario())

  const pickScenario = (value: Scenario): void => {
    scenario = value
    bank.patch(mockData(value))
    bank.select(null)
    session.setCustomer(mockCustomer(value))
    onboarding.begin()
  }

  const replayIntro = (): void => {
    open = false
    session.start()
  }

  const replayOnboarding = (): void => {
    open = false
    session.setCustomer({ onboarded: false })
    bank.patch({ accounts: [], cards: [], transactions: [] })
    onboarding.begin()
  }

  const simulateIncoming = (): void => {
    const target = bank.mainAccount

    if (!target) {
      toast.error('No account to credit')
      return
    }

    bank.receive({ accountId: target.id, amount: INCOMING_AMOUNT, label: 'Marcus Doe' })
    toast.success(`${formatAmount(INCOMING_AMOUNT, locale.current, true)} received`)
  }
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
      <Tooltip.Content side="right" class="sk-panel border-sk-soft text-xs text-sk-body">
        Simulation
      </Tooltip.Content>
    </Tooltip.Root>
  </Tooltip.Provider>

  <Dialog.Root bind:open>
    <Dialog.Content
      class="sk-panel sk-scroll max-h-[85vh] w-[460px] gap-0 overflow-y-auto border-sk-soft bg-[var(--sk-panel)] p-7 sm:rounded-[var(--sk-radius-panel)]"
    >
      <Dialog.Header class="mb-6 space-y-1 text-center sm:text-center">
        <Dialog.Title class="sk-label text-center font-medium">Simulation</Dialog.Title>
        <Dialog.Description class="text-xs text-sk-faint">
          What the server would send. Nothing here reaches the game.
        </Dialog.Description>
      </Dialog.Header>

      <div class="flex flex-col gap-5">
        <p class="sk-label">Interface</p>

        <div class="flex items-center justify-between">
          <Label for="dev-visible" class="text-sm text-sk-body">Interface visible</Label>
          <Switch
            id="dev-visible"
            checked={app.visible}
            onCheckedChange={(value) => app.setVisible(value)}
          />
        </div>

        <div class="flex items-center justify-between">
          <Label for="dev-theme" class="text-sm text-sk-body">Light mode</Label>
          <Switch
            id="dev-theme"
            checked={!theme.isDark}
            onCheckedChange={(value) => theme.set(value ? 'light' : 'dark')}
          />
        </div>

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

        <Separator class="bg-sk-rule" />

        <p class="sk-label">Customer</p>

        <div class="grid grid-cols-2 gap-3">
          <div class="flex flex-col gap-1.5">
            <Label for="dev-first-name" class="text-xs text-sk-soft">First name</Label>
            <Input
              id="dev-first-name"
              class="sk-field h-9"
              value={session.customer.firstName}
              oninput={(event) => session.setCustomer({ firstName: event.currentTarget.value })}
            />
          </div>
          <div class="flex flex-col gap-1.5">
            <Label for="dev-last-name" class="text-xs text-sk-soft">Last name</Label>
            <Input
              id="dev-last-name"
              class="sk-field h-9"
              value={session.customer.lastName}
              oninput={(event) => session.setCustomer({ lastName: event.currentTarget.value })}
            />
          </div>
        </div>

        <div class="flex items-center justify-between">
          <span class="text-sm text-sk-body">Scenario</span>
          <div class="flex gap-1.5">
            {#each SCENARIOS as entry (entry)}
              <button
                type="button"
                class="sk-chip px-3 py-1.5 text-xs capitalize {scenario === entry
                  ? 'sk-chip--active'
                  : ''}"
                onclick={() => pickScenario(entry)}
              >
                {entry}
              </button>
            {/each}
          </div>
        </div>

        <div class="flex items-center justify-between">
          <span class="text-sm text-sk-body">Incoming transfer</span>
          <Button
            variant="outline"
            size="sm"
            class="sk-btn sk-btn--ghost h-8 px-3 text-[10px]"
            onclick={simulateIncoming}
          >
            Simulate
          </Button>
        </div>

        <Separator class="bg-sk-rule" />

        <div class="flex items-center justify-between">
          <Label for="dev-enterprise" class="text-sm text-sk-body">Enterprise button</Label>
          <Switch
            id="dev-enterprise"
            checked={session.customer.enterprise}
            onCheckedChange={(value) => session.setCustomer({ enterprise: value })}
          />
        </div>

        <Separator class="bg-sk-rule" />

        <div class="grid grid-cols-2 gap-3">
          <Button variant="outline" class="sk-btn sk-btn--ghost h-11 w-full" onclick={replayIntro}>
            <RotateCcw class="h-3.5 w-3.5" />
            Replay the intro
          </Button>
          <Button
            variant="outline"
            class="sk-btn sk-btn--ghost h-11 w-full"
            onclick={replayOnboarding}
          >
            <RotateCcw class="h-3.5 w-3.5" />
            Replay onboarding
          </Button>
        </div>
      </div>
    </Dialog.Content>
  </Dialog.Root>
</div>
