import React from 'react';
import {itemsType} from '../App';

type PropsType = {
		onClose: () => void
		items?: itemsType[]
}

export const Drawer: React.FC<PropsType> = ({onClose, items}) => {
		return (
				<div className="overlay">
						<div className="drawer">
								<h2 className={'d-flex justify-between mb-30'}>Корзина
										<img onClick={onClose} className={'cu-p'} src="/img/btn-remove.svg" alt="Close"/>
								</h2>

								<div className={'items'}>
										{
												items
														? items.map((obj) => (
																<div className="cartItem d-flex align-center mb-20">
																		<div style={{backgroundImage: `url(${obj.imageUrl})`}}
																		     className="cartItemImg"></div>

																		<div className={'mr-20 flex'}>
																				<p className={'mb-5'}>{obj.title}</p>
																				<b>{obj.price} руб.</b>
																		</div>
																		<img className={'removeBtn'} src="/img/btn-remove.svg" alt="Remove"/>
																</div>
														))
														: <span>вы что нищеброд? сделайте заказ</span>
										}
										{/*<div className="cartItem d-flex align-center mb-20">*/}
										{/*		<div style={{backgroundImage: 'url(/img/sneakers/1.jpg)'}} className="cartItemImg"></div>*/}

										{/*		<div className={'mr-20 flex'}>*/}
										{/*				<p className={'mb-5'}>Мужские Кроссовки Nike Air Max 270</p>*/}
										{/*				<b>12 999 руб.</b>*/}
										{/*		</div>*/}
										{/*		<img className={'removeBtn'} src="/img/btn-remove.svg" alt="Remove"/>*/}
										{/*</div>*/}


								</div>

								<div className="cartTotalBlock">
										<ul>
												<li className={'d-flex'}>
														<span>Итого:</span>
														<div></div>
														<b>21 498 руб.</b>
												</li>
												<li className={'d-flex'}>
														<span>Налог 5%:</span>
														<div></div>
														<b>1074руб</b>
												</li>
										</ul>
										<button className={'greenButton'}>
												Оформить заказ <img src="/img/arrow.svg" alt="Arrow"/>
										</button>
								</div>
						</div>
				</div>
		);
};