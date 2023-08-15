<script>
	import Header from '$lib/components/Header.svelte';
	import 'carbon-components-svelte/css/all.css';
	import { Content } from 'carbon-components-svelte';
</script>

<Header />

<Content>
	<slot />
</Content>
