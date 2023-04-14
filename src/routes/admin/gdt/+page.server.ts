import { CLIENT_ID, CLIENT_SECRET } from '$env/static/private';
import { error, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ request, locals }) => {
	const { user } = await locals.auth.validateUser();
	if (!user) throw redirect(302, '/');

	// const discoveryTables = await fetch('https://api-eu1.agillic.net/discovery/globaldata/tables', {
	//     method: 'GET',
	//     headers: {
	//         Authorization: `Basic ${Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64')}`
	//     }
	// });
	const articlesTable = await fetch('https://api-eu1.agillic.net/globaldata/tables/ARTICLES', {
		method: 'GET',
		headers: {
			Authorization: `Basic ${Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64')}`
		}
	});

	if (!articlesTable.ok) {
		throw error(503, {
			message: 'Service Unavailable'
		});
	} else {
		const gdtTable = await articlesTable.json();

		const { records: gdtRows } = gdtTable;

		return { user, gdtRows };
	}
};

export const actions: Actions = {
	// default: async ({request}) => {
	//     const data = await request.formData();
	//     console.log(data.get('table'));
	//     return {success: true}
	// },
	// getGdtTable: async ({ request }) => {
	//     const formData = await request.formData()
	//     const data = await fetch(`https://api-eu1.agillic.net/globaldata/tables/${formData.get('gdtTable')}`, {
	//         method: 'GET',
	//         headers: {
	//             Authorization: `Basic ${Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64')}`
	//         }
	//     });
	//     const res = await data.json()
	//     return { gdtTable: res }
	// },
	deleteGdtRecords: async ({ request }) => {
		const formData = await request.formData();

		const ids = formData.get('selected') as string;

		const arrayOfIds = ids.split(',');

		const gdtRecordIds: Array<Object> = [];

		arrayOfIds.forEach((item) => {
			gdtRecordIds.push({ ID: item });
		});

		const res = await fetch(
			`https://api-eu1.agillic.net/globaldata/tables/ARTICLES/:batchDeleteRecords`,
			{
				method: 'POST',
				headers: {
					Authorization: `Basic ${Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64')}`,
					'Content-Type': 'Application/json'
				},
				body: JSON.stringify(gdtRecordIds)
			}
		);

		if (res.status === 200) {
			return { success: true };
		}
	},
	createGdtRecord: async () => {
		const data = await fetch(`https://api-eu1.agillic.net/globaldata/tables/ARTICLES/record`, {
			method: 'POST',
			headers: {
				Authorization: `Basic ${Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64')}`,
				'Content-Type': 'Application/json'
			},
			body: JSON.stringify({ ID: Math.random().toString(16).slice(2) })
		});

		if (data.status === 200) {
			return { success: true };
		}
	},
	updateGdtTable: async ({ request }) => {
		const formData = await request.formData();
		const requestData = {
			ID: formData.get('id'),
			TITLE: formData.get('title'),
			DESCRIPTION: formData.get('description')
		};

		const data = await fetch(
			`https://api-eu1.agillic.net/globaldata/tables/${formData.get(
				'gdtTable'
			)}/record/${formData.get('id')}`,
			{
				method: 'PUT',
				headers: {
					Authorization: `Basic ${Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64')}`,
					'Content-Type': 'Application/json'
				},
				body: JSON.stringify(requestData)
			}
		);

		if (data.status === 200) {
			return { success: true };
		}
	}
};
