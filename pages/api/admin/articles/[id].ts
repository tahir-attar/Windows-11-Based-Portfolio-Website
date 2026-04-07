import { NextApiRequest, NextApiResponse } from 'next';
import { adminDb } from '../../../../utils/firebaseAdmin';
import { requireAuth } from '../../../../utils/adminAuth';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (!requireAuth(req, res)) return;

  const { id } = req.query;
  if (!id || typeof id !== 'string')
    return res.status(400).json({ error: 'Missing or invalid id' });

  const docRef = adminDb.collection('portfolio_articles').doc(id);

  if (req.method === 'PUT') {
    await docRef.update(req.body);
    try {
      await res.revalidate('/articles');
    } catch (error) {
      console.warn(
        '[admin/articles/:id] Revalidate failed for /articles:',
        error
      );
    }
    return res.status(200).json({ success: true });
  }

  if (req.method === 'DELETE') {
    await docRef.delete();
    try {
      await res.revalidate('/articles');
    } catch (error) {
      console.warn(
        '[admin/articles/:id] Revalidate failed for /articles:',
        error
      );
    }
    return res.status(200).json({ success: true });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
