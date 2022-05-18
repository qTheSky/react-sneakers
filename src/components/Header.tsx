import React from 'react';
import {Routes, Route, Link} from 'react-router-dom';


type HeaderPropsType = {
		onClickCart: () => void
}

export const Header = (props: HeaderPropsType) => {
		return (
				<header className="d-flex justify-between align-center p-40">
						<Link to="/">
								<div className="d-flex align-center">
										<img width={40} height={40} src="/img/logo.png" alt="Logotype"/>
										<div>
												<h3 className="text-uppercase">React Sneakers</h3>
												<p className="opacity-5">Магазин лучших кроссовок</p>
										</div>
								</div>
						</Link>
						<div>
								<ul className="d-flex">
										<li className="mr-30 cu-p" onClick={props.onClickCart}>
												<img width={18} height={18} src="/img/cart.svg" alt="Корзина"/>
												<span>1205 руб.</span>
										</li>
										<li className={'cu-p mr-20'}>
												<Link to="/favorites"><img src="/img/heart.svg" alt="Закладки"/></Link>
										</li>
										<li>
												<img width={18} height={18} src="/img/user.svg" alt="Пользователь"/>
										</li>
								</ul>
						</div>
				</header>
		);
};
