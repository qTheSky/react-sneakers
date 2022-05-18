import React from 'react';
import 'macro-css'
import {Card} from './components/Card/Card'
import Header from './components/Header';
import {Drawer} from './components/Drawer';


export type itemsType = {
		title: string
		price: number
		imageUrl: string
}

function App() {
		let [items, setItems] = React.useState<itemsType[]>([])
		let [cartItems, setCartItems] = React.useState<itemsType[]>([])
		const [cartOpened, setCartOpened] = React.useState(false)

		React.useEffect(() => {
				fetch('https://6284a4013060bbd3473c603f.mockapi.io/items')
						.then((res) => {
								return res.json()
						})
						.then((json) => {
								setItems(json)
						})
		}, []);

		const onAddToCart = (obj: itemsType) => {
				setCartItems(prev => [...prev, obj])
		}


		return (
				<div className="wrapper clear">
						{cartOpened && <Drawer items={cartItems} onClose={() => setCartOpened(false)}/>}
						<Header onClickCart={() => setCartOpened(true)}/>

						<div className="content p-40">
								<div className={'d-flex align-center justify-between mb-40'}>
										<h1>Все кроссовки</h1>
										<div className={'search-block d-flex'}>
												<img src="/img/search.svg" alt="Search"/>
												<input placeholder={'Поиск...'}/>
										</div>
								</div>

								<div className="d-flex flex-wrap">
										{items.map(item => (
												<Card title={item.title}
												      price={item.price}
												      imageUrl={item.imageUrl}
												      onFavorite={() => console.log('Добавили в закладки')}
												      onPlus={(obj) => onAddToCart(obj)}
												/>
										))}
								</div>
						</div>
				</div>
		);
}

export default App;