<script langt="ts">
	/**
	 * @type {{ recipient: { FIRSTNAME: any; LASTNAME: any; CUSTOMER_ID: any; SHOPIFY_ID: any; EMAIL: any; MSISDN: any; ADDRESS: any; CITY: any; POSTAL_CODE: any; }; }}
	 */
	export let person;
</script>

<form>
	<div class="space-y-12">
		<div class="border-b border-gray-900/10 pb-12">
			<h2 class="text-base font-semibold leading-7 text-gray-900">Personal Information</h2>
			<p class="mt-1 text-sm leading-6 text-gray-600">
				Use a permanent address where you can receive mail.
			</p>

			<div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
				<div class="sm:col-span-3">
					<label for="first-name" class="label">First name</label>
					<div class="mt-2">
						<input
							type="text"
							name="first-name"
							id="first-name"
							autocomplete="given-name"
							value={person.recipient.FIRSTNAME}
							class="input"
						/>
					</div>
				</div>

				<div class="sm:col-span-3">
					<label for="last-name" class="label">Last name</label>
					<div class="mt-2">
						<input
							type="text"
							name="last-name"
							id="last-name"
							autocomplete="family-name"
							value={person.recipient.LASTNAME}
							class="input"
						/>
					</div>
				</div>

				<div class="sm:col-span-3">
					<label for="last-name" class="label">Customer ID</label>
					<div class="mt-2">
						<input
							type="text"
							name="last-name"
							id="last-name"
							autocomplete="family-name"
							value={person.recipient.CUSTOMER_ID}
							class="input"
						/>
					</div>
				</div>

				<div class="sm:col-span-3">
					<label for="last-name" class="label">Shopify ID</label>
					<div class="mt-2">
						<input
							type="text"
							name="last-name"
							id="last-name"
							autocomplete="family-name"
							value={person.recipient.SHOPIFY_ID}
							class="input"
						/>
					</div>
				</div>

				<div class="sm:col-span-4">
					<label for="email" class="label">Email address</label>
					<div class="mt-2">
						<input
							id="email"
							name="email"
							type="email"
							autocomplete="email"
							value={person.recipient.EMAIL}
							class="input"
						/>
					</div>
				</div>

				<div class="sm:col-span-2">
					<label for="email" class="label">Mobile</label>
					<div class="mt-2">
						<input
							id="email"
							name="email"
							type="email"
							autocomplete="email"
							value={person.recipient.MSISDN ?? ''}
							class="input"
						/>
					</div>
				</div>

				<div class="sm:col-span-3">
					<label for="country" class="label">Language</label>
					<div class="mt-2">
						<select id="country" name="country" autocomplete="country-name" class="select">
							<option value="da">Danish</option>
							<option value="en">English</option>
							<option value="de-de">German</option>
						</select>
					</div>
				</div>

				<div class="col-span-full">
					<label for="street-address" class="label">Street address</label>
					<div class="mt-2">
						<input
							type="text"
							name="street-address"
							id="street-address"
							autocomplete="street-address"
							value={person.recipient.ADDRESS ?? ''}
							class="input"
						/>
					</div>
				</div>

				<div class="sm:col-span-3 sm:col-start-1">
					<label for="city" class="label">City</label>
					<div class="mt-2">
						<input
							type="text"
							name="city"
							id="city"
							autocomplete="address-level2"
							value={person.recipient.CITY ?? ''}
							class="input"
						/>
					</div>
				</div>

				<div class="sm:col-span-3">
					<label for="postal-code" class="label">ZIP / Postal code</label>
					<div class="mt-2">
						<input
							type="text"
							name="postal-code"
							id="postal-code"
							autocomplete="postal-code"
							value={person.recipient.POSTAL_CODE ?? ''}
							class="input"
						/>
					</div>
				</div>
			</div>
		</div>
	</div>

	<div class="mt-6 flex items-center justify-end gap-x-6">
		<button type="button" class="text-sm font-semibold leading-6 text-gray-900">Cancel</button>
		<button type="submit" class="btn variant-filled">Save</button>
	</div>
</form>
