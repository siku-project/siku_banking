<script lang="ts">
  import type { Snippet } from 'svelte'
  import Sidebar from '@/components/bank/layout/Sidebar.svelte'
  import Topbar from '@/components/bank/layout/Topbar.svelte'
  import WorkspaceTransition from '@/components/bank/layout/WorkspaceTransition.svelte'
  import TransactionDetail from '@/components/bank/transactions/TransactionDetail.svelte'

  let { children }: { children: Snippet } = $props()
</script>

<div class="flex h-full w-full flex-col pb-7">
  <Topbar />

  <div class="flex min-h-0 flex-1">
    <Sidebar />

    <main class="content sk-scroll min-w-0 flex-1 overflow-y-auto px-8 pt-7">
      <div class="pb-6">
        {@render children()}
      </div>
    </main>
  </div>
</div>

<WorkspaceTransition />
<TransactionDetail />

<style>
  .content {
    mask-image: linear-gradient(to bottom, black calc(100% - 28px), transparent 100%);
  }
</style>
