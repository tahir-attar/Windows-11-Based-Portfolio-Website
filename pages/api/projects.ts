import { NextApiRequest, NextApiResponse } from 'next';
import { adminDb } from '../../utils/firebaseAdmin';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });

  const snap = await adminDb
    .collection('portfolio_projects')
    .orderBy('order', 'asc')
    .get();

  const projects = snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  return res.status(200).json(projects);
}
