import { initializeApp, getApp, getApps } from 'firebase/app';
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';

// Detect if configuration contains live credentials or default mock values
export const isLiveFirebase = 
  firebaseConfig.apiKey && 
  firebaseConfig.apiKey !== 'mock-api-key' && 
  !firebaseConfig.apiKey.includes('placeholder') &&
  firebaseConfig.projectId !== 'mock-project';

let firebaseApp;
let dbInstance: any = null;
let authInstance: any = null;

if (isLiveFirebase) {
  try {
    firebaseApp = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
    dbInstance = getFirestore(firebaseApp, firebaseConfig.firestoreDatabaseId || '(default)');
    authInstance = getAuth(firebaseApp);
  } catch (error) {
    console.warn("Failed to initialize Live Firebase SDK, resorting to client simulation:", error);
  }
} else {
  console.log("Firebase config contains mock keys. Admin portal running in client local-storage mode safely.");
}

export const db = dbInstance;
export const auth = authInstance;

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  }
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth?.currentUser?.uid || null,
      email: auth?.currentUser?.email || null,
      emailVerified: auth?.currentUser?.emailVerified || null,
      isAnonymous: auth?.currentUser?.isAnonymous || null,
      tenantId: auth?.currentUser?.tenantId || null,
      providerInfo: auth?.currentUser?.providerData?.map(provider => ({
        providerId: provider.providerId,
        email: provider.email,
      })) || []
    },
    operationType,
    path
  };
  console.error('Firestore Hardened Gate Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}
