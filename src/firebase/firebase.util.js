import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const config = {
    apiKey: "AIzaSyD5HkfJezsHepnECW_yoWXg4KEF62drVOk",
    authDomain: "crown-clothing-db-dcbb1.firebaseapp.com",
    projectId: "crown-clothing-db-dcbb1",
    storageBucket: "crown-clothing-db-dcbb1.appspot.com",
    messagingSenderId: "1029384607332",
    appId: "1:1029384607332:web:4bd3c7eb489466ff7c7171",
    measurementId: "G-J6KM9VGQQS"
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;
  
    const userRef = firestore.doc(`users/${userAuth.uid}`);
  
    const snapShot = await userRef.get();
  
    if (!snapShot.exists) {
      const { displayName, email } = userAuth;
      const createdAt = new Date();
      try {
        await userRef.set({
          displayName,
          email,
          createdAt,
          ...additionalData
        });
      } catch (error) {
        console.log('error creating user', error.message);
      }
    }
  
    return userRef;
  };

  export const addCollectionsAndDocuments = async (collectionKey, objectsToAdd) => {
    const collectionRef = firestore.collection(collectionKey);
    console.log(collectionRef);
    const batch = firestore.batch();
    objectsToAdd.forEach(element => {
      const newDocRef = collectionRef.doc(); // will generate Id for firebase
      batch.set(newDocRef, element);
      console.log(newDocRef);
    });
    return await batch.commit();
  }

  export const getCurrentUser = () =>{
     return new Promise((resolve, reject) => {
       const unSubscribe = auth.onAuthStateChanged(userAuth => {
         unSubscribe();
         resolve(userAuth);
       }, reject) 
     })
  }

  export const convertCollctionsSnapShotToMap = (collections) =>{
    const transformedCollection = collections.docs.map(doc => {
      const {title, items} = doc.data();
      return{
        routeName: encodeURI(title.toLowerCase()),
        id: doc.id,
        title,
        items
      };
    })
    return transformedCollection.reduce((accumulator, collection) =>{
      accumulator[collection.title.toLowerCase()] = collection;
      return accumulator;
    },{})
  }

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);

export default firebase;
