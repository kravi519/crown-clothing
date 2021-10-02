import React from 'react';

import { CartItemContainer, CartItemImage, ItemDetailsContainer, ItemDetailAttribute } from './cart-item.style';

const CartItem = ({name, price, imageUrl, quantity}) =>(
<CartItemContainer>
    <CartItemImage src={imageUrl} alt='item'/>
    <ItemDetailsContainer>
        <ItemDetailAttribute>{name}</ItemDetailAttribute>
        <ItemDetailAttribute>{quantity} x ${price}</ItemDetailAttribute>
    </ItemDetailsContainer>
</CartItemContainer>
)

export default (CartItem);                                                                        