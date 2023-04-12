import type {Actions, PageServerLoad} from './$types';
import {CLIENT_ID, CLIENT_SECRET} from '$env/static/private';
import {redirect} from "@sveltejs/kit";

export const load: PageServerLoad = async ({locals}) => {
    const {user} = await locals.auth.validateUser();
    if (!user) throw redirect(302, "/");
    return {
        user
    }
}
export const actions: Actions = {
    default: async ({request}) => {
        const formData = await request.formData();

        const customerId = formData.get('customerId');
        const voucherId = formData.get('voucherId');

        // Info: Hardcoded to use agi-extdemo-stag

        const data = await fetch(
            `https://api-eu1.agillic.net/recipients/${customerId}/oneToManyTables/VOUCHER_TABLE/`,
            {
                method: 'GET',
                headers: {
                    Authorization: `Basic ${Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64')}`,
                    'Content-Type': 'Application/json'
                }
            }
        );

        const {recordList} = await data.json();

        const found = recordList.find(
            (element: { ID: FormDataEntryValue | null; VOUCHER_REDEEMED: string }) =>
                element.ID === voucherId &&
                (element.VOUCHER_REDEEMED != 'true' || !element.VOUCHER_REDEEMED)
        );

        if (!found) {
            return {success: false};
        }

        // Info: Hardcoded to use agi-extdemo-stag

        const updateRes = await fetch(
            `https://api-eu1.agillic.net/recipients/${customerId}/oneToManyTables/VOUCHER_TABLE/:batchUpdateRecords`,
            {
                method: 'POST',
                headers: {
                    Authorization: `Basic ${Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64')}`,
                    'Content-Type': 'Application/json'
                },
                body: JSON.stringify([{ID: voucherId, VOUCHER_REDEEMED: true}])
            }
        );

        return {success: true, voucherInfo: found};
    }
};
