import { NextApiRequest, NextApiResponse } from 'next';
import { adminDb } from '../../../utils/firebaseAdmin';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const col = adminDb.collection('portfolio_articles');
    // Sort logic relies on whatever field we use. Let's use order or published_at
    const snap = await col.orderBy('order', 'asc').get();
    
    const articles = snap.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    // The frontend reducer expects the data directly or { data }
    return res.status(200).json(articles);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
}
