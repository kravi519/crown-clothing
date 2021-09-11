import React from 'react';
import StripeCheckout from 'react-stripe-checkout';

const StripeCheckoutButton = ({price}) => {
const priceForStripe = price * 100;
const publishableKey = 'pk_test_51JYQp8SJe9FqrAY750l4P9RwIxGxeuAdFWBm3dgVN1jyeOgyWtTWunQ61eu2sYQhQ3txcoCL0Ldd6SNUzdJnuw4W00cowXkLlF';
const onToken = token =>{
    console.log(token);
    alert('Payment is successful');
}
return (
    <StripeCheckout 
    label='Pay now' 
    name= 'Crown Clothing' 
    billingAddress 
    shippingAddress 
    image=''
    description={`Your total is $${price}`} 
    amount={priceForStripe} 
    panelLabel='Pay Now'
    token={onToken}
    stripeKey={publishableKey}
    />
)
}

export default StripeCheckoutButton;