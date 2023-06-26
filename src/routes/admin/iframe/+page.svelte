<script lang="ts">
	import { Column, Grid, Row } from 'carbon-components-svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<Grid>
	<Row padding>
		<Column>
			<iframe
				src="https://web.cafeconnect.net/web/namedservice/profilemanagement?lgn_uid={data.lgn_uid}"
				title="iframe"
				width="700"
				height="500"
			/>
		</Column>
	</Row>
</Grid>
