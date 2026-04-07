import { NextApiRequest, NextApiResponse } from 'next';
import { adminDb } from '../../../utils/firebaseAdmin';
import { requireAuth } from '../../../utils/adminAuth';

const DOC_REF = adminDb.collection('portfolio_about').doc('skills');

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    const snap = await DOC_REF.get();
    if (!snap.exists) return res.status(404).json({ error: 'Not found' });
    return res.status(200).json(snap.data());
  }

  if (req.method === 'PUT') {
    if (!(await requireAuth(req, res))) return;
    await DOC_REF.set(req.body, { merge: false });
    return res.status(200).json({ success: true });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
