import { takeLatest, put, all, call } from "@redux-saga/core/effects";
import userActionTypes from "./user.types";
import { googleProvider, auth, createUserProfileDocument, getCurrentUser } from "../../firebase/firebase.util";
import { signInSuccess, signInFailure, signOutSuccess, signOutFailure, signUpFailure, signUpSuccess } from "./user.action";

export function* getSnapShotFromUserAuth(userAuth, additionalData){
    try{
        const userRef = yield call (createUserProfileDocument, userAuth, additionalData);
        const userSnapShot = yield userRef.get();
        yield put(
            signInSuccess({id: userSnapShot.id, ...userSnapShot.data()})
        )
    }catch(error){
        yield put(signInFailure(error))
    }
}
export function* signInWithGoogle(){
    try{
        const {user} = yield auth.signInWithPopup(googleProvider);
        yield getSnapShotFromUserAuth(user);
    }catch (error){
        yield put(signInFailure(error))
    }
}

export function* onGoogleSignInStart(){
    yield takeLatest(userActionTypes.GOOGLE_SIGN_IN_START, signInWithGoogle)
}

export function* signUp({payload: {email, password, displayName}}){
    try{
       const {user} = yield auth.createUserWithEmailAndPassword(email, password);
       yield put (signUpSuccess({user, additionalData: {displayName}}))
    }catch (error){  
        yield put (signUpFailure(error));
    }   
}

export function* signInAfterSignUp({payload: {user, additionalData}}){
    yield getSnapShotFromUserAuth(user, additionalData);
}

export function* onSignUpStart(){
    yield takeLatest(userActionTypes.SIGN_UP_START, signUp)
}

export function*onSignUpSuccess(){
    yield takeLatest(userActionTypes.SIGN_UP_SUCCESS, signInAfterSignUp)
}

export function* signInWithEmail({payload: { email, password }}){
    try{
        const {user} = yield auth.signInWithEmailAndPassword(email, password);   
        yield getSnapShotFromUserAuth(user);
    }catch(error){
        yield put (signInFailure(error));
    }
}


export function* onEmailSignInStart(){
    yield takeLatest(userActionTypes.EMAIL_SIGN_IN_START,
        signInWithEmail
        )
}

export function* isUserAuthenticated(){
    try{
        const userAuth = yield getCurrentUser();
        if (!userAuth) return;
        yield getSnapShotFromUserAuth(userAuth);
    }catch (error){
        yield put(signInFailure(error));
    }
}

export function* signOut(){
    try{        
        yield auth.signOut();
        yield put (signOutSuccess());
    }catch (error){
        yield put (signOutFailure());
    }
}

export function* onCheckuserSession(){
    yield takeLatest(userActionTypes.CHECK_USER_SESSION, isUserAuthenticated)
}

export function* onSignOutStart(){
    yield takeLatest(userActionTypes.SIGN_OUT_START, signOut)
}

export function* userSagas(){
    yield all([
        call(onGoogleSignInStart),
        call(onEmailSignInStart),
        call(onCheckuserSession),
        call(onSignOutStart),
        call(onSignUpStart),
        call(onSignUpSuccess)
    ]
    )
}