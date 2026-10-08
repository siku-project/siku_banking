<script lang="ts">
  import { fly } from 'svelte/transition'
  import { m } from '@/lib/i18n.svelte'
  import { duration } from '@/lib/motion'
  import { session } from '@/lib/session.svelte'
</script>

<div class="flex flex-col items-center gap-3 text-center">
  <span
    class="text-[34px] font-semibold tracking-[-0.02em] text-sk"
    in:fly={{ y: 18, duration: duration(520) }}
  >
    {m.intro_greeting({ name: session.fullName })}
  </span>
  <span
    class="text-sm text-sk-muted"
    in:fly={{ y: 12, duration: duration(480), delay: duration(220) }}
  >
    {m.intro_greeting_sub()}
  </span>
</div>
