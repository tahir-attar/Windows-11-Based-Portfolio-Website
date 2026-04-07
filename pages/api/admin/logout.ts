import { NextApiRequest, NextApiResponse } from 'next';
import { ADMIN_AUTH_COOKIE_NAME } from '../../../utils/adminAuth';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const secureAttr = process.env.NODE_ENV === 'production' ? ' Secure;' : '';
  res.setHeader(
    'Set-Cookie',
    `${ADMIN_AUTH_COOKIE_NAME}=; HttpOnly; Path=/; Max-Age=0; SameSite=Strict;${secureAttr}`
  );
  return res.status(200).json({ success: true });
}
