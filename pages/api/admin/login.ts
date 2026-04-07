import { NextApiRequest, NextApiResponse } from 'next';
import * as admin from 'firebase-admin';
import '../../../utils/firebaseAdmin';
import {
  ADMIN_AUTH_COOKIE_NAME,
  getAdminAllowedEmail,
} from '../../../utils/adminAuth';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  if (!admin.apps.length) {
    return res.status(500).json({ error: 'Firebase Admin not initialized' });
  }

  const { idToken } = req.body as { idToken?: string };

  if (!idToken) {
    return res.status(400).json({ error: 'Missing Firebase ID token' });
  }

  try {
    const decoded = await admin.auth().verifyIdToken(idToken, true);
    const allowedEmail = getAdminAllowedEmail();

    if (allowedEmail && decoded.email?.toLowerCase() !== allowedEmail) {
      return res.status(403).json({ error: 'Forbidden' });
    }

    const expiresIn = 1000 * 60 * 60 * 24 * 5;
    const sessionCookie = await admin.auth().createSessionCookie(idToken, {
      expiresIn,
    });

    const secureAttr = process.env.NODE_ENV === 'production' ? ' Secure;' : '';

    res.setHeader(
      'Set-Cookie',
      `${ADMIN_AUTH_COOKIE_NAME}=${sessionCookie}; HttpOnly; Path=/; Max-Age=${Math.floor(
        expiresIn / 1000
      )}; SameSite=Strict;${secureAttr}`
    );

    return res.status(200).json({ success: true });
  } catch (error: any) {
    return res
      .status(401)
      .json({ error: error?.message || 'Invalid credentials' });
  }
}
