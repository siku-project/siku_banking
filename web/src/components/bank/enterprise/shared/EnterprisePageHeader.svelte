<script lang="ts">
  import type { Snippet } from 'svelte'
  import CompanyMark from '@/components/bank/enterprise/shared/CompanyMark.svelte'
  import { enterprise } from '@/lib/enterprise.svelte'

  let { title, actions }: { title: string; actions?: Snippet } = $props()
</script>

<header class="flex items-center justify-between gap-6 px-1">
  <div class="flex items-center gap-4">
    <CompanyMark name={enterprise.company?.name ?? ''} />
    <div class="flex flex-col gap-1">
      <span class="sk-label">{enterprise.company?.name ?? ''}</span>
      <h1 class="text-[26px] font-semibold leading-none tracking-[-0.02em] text-sk">{title}</h1>
    </div>
  </div>

  {#if actions}
    <div class="flex items-center gap-2">
      {@render actions()}
    </div>
  {/if}
</header>
