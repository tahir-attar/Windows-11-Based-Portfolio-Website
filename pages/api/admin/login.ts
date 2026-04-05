import { NextApiRequest, NextApiResponse } from 'next';
import { getAdminPassword } from '../../../utils/adminAuth';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { password } = req.body;
  const expected = getAdminPassword();

  if (!expected) {
    return res.status(500).json({ error: 'Admin password not configured' });
  }

  if (password !== expected) {
    return res.status(401).json({ error: 'Invalid password' });
  }

  res.setHeader(
    'Set-Cookie',
    `admin_auth=${expected}; HttpOnly; Path=/; Max-Age=86400; SameSite=Strict`,
  );
  return res.status(200).json({ success: true });
}
