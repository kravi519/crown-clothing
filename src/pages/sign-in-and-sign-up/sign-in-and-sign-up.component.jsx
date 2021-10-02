import React from 'react';
import SignIn from '../../components/sign-in/sign-in.component';
import SignUp from '../../components/sign-up/sign-up.component';
import {SignInAndSignUpContainer} from '../sign-in-and-sign-up/sign-in-sign-up.style';
const SignInSignUpPage = () => (
    <SignInAndSignUpContainer>
        <SignIn/>
        <SignUp/>
    </SignInAndSignUpContainer>
)

export default (SignInSignUpPage);