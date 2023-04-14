<script lang="ts">
	import { goto } from '$app/navigation';
	import { DataHandler, Datatable, Th, ThFilter } from '@vincjo/datatables';

	import { fade } from 'svelte/transition';

	export let data;

	let result: Array<any> = [];
	if (data.gdtRows) {
		result = data.gdtRows.map((item: { ID: any; DATE: any; TITLE: any; CATEGORY: any }) => {
			return {
				id: item.ID,
				recordId: item.ID,
				date: item.DATE,
				title: item.TITLE,
				category: item.CATEGORY
			};
		});
	}

	const handler = new DataHandler(result, { rowsPerPage: 50 });
	const rows = handler.getRows();
	const selected = handler.getSelected();
	const isAllSelected = handler.isAllSelected();
	function opentGdtRow(row: string) {
		goto(`/admin/gdt/${row}`);
	}
</script>

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
			<form action="?/deleteGdtRecords" method="post">
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
					<Th {handler} orderBy="id">ID</Th>
					<Th {handler} orderBy="date">Date</Th>
					<Th {handler} orderBy="title">Title</Th>
					<Th {handler} orderBy="category">Category</Th>
				</tr>
				<tr class="">
					<th />
					<ThFilter {handler} filterBy="id" />
					<ThFilter {handler} filterBy="data" />
					<ThFilter {handler} filterBy="title" />
					<ThFilter {handler} filterBy="category" />
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
						<td>{row.id}</td>
						<td>{row.date}</td>
						<td on:click={() => opentGdtRow(row.id)} on:keypress={() => opentGdtRow(row.id)}
							>{row.title}</td
						>
						<td>{row.category}</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</Datatable>
