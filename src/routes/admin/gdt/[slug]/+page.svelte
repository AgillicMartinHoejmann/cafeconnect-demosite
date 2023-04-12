<script lang="ts">
	import type { PageServerData, PageServerLoad } from './$types';
	import {
		Button,
		Column,
		Grid,
		ImageLoader,
		Row,
		TextArea,
		TextInput
	} from 'carbon-components-svelte';

	export let data: PageServerData;
</script>

<form method="post">
	<Grid>
		<Row padding>
			<Column>
				<ImageLoader src="https://{data.gdtRecord.IMAGE_URL}" />
				<input type="hidden" name="recordId" value={data.gdtRecord.ID} />
			</Column>
		</Row>
		<Row padding>
			<Column>
				<TextInput
					labelText="Title"
					placeholder="Title"
					name="title"
					value={data.gdtRecord.TITLE ?? ''}
				/>
				<input type="hidden" name="personID" value={data.gdtRecord.ID} />
			</Column>
		</Row>
		<Row padding>
			<Column>
				<TextInput
					labelText="Category"
					placeholder="Category"
					name="category"
					value={data.gdtRecord.CATEGORY ?? ''}
				/>
				<input type="hidden" name="personID" value={data.gdtRecord.ID} />
			</Column>
		</Row>
		<Row padding>
			<Column>
				<TextArea
					labelText="Description"
					placeholder="Description"
					name="description"
					value={data.gdtRecord.DESCRIPTION ?? ''}
				/>
			</Column>
		</Row>
		<Row padding>
			<Column>
				<Button type="submit">Save</Button>
			</Column>
		</Row>
	</Grid>
</form>
