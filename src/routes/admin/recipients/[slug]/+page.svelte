<script lang="ts">
	import type { PageServerData } from './$types';
	import PersonDataForm from '$lib/components/PersonDataForm.svelte';

	export let data: PageServerData;

	function handleClick(emailUrl: Location | (string & Location)) {
		window.location = emailUrl;
	}
</script>

<PersonDataForm person={data} />

<!-- <form method="post">
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
</form> -->

{#if data?.history}
	<!-- <Grid>
		<Row padding>
			<Column>
				<StructuredList selection>
					<StructuredListHead>
						<StructuredListRow head>
							<StructuredListCell head>Name</StructuredListCell>
							<StructuredListCell head>Type</StructuredListCell>
							<StructuredListCell head>Sent</StructuredListCell>
							<StructuredListCell head>Opened</StructuredListCell>
							<StructuredListCell head>clicked</StructuredListCell>
							<StructuredListCell head>Bounced</StructuredListCell>
						</StructuredListRow>
					</StructuredListHead>
					<StructuredListBody>
						{#each data.history as item}
							<StructuredListRow on:click={() => handleClick(item.additionalFields.storedEmailURL)}>
								<StructuredListCell>
									{item.communicationId}
								</StructuredListCell>
								<StructuredListCell>
									{item.communicationType}
								</StructuredListCell>
								<StructuredListCell>
									{item.executionTimestamp}
								</StructuredListCell>
								<StructuredListCell>
									{item.additionalFields.openedTimestamp}
								</StructuredListCell>
								<StructuredListCell>
									{item.additionalFields.clickedTimeStamp}
								</StructuredListCell>
								<StructuredListCell>
									{item.additionalFields.bounced}
								</StructuredListCell>
							</StructuredListRow>
						{/each}
					</StructuredListBody>
				</StructuredList>
			</Column>
		</Row>
	</Grid> -->
{/if}
