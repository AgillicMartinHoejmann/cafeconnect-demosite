<script lang="ts">
	import { preferences } from '$lib/stores/emailStore.js';
	// export const preferences = persisted('preferences', {
	// 	subjectLine: '',
	// 	header: '',
	// 	body: ''
	// });

	// let header: string = 'This is an example of a header as it will appear in the email';
	// let body: string = 'This is an example of what the email body will look like';
</script>

<form method="post">
	<div class="space-y-12">
		<div class="border-b border-gray-900/10 pb-12">
			<h2 class="text-base font-semibold leading-7 text-gray-900">Table Record</h2>
			<p class="mt-1 text-sm leading-6 text-gray-600">
				Use a permanent address where you can receive mail.
			</p>

			<div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
				<div class="sm:col-span-6">
					<label for="title" class="label">Title</label>
					<div class="mt-2">
						<textarea name="title" id="title" bind:value={$preferences.header} class="textarea" />
						<!-- <input
								type="text"
								name="title"
								id="title"
								value={globalDataTableRecord.gdtRecord.TITLE}
								class="input"
							/> -->
					</div>
				</div>

				<div class="sm:col-span-3">
					<label for="date" class="label">Date</label>
					<div class="mt-2">
						<input
							type="text"
							name="date"
							id="date"
							autocomplete="date"
							value={$preferences}
							class="input"
						/>
					</div>
				</div>

				<div class="sm:col-span-3">
					<label for="category" class="label">Category</label>
					<div class="mt-2">
						<input type="text" name="category" id="category" value={$preferences} class="input" />
					</div>
				</div>

				<div class="sm:col-span-6">
					<label for="description" class="label">Shopify ID</label>
					<div class="mt-2">
						<textarea
							name="description"
							id="description"
							rows="7"
							value={$preferences.body}
							class="textarea"
						/>
					</div>
				</div>

				<div class="sm:col-span-6">
					<label for="slug" class="label">Slug</label>
					<div class="mt-2">
						<pre>{$preferences}</pre>
					</div>
				</div>
			</div>
		</div>

		<div class="mt-6 flex items-center justify-end gap-x-6">
			<button type="submit" class="btn variant-filled">Save</button>
		</div>
	</div>
</form>
