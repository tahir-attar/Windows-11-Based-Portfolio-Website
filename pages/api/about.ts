import { NextApiRequest, NextApiResponse } from 'next';
import { adminDb } from '../../utils/firebaseAdmin';

const DOC_REF = adminDb.collection('portfolio_about').doc('skills');

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const snap = await DOC_REF.get();
    if (!snap.exists) {
      return res.status(404).json({ error: 'Not found' });
    }
    return res.status(200).json(snap.data());
  } catch {
    return res.status(500).json({ error: 'Internal server error' });
  }
}
