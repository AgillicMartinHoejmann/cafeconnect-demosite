<script lang="ts">
	import { goto } from '$app/navigation';
	import { DataHandler, Datatable, Th, ThFilter } from '@vincjo/datatables';
	import { fade } from 'svelte/transition';
	import { Toast, toastStore } from '@skeletonlabs/skeleton';
	import type { ActionData, PageServerData } from './$types';

	export let form: ActionData;
	export let data: PageServerData;

	let result: Array<any> = [];

	if (data.allRecipients) {
		result = data.allRecipients.map((item) => {
			return {
				id: item.AGILLIC_ID,
				created: item.CREATED,
				email: item.EMAIL,
				firstName: item.FIRSTNAME
			};
		});
	}

	const handler = new DataHandler(result, { rowsPerPage: 50 });
	const rows = handler.getRows();
	const selected = handler.getSelected();
	const isAllSelected = handler.isAllSelected();

	if (form?.success) {
		toastStore.trigger({ message: 'Successfully deleted', background: 'variant-filled-success' });
	}

	function handleClick(agillicId: any) {
		goto(`/admin/recipients/${agillicId}`);
	}
</script>

<Toast />
{#if $selected.length > 0}
	<aside class="alert variant-filled m-12" transition:fade|local={{ duration: 400 }}>
		<!-- Icon -->
		<div>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke-width="1.5"
				stroke="currentColor"
				class="w-6 h-6"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
				/>
			</svg>
		</div>
		<!-- Message -->
		<div class="alert-message">
			<h3>Are you sure you wish to delete these records?</h3>
			<p>IDs: {$selected}</p>
		</div>
		<!-- Actions -->
		<div class="alert-actions">
			<form action="?/deleteRecipients" method="post">
				<input hidden name="selected" value={$selected} />
				<button class="btn btn variant-filled-warning" type="submit">Delete</button>
			</form>
		</div>
	</aside>
{/if}

<Datatable {handler} search={false} rowsPerPage={false}>
	<div class="table-container">
		<table class="table table-hover">
			<thead class="">
				<tr class="">
					<th class="selection">
						<input
							type="checkbox"
							on:click={() => handler.selectAll('id', 'all')}
							checked={$isAllSelected}
						/>
					</th>
					<Th {handler} orderBy="id">Agillic ID</Th>
					<Th {handler} orderBy="email">Email</Th>
					<Th {handler} orderBy="firstName">Firstname</Th>
					<Th {handler} orderBy="created">Created</Th>
				</tr>
				<tr class="">
					<th />
					<ThFilter {handler} filterBy="id" />
					<ThFilter {handler} filterBy="email" />
					<ThFilter {handler} filterBy="firstName" />
					<ThFilter {handler} filterBy="created" />
				</tr>
			</thead>
			<tbody>
				{#each $rows as row}
					<tr class:table-row-checked={$selected.includes(row.id)}>
						<td>
							<input
								type="checkbox"
								on:click={() => handler.select(row.id)}
								checked={$selected.includes(row.id)}
							/>
						</td>
						<td on:click={() => handleClick(row.id)} on:keypress={() => handleClick(row.id)}
							>{row.id}</td
						>
						<td>{row.email}</td>
						<td>{row.firstName}</td>
						<td>{row.created}</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</Datatable>

<!-- <Grid>
    <Row padding>
        <Column>
            <form method="post">
                <FormGroup>
                    <Search labelText="Search by email" placeholder="Search by email ..." name="search"/>
                </FormGroup>
                <Button type="submit">Search</Button>
            </form>
        </Column>
    </Row>
</Grid>
{#if form}
    <Grid>
        <Row padding>
            <Column>
                <StructuredList selection>
                    <StructuredListHead>
                        <StructuredListRow head>
                            <StructuredListCell head>AGILLIC_ID</StructuredListCell>
                            <StructuredListCell head>Firstname</StructuredListCell>
                            <StructuredListCell head>Lastname</StructuredListCell>
                            <StructuredListCell head>Email</StructuredListCell>
                            <StructuredListCell head>Created</StructuredListCell>
                            <StructuredListCell head>Last Updated</StructuredListCell>
                            <StructuredListCell head>Email Permission</StructuredListCell>
                            <StructuredListCell head>Other</StructuredListCell>
                        </StructuredListRow>
                    </StructuredListHead>
                    <StructuredListBody>
                        {#each form.formRecipients as item}
                            <StructuredListRow>
                                <StructuredListCell on:click={() => handleClick(item.AGILLIC_ID)}>
                                    {item.personData.AGILLIC_ID}
                                </StructuredListCell>
                                <StructuredListCell on:click={() => handleClick(item.personData.AGILLIC_ID)}>
                                    {item.personData.FIRSTNAME}
                                </StructuredListCell>
                                <StructuredListCell on:click={() => handleClick(item.personData.AGILLIC_ID)}>
                                    {item.personData.LASTNAME}
                                </StructuredListCell>
                                <StructuredListCell on:click={() => handleClick(item.personData.AGILLIC_ID)}>
                                    {item.personData.EMAIL}
                                </StructuredListCell>
                                <StructuredListCell on:click={() => handleClick(item.personData.AGILLIC_ID)}>
                                    {item.personData.CREATED}
                                </StructuredListCell>
                                <StructuredListCell on:click={() => handleClick(item.personData.AGILLIC_ID)}>
                                    {item.personData.LAST_UPDATED}
                                </StructuredListCell>
                                <StructuredListCell on:click={() => handleClick(item.personData.AGILLIC_ID)}>
                                    {item.personData.EMAIL_PERMISSION}
                                </StructuredListCell>
                                <OverflowMenu>
                                    <OverflowMenuItem
                                            danger
                                            text="Delete"
                                            on:click={() => deleteRecipient(item.personData.AGILLIC_ID)}
                                    />
                                </OverflowMenu>
                            </StructuredListRow>
                        {/each}
                    </StructuredListBody>
                </StructuredList>
            </Column>
        </Row>
    </Grid>
{:else}
    {#await getRecipients()}
        <Grid>
            <Row padding>
                <Column>
                    <StructuredListSkeleton rows={3}/>
                </Column>
            </Row>
        </Grid>
    {:then row}
        <Grid>
            <Row padding>
                <Column>
                    <StructuredList selection>
                        <StructuredListHead>
                            <StructuredListRow head>
                                <StructuredListCell head>AGILLIC_ID</StructuredListCell>
                                <StructuredListCell head>Firstname</StructuredListCell>
                                <StructuredListCell head>Lastname</StructuredListCell>
                                <StructuredListCell head>Email</StructuredListCell>
                                <StructuredListCell head>Created</StructuredListCell>
                                <StructuredListCell head>Last Updated</StructuredListCell>
                                <StructuredListCell head>Email Permission</StructuredListCell>
                                <StructuredListCell head>Other</StructuredListCell>
                            </StructuredListRow>
                        </StructuredListHead>
                        <StructuredListBody>
                            {#each row as item}
                                <StructuredListRow>
                                    <StructuredListCell on:click={() => handleClick(item.AGILLIC_ID)}>
                                        {item.AGILLIC_ID}
                                    </StructuredListCell>
                                    <StructuredListCell on:click={() => handleClick(item.AGILLIC_ID)}>
                                        {item.FIRSTNAME}
                                    </StructuredListCell>
                                    <StructuredListCell on:click={() => handleClick(item.AGILLIC_ID)}>
                                        {item.LASTNAME}
                                    </StructuredListCell>
                                    <StructuredListCell on:click={() => handleClick(item.AGILLIC_ID)}>
                                        {item.EMAIL}
                                    </StructuredListCell>
                                    <StructuredListCell on:click={() => handleClick(item.AGILLIC_ID)}>
                                        {item.CREATED}
                                    </StructuredListCell>
                                    <StructuredListCell on:click={() => handleClick(item.AGILLIC_ID)}>
                                        {item.LAST_UPDATED}
                                    </StructuredListCell>
                                    <StructuredListCell on:click={() => handleClick(item.AGILLIC_ID)}>
                                        {item.EMAIL_PERMISSION}
                                    </StructuredListCell>
                                    <OverflowMenu>
                                        <OverflowMenuItem
                                                danger
                                                text="Delete"
                                                on:click={() => deleteRecipient(item.AGILLIC_ID)}
                                        />
                                    </OverflowMenu>
                                </StructuredListRow>
                            {/each}
                        </StructuredListBody>
                    </StructuredList>
                </Column>
            </Row>
        </Grid>
    {/await}
{/if} -->
