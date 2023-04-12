<script lang="ts">
	import { goto } from '$app/navigation';
	import {
		Button,
		Column,
		DataTable,
		Grid,
		Row,
		Toolbar,
		ToolbarBatchActions,
		ToolbarContent,
		ToolbarSearch
	} from 'carbon-components-svelte';
	import type { DataTableRow } from 'carbon-components-svelte/types/DataTable/DataTable.svelte';
	import type { PageServerData } from './$types';

	export let data: PageServerData;

	let active = false;
	let selectedRowIds: string[] = [];

	let result: Array<any> = [];
	let filteredRowIds: string[] = [];
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

	function handleClick(item: CustomEvent<DataTableRow>) {
		goto(`/admin/gdt/${item.detail.id}`);
	}
</script>

<Grid>
	<Row padding>
		<Column>
			<DataTable
				on:click:row={(item) => handleClick(item)}
				selectable
				batchSelection={active}
				bind:selectedRowIds
				sortable
				headers={[
					{ key: 'recordId', value: 'ID' },
					{ key: 'date', value: 'Date' },
					{ key: 'title', value: 'Title' },
					{ key: 'category', value: 'Category' }
				]}
				rows={result}
			>
				<Toolbar>
					<ToolbarBatchActions
						bind:active
						on:cancel={(e) => {
							e.preventDefault();
							active = false;
						}}
					>
						<form action="?/deleteGdtRecords" method="post">
							<input hidden name="selectedRowIds" value={selectedRowIds} />
							<Button type="submit" disabled={selectedRowIds.length === 0}>Delete</Button>
						</form>
					</ToolbarBatchActions>
					<ToolbarContent>
						<ToolbarSearch persistent value="" shouldFilterRows bind:filteredRowIds />
						<form action="?/createGdtRecord" method="post">
							<Button type="submit">Create</Button>
						</form>
					</ToolbarContent>
				</Toolbar>
			</DataTable>
		</Column>
	</Row>
</Grid>
