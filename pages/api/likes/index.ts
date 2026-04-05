import { NextApiRequest, NextApiResponse } from 'next';
import { adminDb } from '../../../utils/firebaseAdmin';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method === 'GET') {
      const snap = await adminDb.collection('portfolio_likes').get();
      return res.status(200).json({
        success: true,
        totalLikes: snap.size,
        likes: [],
      });
    }

    if (req.method === 'POST') {
      await adminDb.collection('portfolio_likes').add({ createdAt: new Date() });
      return res.status(200).json({
        success: true,
        newLike: {},
      });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error: any) {
    console.error('Error handling likes:', error);
    return res.status(500).json({ success: false, error: error.message });
  }
}
