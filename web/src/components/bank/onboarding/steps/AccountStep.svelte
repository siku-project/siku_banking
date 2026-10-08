<script lang="ts">
  import { onMount } from 'svelte'
  import { slide } from 'svelte/transition'
  import PinField from '@/components/bank/shared/PinField.svelte'
  import SwitchField from '@/components/bank/shared/SwitchField.svelte'
  import TextField from '@/components/bank/shared/TextField.svelte'
  import { PIN_LENGTH } from '@/lib/api'
  import { bank } from '@/lib/bank.svelte'
  import { m } from '@/lib/i18n.svelte'
  import { duration } from '@/lib/motion'
  import { onboarding } from '@/lib/onboarding.svelte'

  const mismatch = $derived(
    onboarding.form.pinConfirm.length === PIN_LENGTH &&
      onboarding.form.pin !== onboarding.form.pinConfirm,
  )

  onMount(() => {
    if (!onboarding.form.label) {
      onboarding.form.label = m.onboarding_default_label()
    }
  })
</script>

<div class="flex flex-col gap-3">
  <span class="sk-label">{m.onboarding_step_account()}</span>
  <h1 class="text-[28px] font-semibold leading-tight tracking-[-0.02em] text-sk">
    {m.onboarding_account_title()}
  </h1>
  <p class="text-[14px] leading-relaxed text-sk-muted">{m.onboarding_account_text()}</p>
</div>

<div class="sk-glass flex flex-col gap-6 p-6">
  <TextField
    bind:value={onboarding.form.label}
    label={m.accounts_label()}
    hint={m.accounts_label_hint({ max: bank.limits.labelLength })}
    maxlength={bank.limits.labelLength}
    autofocus
  />

  <div class="sk-rule"></div>

  <SwitchField
    bind:checked={onboarding.form.wantsCard}
    label={m.onboarding_card_switch()}
    hint={m.onboarding_card_switch_hint()}
  />

  {#if onboarding.form.wantsCard}
    <div class="flex flex-col gap-6" transition:slide={{ duration: duration(240) }}>
      <PinField bind:value={onboarding.form.pin} label={m.cards_pin()} hint={m.cards_pin_hint()} />
      <PinField
        bind:value={onboarding.form.pinConfirm}
        label={m.cards_pin_confirm()}
        hint={mismatch ? m.cards_pin_mismatch() : undefined}
        invalid={mismatch}
      />
    </div>
  {/if}
</div>
