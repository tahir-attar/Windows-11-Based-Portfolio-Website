import { NextApiRequest, NextApiResponse } from 'next';
import { adminDb } from '../../../utils/firebaseAdmin';
import { requireAuth } from '../../../utils/adminAuth';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (!(await requireAuth(req, res))) return;

  if (req.method === 'GET') {
    try {
      const snapshot = await adminDb
        .collection('comments')
        .orderBy('createdAt', 'desc')
        .get();

      const comments = snapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          _id: doc.id,
          author: data.author,
          comment: data.comment,
          gender: data.gender || 'male',
          is_approved: data.is_approved ?? true,
          createdAt:
            data.createdAt?.toDate?.()?.toISOString() ??
            new Date().toISOString(),
        };
      });

      return res.status(200).json({ success: true, comments });
    } catch (error: any) {
      return res.status(500).json({ success: false, message: error.message });
    }
  }

  if (req.method === 'PATCH') {
    try {
      const { id, is_approved } = req.body;
      if (!id)
        return res.status(400).json({ success: false, message: 'Missing id' });

      await adminDb.collection('comments').doc(id).update({ is_approved });
      return res.status(200).json({ success: true });
    } catch (error: any) {
      return res.status(500).json({ success: false, message: error.message });
    }
  }

  if (req.method === 'DELETE') {
    try {
      const { id } = req.query;
      if (!id || typeof id !== 'string') {
        return res.status(400).json({ success: false, message: 'Missing id' });
      }
      await adminDb.collection('comments').doc(id).delete();
      return res.status(200).json({ success: true });
    } catch (error: any) {
      return res.status(500).json({ success: false, message: error.message });
    }
  }

  return res
    .status(405)
    .json({ success: false, message: 'Method not allowed' });
}
