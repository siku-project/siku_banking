<script lang="ts">
  import { onMount } from 'svelte'
  import type { Component } from 'svelte'
  import { app } from '@/lib/app.svelte'
  import { applyTranslations } from '@/lib/i18n.svelte'
  import { locale } from '@/lib/locale.svelte'
  import { RESOURCE, sendNuiCallback } from '@/lib/nui'
  import { Toaster } from '$lib/components/ui/sonner'
  import MainView from '@/views/MainView.svelte'

  interface LocalePayload {
    language?: string
    translations?: { web?: Record<string, string> }
  }

  interface ReadyResponse {
    locale?: LocalePayload
    visible?: boolean
  }

  interface NuiMessage {
    action?: string
    locale?: LocalePayload
    payload?: { visible?: boolean }
  }

  let Shell = $state<Component | null>(null)

  /** The game's language, and the strings it carries when it sends them. */
  const applyLocale = (payload?: LocalePayload): void => {
    if (!payload?.language) {
      return
    }

    const web = payload.translations?.web

    if (web && typeof web === 'object') {
      applyTranslations(payload.language, web)
    } else {
      locale.set(payload.language)
    }
  }

  const handleMessage = (event: MessageEvent<NuiMessage>): void => {
    const { action, locale: payload, payload: data } = event.data ?? {}

    switch (action) {
      case `${RESOURCE}:nui:setLocale`:
        applyLocale(payload)
        break
      case `${RESOURCE}:nui:setVisible`:
        app.setVisible(data?.visible === true)
        break
    }
  }

  onMount(() => {
    window.addEventListener('message', handleMessage)

    void sendNuiCallback<ReadyResponse>('ready').then((answer) => {
      if (!answer) {
        return
      }

      applyLocale(answer.locale)

      if (answer.visible !== undefined) {
        app.setVisible(answer.visible)
      }
    })

    if (import.meta.env.DEV) {
      void import('@/views/BoilerplateView.svelte').then((module) => {
        Shell = module.default
      })
    }

    return () => window.removeEventListener('message', handleMessage)
  })
</script>

{#key locale.current}
  {#if Shell}
    <Shell />
  {:else if !import.meta.env.DEV}
    <MainView />
  {/if}
{/key}

<Toaster />
