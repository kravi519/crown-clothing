import React from 'react';
import CartItem from '../cart-item/cart-item.component';
import { connect } from 'react-redux';
import { selectCartItems } from '../../redux/cart/cart.selectors';
import { createStructuredSelector } from 'reselect';
import { withRouter } from 'react-router-dom';
import { toggleCartHidden } from '../../redux/cart/cart.action';
import {CartDropDownContainer, CartItemsContainer, EmptyMessageContainer, CartDropDownButton} from '../cart-dropdown/cart-dropdown.style'

const CartDropDown = ({cartItems, history, dispatch}) => (
    <CartDropDownContainer>
        <CartItemsContainer>
            {
                cartItems.length ? (cartItems.map(cartItem => 
                <CartItem key={cartItem.id} {...cartItem}></CartItem>)) :
                (<EmptyMessageContainer>Your Cart is empty</EmptyMessageContainer>)
            }
        </CartItemsContainer>
        <CartDropDownButton onClick={() => 
        { history.push('/checkout');
        dispatch(toggleCartHidden())
        }}>GO TO CHECKOUT</CartDropDownButton>
    </CartDropDownContainer>
)

const mapStateToProps = createStructuredSelector({
    cartItems: selectCartItems
});

export default withRouter(connect(mapStateToProps)(CartDropDown));