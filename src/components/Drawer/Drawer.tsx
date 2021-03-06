import React from 'react';
import {itemType} from '../../App';
import {Info} from '../Info';
import axios from 'axios';
import {useCart} from '../../hooks/useCart';
import s from './Drawer.module.scss'

type PropsType = {
		onClose: () => void
		items: itemType[]
		onRemove: (id: string) => void
		opened: boolean
}

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export const Drawer: React.FC<PropsType> = ({onClose, items = [], onRemove, opened}) => {
		const {cartItems, setCartItems, totalPrice} = useCart()
		const [isOrderCompleted, setIsOrderCompleted] = React.useState<boolean>(false)
		const [orderId, setOrderId] = React.useState<null | number>(null)
		const [isLoading, setIsLoading] = React.useState<boolean>(false)

		const onClickOrder = async () => {
				try {
						setIsLoading(true)
						const {data} = await axios.post('https://6284a4013060bbd3473c603f.mockapi.io/orders', {
								items: cartItems
						})
						setOrderId(data.id)
						setIsOrderCompleted(true)
						setCartItems([])
						//костыль из-за mockapi
						for (let i = 0; i < cartItems.length; i++) {
								const item = cartItems[i]
								await axios.delete('https://6284a4013060bbd3473c603f.mockapi.io/cart/' + item.id)
								await delay(1000)
						}
						//костыль из-за mockapi
				} catch (error) {
						alert('Ошибка при создании заказа :(')
				}
				setIsLoading(false)
		};


		return (
				<div className={`pos-a ${s.overlay} ${opened ? s.overlayVisible : ''}`}>
						<div className={s.drawer}>
								<h2 className={'d-flex justify-between mb-30'}>Корзина
										<img onClick={onClose} className={'cu-p'} src="img/btn-remove.svg" alt="Close"/>
								</h2>

								{items.length > 0
										? <div className={'d-flex flex-column flex'}>
												<div className={s.items}>
														{items.map((obj) => (
																<div key={obj.id} className={s.cartItem}>
																		<div style={{backgroundImage: `url(${obj.imageUrl})`}}
																		     className={s.cartItemImg}></div>

																		<div className={'mr-20 flex'}>
																				<p className={'mb-5'}>{obj.title}</p>
																				<b>{obj.price} руб.</b>
																		</div>
																		<img
																				onClick={() => onRemove(obj.id)}
																				className={s.removeBtn}
																				src="img/btn-remove.svg"
																				alt="Remove"/>
																</div>
														))}
												</div>
												<div className={s.cartTotalBlock}>
														<ul>
																<li className={'d-flex'}>
																		<span>Итого:</span>
																		<div></div>
																		<b>{totalPrice} руб.</b>
																</li>
																<li className={'d-flex'}>
																		<span>Налог 5%:</span>
																		<div></div>
																		<b>{Math.ceil(totalPrice * 0.05)} руб</b>
																</li>
														</ul>
														<button disabled={isLoading} onClick={onClickOrder} className="greenButton">
																Оформить заказ <img src="img/arrow.svg" alt="Arrow"/>
														</button>
												</div>
										</div>
										:
										<Info title={isOrderCompleted ? 'Заказ оформлен' : 'Корзина пустая'}
										      description={isOrderCompleted ? `Ваш заказ #${orderId} скоро будет передан курьерской доставке` : 'Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ.'}
										      image={isOrderCompleted ? 'img/complete-order.jpg' : 'img/empty-cart.jpg'}
										/>
								}
						</div>
				</div>
		);
};