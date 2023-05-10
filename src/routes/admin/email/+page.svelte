<script lang="ts">
	import { enhance } from '$app/forms';
	import {
		Button,
		Column,
		Grid,
		Row,
		StructuredList,
		StructuredListBody,
		StructuredListCell,
		StructuredListHead,
		StructuredListRow,
		TextArea,
		TextInput,
		ToastNotification
	} from 'carbon-components-svelte';
	import { persisted } from 'svelte-local-storage-store';
	import type { ActionData, PageData } from './$types';
	import EmailForm from '$lib/components/EmailForm.svelte';

	export let form: ActionData;
	export let data: PageData;

	const preferences = persisted('preferences', {
		subjectLine: '',
		header: '',
		body: ''
	});

	let header: string = 'This is an example of a header as it will appear in the email';
	let body: string = 'This is an example of what the email body will look like';

	function handleClick(emailUrl: Location | (string & Location)) {
		window.location = emailUrl;
	}
</script>

<div class="container flex items-center flex-col">
	<div style="padding: 0">
		<img
			style="width: 100%; max-width: 660px; border: 0 none"
			src="https://coffee-stag.agillic.eu/agillicadmin/forward/bcmportlet/bcmresource/media/resources/Templates%20assets/email/default/img/colombian-huila-san-agustin-2x.jpg"
		/>
	</div>

	<div style="display: flex; justify-content: center; padding: 10px;">
		<p
			style="margin: 0; text-align: center; font-weight: 800 !important; line-height: 1.2 !important; font-size: 32px !important;width: 620px; font-family:Arial, Helvetica, sans-serif !important"
		>
			{$preferences.header || header}
		</p>
	</div>

	<div style="display: flex; justify-content: center; padding: 10px;">
		<p
			style="margin: 0; text-align: center; font-weight: 400 !important; line-height: 1.5 !important; font-size: 13px !important;width: 620px; font-family:Arial, Helvetica, sans-serif !important"
		>
			{$preferences.body || body}
		</p>
	</div>
</div>

<EmailForm emailProperties={preferences} />

<!-- <form
	method="post"
	action="?/sendTestEmail"
	use:enhance={() => {
		return async ({ update }) => {
			await update({ reset: false });
		};
	}}
>
	<Grid>
		<Row padding>
			<Column>
				<TextInput
					labelText="Subject Line"
					placeholder="Subject Line"
					name="subjectLine"
					required
					bind:value={$preferences.subjectLine}
				/>
			</Column>
		</Row>
		<Row padding>
			<Column>
				<TextInput
					labelText="Header"
					placeholder="Header"
					name="header"
					bind:value={$preferences.header}
				/>
			</Column>
		</Row>
		<Row padding>
			<Column>
				<TextArea labelText="Body" placeholder="Body" name="body" bind:value={$preferences.body} />
			</Column>
		</Row>
		<Row padding>
			<Column>
				<Button kind="danger-tertiary" type="submit">Send Test</Button>
			</Column>
		</Row>
		<Row padding>
			<Column>
				{#if form?.success}
					<ToastNotification
						kind="success"
						title="Email sent"
						subtitle="Check your email inbox"
						timeout={2000}
					/>
				{/if}
			</Column>
		</Row>
	</Grid>
</form> -->

<!-- <form
	method="post"
	action="?/updateEmailData"
	use:enhance={() => {
		return async ({ update }) => {
			await update({ reset: false });
		};
	}}
>
	<Grid>
		<Row padding>
			<Column>
				{#if form}
					{#if form?.message === 'Conflict'}
						<ToastNotification
							kind="warning"
							title="Not available"
							subtitle="Try adding +123 to your address"
							timeout={4000}
						/>
					{:else}
						<ToastNotification
							kind="success"
							title="Updated"
							subtitle="Email address successfully updated"
							timeout={3000}
						/>
					{/if}
				{/if}
			</Column>
		</Row>
		<Row padding>
			<Column>
				<TextInput
					labelText="Send to address"
					placeholder="Email"
					name="email"
					value={data.recipient.EMAIL}
				/>
			</Column>
		</Row>
		<Row padding>
			<Column>
				<Button type="submit">Update Email Address</Button>
			</Column>
		</Row>
	</Grid>
</form> -->

<!-- {#if data?.history}
	<Grid>
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
	</Grid>
{/if} -->
