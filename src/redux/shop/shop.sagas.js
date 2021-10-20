import {takeLatest, call, put} from 'redux-saga/effects';
import shopActionTypes from './shop.types';
import { firestore, convertCollctionsSnapShotToMap } from '../../firebase/firebase.util';

import { fetchCollectionSuccess, fetchCollectionFailure } from './shop.action';

export function* fetchCollectionsAsync(){

    try{
        const collectionRef = firestore.collection('collections');
        const snapShot = yield collectionRef.get();
        const collectionsMap = yield call(
            convertCollctionsSnapShotToMap, 
            snapShot
        );
        yield put(fetchCollectionSuccess(collectionsMap));
    }catch (error){
        yield put(fetchCollectionFailure(error.message));
    }   

    // collectionRef.get().then(snapshot =>{                
    //     const collectionsMap = convertCollctionsSnapShotToMap(snapshot);
    //     dispatch(fetchCollectionSuccess(collectionsMap));           
    // }).catch(error => dispatch(fetchCollectionFailure(error.message))); 
}

export function* fetchCollectionStart(){
    yield takeLatest(
        shopActionTypes.FETCH_COLLECTIONS_START,
        fetchCollectionsAsync
    )
} 