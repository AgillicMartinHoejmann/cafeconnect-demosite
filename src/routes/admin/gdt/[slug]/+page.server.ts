import {CLIENT_ID, CLIENT_SECRET} from '$env/static/private';
import type {Actions, PageServerLoad} from './$types';
import {redirect} from "@sveltejs/kit";

export const load: PageServerLoad = async ({locals, params}) => {

    const {user} = await locals.auth.validateUser();
    if (!user) throw redirect(302, "/");


    const res = await fetch(
        `https://api-eu1.agillic.net/globaldata/tables/ARTICLES/record/${params.slug}`,
        {
            method: 'GET',
            headers: {
                Authorization: `Basic ${Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64')}`
            }
        }
    );
    const gdtRecord = await res.json();

    return {user, gdtRecord};
};

export const actions: Actions = {
    default: async ({request}) => {
        const formData = await request.formData();

        const data = await fetch(
            `https://api-eu1.agillic.net/globaldata/tables/ARTICLES/record/${formData.get('recordId')}`,
            {
                method: 'put',
                headers: {
                    Authorization: `Basic ${Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64')}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    TITLE: formData.get('title'),
                    DESCRIPTION: formData.get('description'),
                    CATEGORY: formData.get('category')
                })
            }
        );

        const response = data.status;

        return {response};
    }
};
