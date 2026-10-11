<script lang="ts">
  import { CreditCard, ShieldCheck, WalletCards, type LucideIcon } from '@lucide/svelte'
  import { m } from '@/lib/i18n.svelte'
  import { session } from '@/lib/session.svelte'

  interface Feature {
    icon: LucideIcon
    title: () => string
    text: () => string
  }

  const features: Feature[] = [
    {
      icon: WalletCards,
      title: () => m.onboarding_feature_account_title(),
      text: () => m.onboarding_feature_account_text(),
    },
    {
      icon: CreditCard,
      title: () => m.onboarding_feature_card_title(),
      text: () => m.onboarding_feature_card_text(),
    },
    {
      icon: ShieldCheck,
      title: () => m.onboarding_feature_safe_title(),
      text: () => m.onboarding_feature_safe_text(),
    },
  ]
</script>

<div class="flex flex-col gap-3">
  <span class="sk-label">{m.onboarding_welcome_label()}</span>
  <h1 class="text-[34px] font-semibold leading-[1.1] tracking-[-0.02em] text-sk">
    {m.onboarding_welcome_title({ name: session.customer.firstName })}
  </h1>
  <p class="max-w-[460px] text-[14px] leading-relaxed text-sk-muted">
    {m.onboarding_welcome_text()}
  </p>
</div>

<ul class="flex flex-col gap-3">
  {#each features as feature (feature.title())}
    <li class="sk-glass flex items-start gap-4 p-4">
      <span class="sk-tile h-10 w-10 shrink-0 bg-sk-tint text-sk-accent">
        <feature.icon class="h-4 w-4" />
      </span>
      <div class="flex flex-col gap-1">
        <span class="text-sm font-medium text-sk">{feature.title()}</span>
        <span class="text-[13px] leading-relaxed text-sk-muted">{feature.text()}</span>
      </div>
    </li>
  {/each}
</ul>
