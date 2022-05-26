import React from 'react';
import AppContext from '../context';
import {itemType} from '../App';

export const useCart = () => {
		const {cartItems, setCartItems}: any = React.useContext(AppContext)
		const totalPrice = cartItems.reduce((sum: number, obj: itemType) => obj.price + sum, 0)

		return {cartItems, setCartItems, totalPrice}
}