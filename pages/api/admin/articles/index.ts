import { NextApiRequest, NextApiResponse } from 'next';
import { adminDb } from '../../../../utils/firebaseAdmin';
import { requireAuth } from '../../../../utils/adminAuth';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (!requireAuth(req, res)) return;

  const col = adminDb.collection('portfolio_articles');

  if (req.method === 'GET') {
    const snap = await col.orderBy('order', 'asc').get();
    const articles = snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    return res.status(200).json(articles);
  }

  if (req.method === 'POST') {
    const countSnap = await col.count().get();
    const order = countSnap.data().count;
    const docRef = await col.add({ ...req.body, order });
    return res.status(201).json({ id: docRef.id });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
