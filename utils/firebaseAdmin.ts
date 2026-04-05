import * as admin from 'firebase-admin';

if (!admin.apps.length) {
  try {
    const raw = process.env.FIREBASE_SERVICE_ACCOUNT_JSON;
    if (!raw) {
      throw new Error('FIREBASE_SERVICE_ACCOUNT_JSON environment variable is not set');
    }
    const serviceAccount = JSON.parse(raw);
    const storageBucket = (process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || '').replace(/^gs:\/\//, '');
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      ...(storageBucket ? { storageBucket } : {}),
    });
  } catch (error) {
    console.error('[firebaseAdmin] Initialization failed:', error);
  }
}

export const adminDb = new Proxy({} as admin.firestore.Firestore, {
  get: (_, prop) => {
    if (!admin.apps.length) throw new Error("Firebase Admin not initialized. Check your FIREBASE_SERVICE_ACCOUNT_JSON format.");
    return (admin.firestore() as any)[prop];
  }
});

export const adminStorage = new Proxy({} as admin.storage.Storage, {
  get: (_, prop) => {
    if (!admin.apps.length) throw new Error("Firebase Admin not initialized. Check your FIREBASE_SERVICE_ACCOUNT_JSON format.");
    return (admin.storage() as any)[prop];
  }
});
