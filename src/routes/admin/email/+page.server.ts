import {CLIENT_ID, CLIENT_SECRET} from '$env/static/private';
import {error, redirect} from '@sveltejs/kit';
import type {Actions, PageServerLoad} from './$types';


export const load: PageServerLoad = async ({locals}) => {
        const {user} = await locals.auth.validateUser();
        if (!user) throw redirect(302, "/");


        const res = await fetch(`https://api-eu1.agillic.net/recipients/AGILLIC_ID=.EbrB`, {
            method: 'GET',
            headers: {
                Authorization: `Basic ${Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64')}`
            }
        });
        const recipientData = await res.json();

        const {personData: recipient} = recipientData;

        const today = new Date();

        const past = new Date(new Date().setDate(today.getDate() - 3));

        const data = await fetch(
            `https://api-eu1.agillic.net/recipients/AGILLIC_ID=.EbrB/:listCommunicationHistory?dateStart=${new Date(
                past
            ).toISOString()}&dateEnd=${new Date(today).toISOString()}`,
            {
                method: 'POST',
                headers: {
                    Authorization: `Basic ${Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64')}`
                }
            }
        );

        const recipientHistory = await data.json();

        return {user, recipient, history: recipientHistory};
    }
;

export const actions = {
    updateEmailData: async ({request}) => {
        const form = await request.formData();

        const updateEmailDataRes = await fetch(
            `https://api-eu1.agillic.net/recipients/AGILLIC_ID=.EbrB`,
            {
                method: 'PUT',
                headers: {
                    Authorization: `Basic ${Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64')}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({personData: {EMAIL: form.get('email')}})
            }
        );

        switch (updateEmailDataRes.status) {
            case 409:
                return {message: 'Conflict'};
            default:
                return {message: 'Success'};
        }
    },
    sendTestEmail: async ({fetch, request}) => {
        const form = await request.formData();

        const requestBody = {
            context_parameters: {
                name: 'editor',
                SUBJECT_LINE: form.get('subjectLine'),
                HEADER: form.get('header'),
                BODY: form.get('body')
            }
        };

        const sendTestEmailRes = await fetch(
            `https://api-eu1.agillic.net/recipients/AGILLIC_ID=.EbrB/events/send_message/:achieveWithContext`,
            {
                method: 'POST',
                headers: {
                    Authorization: `Basic ${Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64')}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestBody)
            }
        );

        if (!sendTestEmailRes.ok) {
            throw error(500, {message: 'Something went wrong'});
        }

        return {success: true};
    }
} satisfies Actions;
