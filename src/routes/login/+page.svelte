<script lang="ts">
</script>

<div class="flex">
	<form method="post">
		<div class="space-y-12">
			<div class="border-b border-gray-900/10 pb-12">
				<h2 class="text-base font-semibold leading-7 text-gray-900">Log in</h2>
				<p class="mt-1 text-sm leading-6 text-gray-600">Input user name and password</p>

				<div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
					<div class="sm:col-span-3">
						<label for="username" class="label">Username</label>
						<div class="mt-2">
							<input
								type="text"
								name="username"
								id="username"
								autocomplete="given-name"
								required
								class="input"
							/>
						</div>
					</div>

					<div class="sm:col-span-3">
						<label for="password" class="label">Password</label>
						<div class="mt-2">
							<input
								type="password"
								name="password"
								id="password"
								autocomplete="password"
								required
								class="input"
							/>
						</div>
					</div>
				</div>
			</div>
		</div>

		<div class="mt-6 flex items-center justify-end gap-x-6">
			<button type="submit" class="btn variant-filled">Log in</button>
		</div>
	</form>
</div>
