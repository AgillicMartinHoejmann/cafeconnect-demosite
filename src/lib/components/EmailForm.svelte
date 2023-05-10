<script langt="ts">
	/**
	 * @type {any}
	 */
	export let emailProperties;
</script>

<div class="flex">
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
							<textarea
								name="title"
								id="title"
								value={emailProperties.subjectLine}
								class="textarea"
							/>
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
								value={emailProperties}
								class="input"
							/>
						</div>
					</div>

					<div class="sm:col-span-3">
						<label for="category" class="label">Category</label>
						<div class="mt-2">
							<input
								type="text"
								name="category"
								id="category"
								value={emailProperties}
								class="input"
							/>
						</div>
					</div>

					<div class="sm:col-span-6">
						<label for="description" class="label">Shopify ID</label>
						<div class="mt-2">
							<textarea
								name="description"
								id="description"
								rows="7"
								value={emailProperties}
								class="textarea"
							/>
						</div>
					</div>

					<div class="sm:col-span-6">
						<label for="slug" class="label">Slug</label>
						<div class="mt-2">
							<pre>{emailProperties}</pre>
						</div>
					</div>
				</div>
			</div>

			<div class="mt-6 flex items-center justify-end gap-x-6">
				<button type="submit" class="btn variant-filled">Save</button>
			</div>
		</div>
	</form>
</div>
