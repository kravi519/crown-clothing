import React from 'react';
import {connect} from 'react-redux';
import { toggleCartHidden } from '../../redux/cart/cart.action';
import { selectCartItemsCount } from '../../redux/cart/cart.selectors';
import { createStructuredSelector } from 'reselect';
import { CartContainer, ShoppingIcon, ItemCountContainer } from './cart-icon.style';
const CartIcon = ({toggleCartHidden, itemsCount}) =>(
    <CartContainer onClick={() => toggleCartHidden()}>
        <ShoppingIcon />
        <ItemCountContainer>{itemsCount}</ItemCountContainer>
    </CartContainer>
)

const mapDispatchToProps = dispatch =>({
    toggleCartHidden: () => dispatch(toggleCartHidden())
})

const mapStateToProps = createStructuredSelector({
itemsCount: selectCartItemsCount
})

export default connect(
    mapStateToProps, 
    mapDispatchToProps
    )(CartIcon);