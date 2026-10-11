<script lang="ts">
  import { KeyRound, Plus, X } from '@lucide/svelte'
  import GrantAccessDialog from '@/components/bank/enterprise/accounts/GrantAccessDialog.svelte'
  import MemberAvatar from '@/components/bank/enterprise/shared/MemberAvatar.svelte'
  import GlassCard from '@/components/bank/shared/GlassCard.svelte'
  import { enterpriseApi } from '@/lib/enterprise-api'
  import { settleAction } from '@/lib/enterprise-actions'
  import { enterprise, type AccessLevel, type CompanyAccount } from '@/lib/enterprise.svelte'
  import { m } from '@/lib/i18n.svelte'

  let { account, companyId }: { account: CompanyAccount; companyId: number } = $props()

  let granting = $state(false)

  const levelLabel = (level: AccessLevel): string =>
    level === 'spend' ? m.enterprise_access_spend() : m.enterprise_access_view()

  const setLevel = (memberId: number, level: AccessLevel | null): Promise<boolean> =>
    settleAction(
      enterpriseApi.setAccess({ companyId, accountId: account.id, memberId, level }),
      level ? m.enterprise_access_saved() : m.enterprise_access_removed(),
    )
</script>

<GlassCard padding="sm" class="flex flex-col gap-2">
  <div class="flex items-center justify-between px-3 pt-1">
    <div class="flex flex-col gap-0.5">
      <span class="sk-title text-[15px]">{m.enterprise_access_title()}</span>
      <span class="text-[12px] text-sk-soft">{m.enterprise_access_hint()}</span>
    </div>
    <button type="button" class="sk-btn sk-btn--ghost !px-3" onclick={() => (granting = true)}>
      <Plus class="h-3.5 w-3.5" />
      {m.enterprise_access_grant()}
    </button>
  </div>

  {#if account.access.length === 0}
    <p class="px-3 py-4 text-[12.5px] text-sk-faint">{m.enterprise_access_empty()}</p>
  {:else}
    <div class="flex flex-col">
      {#each account.access as entry (entry.memberId)}
        {@const member = enterprise.member(entry.memberId)}
        {#if member}
          <div
            class="flex items-center gap-3 rounded-[var(--sk-radius-row)] px-3 py-2.5 hover:bg-sk-hover"
          >
            <MemberAvatar name={member.name} />
            <span class="flex min-w-0 flex-1 flex-col leading-tight">
              <span class="truncate text-[13px] font-medium text-sk">{member.name}</span>
              <span class="truncate text-[11px] text-sk-soft">
                {member.role}
              </span>
            </span>
            <div class="flex gap-1">
              {#each ['view', 'spend'] as const as level (level)}
                <button
                  type="button"
                  class="sk-chip px-2.5 py-1 text-[11px]"
                  class:sk-chip--active={entry.level === level}
                  onclick={() => entry.level !== level && setLevel(member.id, level)}
                >
                  {#if level === 'spend'}
                    <KeyRound class="h-3 w-3" />
                  {/if}
                  {levelLabel(level)}
                </button>
              {/each}
            </div>
            <button
              type="button"
              class="sk-tile sk-tile--interactive sk-focus h-7 w-7"
              aria-label={m.enterprise_access_revoke()}
              title={m.enterprise_access_revoke()}
              onclick={() => setLevel(member.id, null)}
            >
              <X class="h-3.5 w-3.5" />
            </button>
          </div>
        {/if}
      {/each}
    </div>
  {/if}
</GlassCard>

<GrantAccessDialog bind:open={granting} {account} {companyId} />
