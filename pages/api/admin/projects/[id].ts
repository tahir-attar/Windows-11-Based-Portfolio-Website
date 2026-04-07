import { NextApiRequest, NextApiResponse } from 'next';
import { adminDb } from '../../../../utils/firebaseAdmin';
import { requireAuth } from '../../../../utils/adminAuth';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (!(await requireAuth(req, res))) return;

  const { id } = req.query as { id: string };
  const docRef = adminDb.collection('portfolio_projects').doc(id);

  if (req.method === 'PUT') {
    await docRef.set(req.body, { merge: true });
    return res.status(200).json({ success: true });
  }

  if (req.method === 'DELETE') {
    await docRef.delete();
    return res.status(200).json({ success: true });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
