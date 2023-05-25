<script lang="ts">
	import {
		Button,
		ButtonSet,
		Column,
		DataTable,
		Grid,
		Row,
		TextInput,
		Toolbar,
		ToolbarContent,
		ToolbarSearch
	} from 'carbon-components-svelte';
	import type { PageServerData } from './$types';

	export let data: PageServerData;

	let result: Array<any> = [];
	let filteredRowIds: string[] = [];
	if (data.recipientHistory) {
		result = data.recipientHistory.map(
			(item: {
				ID: string;
				communicationId: any;
				communicationType: any;
				executionTimestamp: any;
				additionalFields: {
					openedTimestamp: any;
					storedEmailURL: any;
					bounced: any;
					clickedTimeStamp: string;
				};
			}) => {
				return {
					id: item.ID,
					communicationId: item.communicationId,
					type: item.communicationType,
					date: item.executionTimestamp,
					opened: item.additionalFields.openedTimestamp,
					emailUrl: item.additionalFields.storedEmailURL,
					bounced: item.additionalFields.bounced,
					clicked: item.additionalFields.clickedTimeStamp
				};
			}
		);
	}

	function handleClick(emailUrl: Location | (string & Location)) {
		window.location = emailUrl;
	}
</script>

<form method="post">
	<Grid>
		<Row padding>
			<Column>
				<TextInput
					labelText="Email"
					placeholder="Email"
					name="email"
					value={data.recipient.EMAIL}
				/>
				<input type="hidden" name="agillicId" value={data.recipient.AGILLIC_ID} />
			</Column>
		</Row>
		<Row padding>
			<Column>
				<TextInput
					labelText="Firstname"
					placeholder="Firstname"
					name="firstName"
					value={data.recipient.FIRSTNAME ?? 'Unknown'}
				/>
			</Column>
		</Row>
		<Row padding>
			<Column>
				<TextInput
					labelText="Lastname"
					placeholder="Lastname"
					name="lastName"
					value={data.recipient.LASTNAME ?? 'Unknown'}
				/>
			</Column>
		</Row>
		<Row padding>
			<Column>
				<ButtonSet>
					<Button type="submit">Save</Button>
				</ButtonSet>
			</Column>
		</Row>
	</Grid>
</form>

{#if data?.recipientHistory}
	<Grid>
		<Row padding>
			<Column>
				<DataTable
					sortable
					headers={[
						{ key: 'communicationId', value: 'ID' },
						{ key: 'date', value: 'Date' },
						{ key: 'type', value: 'Channel' },
						{ key: 'opened', value: 'Opened' },
						{ key: 'clicked', value: 'Clicked' },
						{ key: 'bounced', value: 'Bounced' }
					]}
					on:click:row={(item) => handleClick(item.detail.emailUrl)}
					rows={result}
				>
					<Toolbar>
						<ToolbarContent>
							<ToolbarSearch persistent value="" shouldFilterRows bind:filteredRowIds />
						</ToolbarContent>
					</Toolbar>
				</DataTable>
			</Column>
		</Row>
	</Grid>
{/if}
