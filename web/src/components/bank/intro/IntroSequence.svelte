<script lang="ts">
  import { fade, scale } from 'svelte/transition'
  import CodeSlots from '@/components/bank/intro/CodeSlots.svelte'
  import Greeting from '@/components/bank/intro/Greeting.svelte'
  import LoadingMark from '@/components/bank/intro/LoadingMark.svelte'
  import { duration } from '@/lib/motion'
  import { session } from '@/lib/session.svelte'
</script>

<div class="intro absolute inset-0 grid place-items-center overflow-hidden">
  <div class="intro__halo"></div>

  {#key session.phase}
    <div
      class="col-start-1 row-start-1"
      in:scale={{ start: 0.96, duration: duration(420), delay: duration(160) }}
      out:fade={{ duration: duration(180) }}
    >
      {#if session.phase === 'code'}
        <CodeSlots />
      {:else if session.phase === 'loading'}
        <LoadingMark />
      {:else if session.phase === 'greeting'}
        <Greeting />
      {/if}
    </div>
  {/key}
</div>

<style>
  .intro__halo {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 520px;
    height: 520px;
    border-radius: 9999px;
    background: radial-gradient(circle, var(--sk-accent-haze) 0%, transparent 62%);
    transform: translate(-50%, -50%);
    pointer-events: none;
  }
</style>
