import { redirect } from '@sveltejs/kit';
import crypto from 'crypto';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals, url }) => {
	const { user } = await locals.auth.validateUser();
	if (!user) throw redirect(302, '/');

	const agillicId = url.searchParams.get('agid');

	const timestamp = '1719044450';

	const salt = 'EvzcbfUyNZNX2Q2VotyTwkhwYtoIK6';

	const agillicIdTimestampSecretSalt = agillicId + ':' + timestamp + salt;

	const md5Binary = crypto.createHash('md5').update(agillicIdTimestampSecretSalt).digest('binary');

	let b1 = Buffer.from(agillicId + ':' + timestamp);
	let b2 = Buffer.from(md5Binary, 'binary');
	let lgn_uid = Buffer.concat([b1, b2]).toString('base64url');

	return {
		user,
		lgn_uid
	};
};
