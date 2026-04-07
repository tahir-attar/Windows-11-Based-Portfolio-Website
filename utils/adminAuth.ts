import { NextApiRequest, NextApiResponse } from 'next';
import * as admin from 'firebase-admin';
import './firebaseAdmin';

export const ADMIN_AUTH_COOKIE_NAME = 'admin_auth';

export function getAdminAllowedEmail(): string {
  return (process.env.ADMIN_EMAIL || '').trim().toLowerCase();
}

export async function isAuthenticated(req: NextApiRequest): Promise<boolean> {
  const sessionCookie = req.cookies[ADMIN_AUTH_COOKIE_NAME];
  if (!sessionCookie || !admin.apps.length) return false;

  try {
    const decoded = await admin.auth().verifySessionCookie(sessionCookie, true);
    const allowedEmail = getAdminAllowedEmail();

    if (!allowedEmail) return true;
    return decoded.email?.toLowerCase() === allowedEmail;
  } catch {
    return false;
  }
}

export async function requireAuth(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<boolean> {
  if (!admin.apps.length) {
    res.status(500).json({ error: 'Firebase Admin not initialized' });
    return false;
  }

  const sessionCookie = req.cookies[ADMIN_AUTH_COOKIE_NAME];
  if (!sessionCookie) {
    res.status(401).json({ error: 'Unauthorized' });
    return false;
  }

  try {
    const decoded = await admin.auth().verifySessionCookie(sessionCookie, true);
    const allowedEmail = getAdminAllowedEmail();

    if (allowedEmail && decoded.email?.toLowerCase() !== allowedEmail) {
      res.status(403).json({ error: 'Forbidden' });
      return false;
    }
  } catch {
    res.status(401).json({ error: 'Unauthorized' });
    return false;
  }

  return true;
}
