import { NextApiRequest, NextApiResponse } from 'next';
import { requireAuth } from '../../../utils/adminAuth';
import { adminStorage } from '../../../utils/firebaseAdmin';

export const config = { api: { bodyParser: { sizeLimit: '15mb' } } };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (!(await requireAuth(req, res))) return;
  if (req.method !== 'POST')
    return res.status(405).json({ error: 'Method not allowed' });

  const { data, filename, contentType } = req.body;
  if (!data) return res.status(400).json({ error: 'No file data provided' });

  try {
    const base64Data = (data as string).replace(/^data:[^;]+;base64,/, '');
    const buffer = Buffer.from(base64Data, 'base64');
    const ext = ((filename as string) || 'image.jpg').split('.').pop() || 'jpg';
    const destination = `portfolio-projects/${Date.now()}.${ext}`;

    const bucketName = (
      process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || ''
    ).replace(/^gs:\/\//, '');
    const bucket = adminStorage.bucket(bucketName);
    const file = bucket.file(destination);

    await file.save(buffer, {
      metadata: { contentType: contentType || 'image/jpeg' },
    });
    await file.makePublic();

    const publicUrl = `https://storage.googleapis.com/${bucket.name}/${destination}`;
    return res.status(200).json({ url: publicUrl });
  } catch (err: any) {
    console.error('[upload] Error:', err);
    return res.status(500).json({ error: err.message || 'Upload failed' });
  }
}
