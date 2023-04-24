import { CLIENT_ID, CLIENT_SECRET } from '$env/static/private';
import type { Actions, PageServerLoad } from './$types';
import { error, redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ request, locals }) => {
	const { user } = await locals.auth.validateUser();
	if (!user) throw redirect(302, '/');

	const today = new Date();

	const past = new Date(new Date().setDate(today.getDate() - 7));

	const res = await fetch(
		`https://api-eu1.agillic.net/recipients/?filter=LAST_UPDATED>${new Date(
			past
		).toISOString()}&dateEnd=${new Date(today).toISOString()}`,
		{
			method: 'GET',
			headers: {
				Authorization: `Basic ${Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64')}`
			}
		}
	);

	const response = await res.json();

	if (!res.ok) {
		console.log(res);

		throw error(503, {
			message: 'Service Unavailable'
		});
	} else {
		const allRecipients = response.map((v: any) => ({
			...v.personData
		}));
		return { user, allRecipients };
	}
};

// Info: Showing recipients updated in the last 14 days
// const today = new Date();
// const past = new Date(new Date().setDate(today.getDate() - 30));
// const res = await fetch(
// 	`https://api-eu1.agillic.net/recipients/?filter=LAST_UPDATED>${new Date(
// 		past
// 	).toISOString()}&dateEnd=${new Date(today).toISOString()}`,
// 	{
// 		method: 'GET',
// 		headers: {
// 			Authorization: `Basic ${Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64')}`
// 		}
// 	}
// );
// if (!res.ok) {
// 	console.error(res);
// 	throw error(503, {
// 		message: 'Service Unavailable'
// 	});
// }
// const allRecipients = await res.json();
// return { allRecipients };
// const getRecipients = async () => {
// 	const res = await fetch('http://localhost:5173/api/recipients', {
// 		method: 'get'
// 	});
// 	const allRecipients = await res.json();
// 	return allRecipients
// };
// return getRecipients();

export const actions = {
	searchRecipients: async ({ request }) => {
		const formData = await request.formData();

		const data = await fetch(
			`https://api-eu1.agillic.net/recipients/?filter=EMAIL==*${formData.get('search')}*`,
			{
				method: 'GET',
				headers: {
					Authorization: `Basic ${Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64')}`
				}
			}
		);

		const response = await data.json();

		return { formRecipients: response };
	},
	deleteRecipients: async ({ request }) => {
		const formData = await request.formData();

		const ids = formData.get('selected') as string;

		const arrayOfRecipients = ids.split(',');

		// arrayOfRecipients.forEach((recipient) => {
		// 	deleteRecipient(recipient);
		// });

		// async function deleteRecipient(recipient: String) {
		// 	const res = await fetch(`https://api-eu1.agillic.net/recipients/AGILLIC_ID=${recipient}`, {
		// 		method: 'DELETE',
		// 		headers: {
		// 			Authorization: `Basic ${Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64')}`,
		// 			'Content-Type': 'Application/json'
		// 		}
		// 	});

		// 	console.log(res);
		// }

		// if (arrayOfRecipients.length !== 0) {
		// 	{
		// 		success: false;
		// 	}
		// }

		return { success: true };
	}
} satisfies Actions;
