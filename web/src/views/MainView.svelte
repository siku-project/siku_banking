<script lang="ts">
  import { fade } from 'svelte/transition'
  import { app } from '@/lib/app.svelte'
  import { duration } from '@/lib/motion'
  import BankView from '@/views/BankView.svelte'
</script>

{#if app.visible}
  <div class="contents" transition:fade={{ duration: duration(200) }}>
    <BankView />
  </div>
{/if}
