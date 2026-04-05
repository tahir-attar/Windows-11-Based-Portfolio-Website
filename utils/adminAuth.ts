import { NextApiRequest, NextApiResponse } from 'next';

export function getAdminPassword(): string {
  return process.env.ADMIN_PASSWORD || '';
}

export function isAuthenticated(req: NextApiRequest): boolean {
  const cookie = req.cookies['admin_auth'];
  const expected = getAdminPassword();
  if (!expected) return false;
  return cookie === expected;
}

export function requireAuth(
  req: NextApiRequest,
  res: NextApiResponse,
): boolean {
  if (!isAuthenticated(req)) {
    res.status(401).json({ error: 'Unauthorized' });
    return false;
  }
  return true;
}
