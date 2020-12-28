import * as firebase from 'firebase';
import '@firebase/auth';
import '@firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyCrO8K1grPnKy3Ws62_ze_NGWMaRab16JI',
  authDomain: 'databanhang-a7a9e.firebaseapp.com',
  projectId: 'databanhang-a7a9e',
  storageBucket: 'databanhang-a7a9e.appspot.com',
  messagingSenderId: '314116752223',
  appId: '1:314116752223:web:152261b1e9bcee574c6cea',
  measurementId: 'G-TRXLFN91DX',
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export {firebase};
