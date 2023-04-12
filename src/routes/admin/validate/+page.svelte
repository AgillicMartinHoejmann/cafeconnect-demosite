<script lang="ts">
	import { enhance } from '$app/forms';
	import {
		Button,
		Column,
		FormGroup,
		Grid,
		Row,
		TextInput,
		ToastNotification
	} from 'carbon-components-svelte';
	import { fade } from 'svelte/transition';
	import type { ActionData } from './$types';

	export let form: ActionData;
</script>

<Grid>
	<Row padding>
		<Column>
			<form method="post" use:enhance>
				<FormGroup>
					<TextInput labelText="Customer ID" placeholder="Customer ID" name="customerId" />
				</FormGroup>
				<FormGroup>
					<TextInput labelText="Voucher" placeholder="Voucher" name="voucherId" />
				</FormGroup>
				<Button type="submit">Validate</Button>
			</form>
		</Column>
	</Row>
</Grid>

<Grid>
	<Row padding>
		<Column>
			{#if form?.success}
				<div transition:fade={{duration: 1000}}>
					<ToastNotification
						kind="success"
						title="Valid"
						subtitle="Voucher has been redeemed."
						timeout={3000}
					/>
					<ToastNotification
						kind="info"
						title="Valid until {form.voucherInfo.DATE_VALID}"
						subtitle="{form.voucherInfo.PERCENT_DISOUNT} % discount on next purchase"
						caption="*up to a maximum of {form.voucherInfo.DISCOUNT_EURO} €"
						timeout={3000}
					/>
				</div>
			{:else if form?.success === false}
				<ToastNotification
					kind="warning"
					title="Oops"
					subtitle="Voucher does not appear to be valid, or may have already been claimed"
					timeout={3000}
				/>
			{/if}
		</Column>
	</Row>
</Grid>
