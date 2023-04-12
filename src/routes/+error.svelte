<script lang="ts">
	import { page } from '$app/stores';
	import { ToastNotification } from 'carbon-components-svelte';
</script>

<ToastNotification
	fullWidth
	title="Error: {$page.url}"
	subtitle="{$page.status} {$page.error?.message}"
	caption={new Date().toLocaleString()}
/>
