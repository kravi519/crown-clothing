import React from 'react';
import FormInput from '../form-input/form-input.component';
import './sign-in.style.scss';
import CustomButton from '../custom-button/custom-button.component';
import  {signInWithGoogle} from '../../firebase/firebase.util';

class SignIn extends React.Component{
    constructor(){
        super();
        this.state = {
            email:'',
            password:''
        }
    }
    handleSubmit = event => {
        event.preventDefalut();
        this.setState({email: '', password: ''})
    }
    handleChange = event =>{
        const{value, name} = event.target;
        this.setState({[name]: value});
    }
    render(){
        return(
        <div className='sign-in'>
            <h2>I already have an account</h2>
            <span>Sign in with your email and password</span>
            <form onSubmit={this.handleSubmit}>
                <FormInput name='email' type='email' value={this.state.email} 
                handleChange={this.handleChange} label='Email' required/>                
                <FormInput name='password' type='password' value={this.state.password} 
                handleChange={this.handleChange} label='Password' required/>   
                <div className='buttons'>
                    <CustomButton type='submit'>Sign in</CustomButton>
                    <CustomButton onClick={signInWithGoogle} isGoogleSignin>{''}Sign in with google{''}</CustomButton>              
                </div>            
                
            </form>
        </div>
        )
    }
}

export default (SignIn);