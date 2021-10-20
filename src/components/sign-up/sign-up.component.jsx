import React from 'react';
import { SignUpContainer, SignUpTitle } from './sign-up.style';
import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';
import { signUpStart } from '../../redux/user/user.action';
import { connect } from 'react-redux';

class SignUp extends React.Component{
    constructor(){
        super();
        this.state ={
            email:'',
            displayName:'',
            password:'',
            confirmPassword:''            
        }        
    }

    handleSubmit = async event =>{        
        event.preventDefault();
        const {signUpStart} = this.props;
        const {displayName, email, password, confirmPassword} = this.state;
        if (password !== confirmPassword){
            alert("Password do not match");
            return;
        }
        signUpStart({displayName, email, password});
    }

    handleChange = event =>{
        const{name, value} = event.target;
        this.setState({[name]: value});
    }
    render(){
        const {displayName, email, password, confirmPassword} = this.state;
        return (
            <SignUpContainer>
                <SignUpTitle> I do not have an account</SignUpTitle>
                <span>Sign up with your email amd password</span>
                <form className='sign-up-form' onSubmit={this.handleSubmit}>
                    <FormInput type='text' name='displayName' value={displayName} onChange={this.handleChange}
                    label='Display Name' required
                    ></FormInput>
                    <FormInput type='text' name='email' value={email} onChange={this.handleChange}
                    label='Email' required
                    ></FormInput>
                    <FormInput type='password' name='password' value={password} onChange={this.handleChange}
                    label='Password' required
                    ></FormInput>
                    <FormInput type='password' name='confirmPassword' value={confirmPassword} onChange={this.handleChange}
                    label='Confirm Password' required
                    ></FormInput>
                    <CustomButton type='submit'>Sign Up</CustomButton>
                </form>
            </SignUpContainer>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    signUpStart: userCredentials => dispatch(signUpStart(userCredentials))
})

export default connect(null, mapDispatchToProps)(SignUp);