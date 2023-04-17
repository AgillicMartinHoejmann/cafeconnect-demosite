<script lang="ts">
	import GlobalDataTableForm from '$lib/components/GlobalDataTableForm.svelte';
	import type { PageServerData } from './$types';

	export let data: PageServerData;
</script>

<GlobalDataTableForm globalDataTableRecord={data} />
