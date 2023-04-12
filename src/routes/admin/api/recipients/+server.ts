import {CLIENT_ID, CLIENT_SECRET} from '$env/static/private';
import type {RequestHandler} from './$types';

export const GET: RequestHandler = async ({request, locals}) => {
        // if (!locals.user || locals.user.role != 1) {
        // 	return new Response(JSON.stringify({ message: 'Forbidden' }), { status: 403 });
        // }

        const {user} = await locals.auth.validateUser();
        if (!user) {
            return new Response(JSON.stringify({message: 'Forbidden'}), {status: 403});
        }

        const today = new Date();

        const past = new Date(new Date().setDate(today.getDate() - 2));

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

        const allRecipients = response.map((v: any) => ({
            ...v.personData
        }));

        if (!res.ok) {
            return new Response(JSON.stringify({message: 'Unexpected Error'}), {status: 500});
        }
        return new Response(JSON.stringify(allRecipients), {status: 200});
    }
;

export const DELETE: RequestHandler = async ({request, locals}) => {

    const {user} = await locals.auth.validateUser();
    if (!user) {
        return new Response(JSON.stringify({message: 'Forbidden'}), {status: 403});
    }

    const body = await request.json();

    const deleteRecipient = await fetch(
        `https://api-eu1.agillic.net/recipients/AGILLIC_ID=${body.recipientId}`,
        {
            method: 'delete',
            headers: {
                Authorization: `Basic ${Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64')}`
            }
        }
    );

    if (!deleteRecipient.ok) {
        return new Response(JSON.stringify({message: 'Unexpected Error'}), {status: 500});
    }
    return new Response(JSON.stringify({message: 'Successfully Deleted'}), {status: 200});
};
