import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.setHeader(
    'Set-Cookie',
    'admin_auth=; HttpOnly; Path=/; Max-Age=0; SameSite=Strict',
  );
  return res.status(200).json({ success: true });
}
