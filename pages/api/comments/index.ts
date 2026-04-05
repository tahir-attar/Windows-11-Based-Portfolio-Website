import { NextApiRequest, NextApiResponse } from 'next';
import { adminDb } from '../../../utils/firebaseAdmin';
import { containsExplicitContent } from '../../../utils/contentFilter';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const snapshot = await adminDb
        .collection('comments')
        .orderBy('createdAt', 'desc')
        .get();

      const comments = snapshot.docs
        .map((doc) => {
          const data = doc.data();
          return {
            _id: doc.id,
            comment: data.comment,
            author: data.author,
            isApproved: data.is_approved ?? true,
            createdAt: data.createdAt?.toDate?.()?.toISOString() ?? new Date().toISOString(),
            gender: data.gender || 'male',
            is_approved: data.is_approved ?? true,
          };
        })
        .filter((c) => c.is_approved === true);

      return res.status(200).json({ success: true, total: comments.length, comments });
    } catch (error: any) {
      return res.status(500).json({ success: false, message: error.message });
    }
  }

  if (req.method === 'POST') {
    try {
      const { author, comment, gender } = req.body;

      if (!author || !comment || !gender) {
        return res.status(400).json({ success: false, message: 'All fields are required.' });
      }

      if (containsExplicitContent(comment) || containsExplicitContent(author)) {
        return res.status(400).json({
          success: false,
          message: 'Your comment contains inappropriate language. Please keep it friendly!',
        });
      }

      await adminDb.collection('comments').add({
        author,
        comment,
        gender,
        is_approved: false,
        createdAt: new Date(),
      });

      return res.status(200).json({ success: true });
    } catch (error: any) {
      return res.status(500).json({ success: false, message: error.message });
    }
  }

  return res.status(405).json({ success: false, message: 'Method not allowed' });
}
