import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { firebaseConfig } from 'config/constants';

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);


export default auth;
export { db };

