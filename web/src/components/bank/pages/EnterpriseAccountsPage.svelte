<script lang="ts">
  import { fly } from 'svelte/transition'
  import CompanyAccountDetail from '@/components/bank/enterprise/accounts/CompanyAccountDetail.svelte'
  import CompanyAccountList from '@/components/bank/enterprise/accounts/CompanyAccountList.svelte'
  import EnterprisePageHeader from '@/components/bank/enterprise/shared/EnterprisePageHeader.svelte'
  import LabelDialog from '@/components/bank/enterprise/shared/LabelDialog.svelte'
  import EmptyState from '@/components/bank/shared/EmptyState.svelte'
  import { enterpriseApi } from '@/lib/enterprise-api'
  import { settleAction } from '@/lib/enterprise-actions'
  import { enterprise } from '@/lib/enterprise.svelte'
  import { m } from '@/lib/i18n.svelte'
  import { duration } from '@/lib/motion'
  import { pageReveal } from '@/lib/reveal'

  const reveal = pageReveal()

  let selectedId = $state<number | null>(null)
  let opening = $state(false)

  const company = $derived(enterprise.company)
  const account = $derived(
    company
      ? (company.accounts.find((entry) => entry.id === selectedId) ??
          company.accounts.find((entry) => entry.main) ??
          company.accounts[0] ??
          null)
      : null,
  )

  const open = async (label: string): Promise<boolean> =>
    company !== null &&
    settleAction(
      enterpriseApi.openAccount({ companyId: company.id, label }),
      m.accounts_opened_toast({ label }),
    )
</script>

{#if company}
  <div class="flex flex-col gap-6">
    <div in:fly={reveal(0)}>
      <EnterprisePageHeader title={m.enterprise_accounts_title()} />
    </div>

    <div class="grid grid-cols-[300px_minmax(0,1fr)] gap-6">
      <aside in:fly={reveal(1)}>
        <CompanyAccountList
          accounts={company.accounts}
          selected={account?.id ?? null}
          onSelect={(id) => (selectedId = id)}
          onOpen={() => (opening = true)}
        />
      </aside>

      <div in:fly={reveal(2)}>
        {#if account}
          {#key account.id}
            <div in:fly={{ y: 10, duration: duration(280) }}>
              <CompanyAccountDetail {account} companyId={company.id} />
            </div>
          {/key}
        {/if}
      </div>
    </div>
  </div>

  <LabelDialog
    bind:open={opening}
    title={m.enterprise_account_open()}
    description={m.enterprise_account_open_text({ name: company.name })}
    label={m.accounts_label()}
    confirm={m.accounts_open_confirm()}
    onSubmit={open}
  />
{:else}
  <div class="sk-glass" in:fly={reveal(0)}>
    <EmptyState title={m.enterprise_empty_title()} hint={m.enterprise_empty_hint()} />
  </div>
{/if}
