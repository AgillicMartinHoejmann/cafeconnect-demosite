<script lang="ts">
	import { Avatar, Tab, TabGroup, AppShell } from '@skeletonlabs/skeleton';

	// Your selected Skeleton theme:
	import '@skeletonlabs/skeleton/themes/theme-skeleton.css';

	// This contains the bulk of Skeletons required styles:
	import '@skeletonlabs/skeleton/styles/all.css';

	// Finally, your application's global stylesheet (sometimes labeled 'app.css')
	import '../app.css';

	let tabSet: number = 0;
</script>

<AppShell slotPageContent="flex justify-center items-center">
	<svelte:fragment slot="header">
		<TabGroup
			justify="justify-center"
			active="variant-filled-primary"
			hover="hover:variant-soft-primary"
			flex="flex-1 lg:flex-none"
			rounded=""
			border=""
			class="bg-surface-100-800-token w-full"
		>
			<Tab bind:group={tabSet} name="recipients" value={0}>
				<svelte:fragment slot="lead" />
				Recipients
			</Tab>
			<Tab bind:group={tabSet} name="gdt" value={1}>
				<svelte:fragment slot="lead" />
				GDT
			</Tab>
			<!-- ... -->
		</TabGroup></svelte:fragment
	>
	<svelte:fragment slot="sidebarLeft" />
	<svelte:fragment slot="sidebarRight" />
	<svelte:fragment slot="pageHeader" />
	<slot />
	<svelte:fragment slot="pageFooter" />
	<svelte:fragment slot="footer" />
</AppShell>
