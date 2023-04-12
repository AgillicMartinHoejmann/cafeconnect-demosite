import {CLIENT_ID, CLIENT_SECRET} from '$env/static/private';
import type {PageServerLoad} from './$types';
import type {Actions} from './$types';
import {redirect} from "@sveltejs/kit";

export const load: PageServerLoad = async ({params, locals}) => {
    const {user} = await locals.auth.validateUser();
    if (!user) throw redirect(302, "/");

    const res = await fetch(`https://api-eu1.agillic.net/recipients/AGILLIC_ID=${params.slug}`, {
        method: 'GET',
        headers: {
            Authorization: `Basic ${Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64')}`
        }
    });
    const recipientData = await res.json();

    const {personData: recipient} = recipientData;

    const today = new Date();

    const past = new Date(new Date().setDate(today.getDate() - 14));


    const data = await fetch(
        `https://api-eu1.agillic.net/recipients/AGILLIC_ID=${params.slug}/:listCommunicationHistory?dateStart=${new Date(past).toISOString()}&dateEnd=${new Date(today).toISOString()}`,
        {
            method: 'POST',
            headers: {
                Authorization: `Basic ${Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64')}`
            }
        }
    );

    const recipientHistory = await data.json();

    return {user, recipient, history: recipientHistory};
};

export const actions: Actions = {
    default: async ({request}) => {
        const formData = await request.formData();

        const data = await fetch(
            `https://api-eu1.agillic.net/recipients/AGILLIC_ID=${formData.get('agillicId')}`,
            {
                method: 'put',
                headers: {
                    Authorization: `Basic ${Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64')}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    personData: {
                        EMAIL: formData.get('email'),
                        FIRSTNAME: formData.get('firstName'),
                        LASTNAME: formData.get('lastName')
                    }
                })
            }
        );

        const response = data.status;

        return {response};
    }
};
