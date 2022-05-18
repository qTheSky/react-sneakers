import React, {ChangeEvent} from 'react';
import axios from 'axios'
import 'macro-css'
import {Header} from './components/Header';
import {Drawer} from './components/Drawer';
import {Routes, Route, Link} from 'react-router-dom';
import {Home} from './components/pages/Home';
import {Favorites} from './components/pages/Favorites';


export type itemType = {
		title: string
		price: number
		imageUrl: string
		id: string
}


export function App() {
		const [items, setItems] = React.useState<itemType[]>([])
		const [cartItems, setCartItems] = React.useState<itemType[]>([])
		const [favorites, setFavorites] = React.useState<itemType[]>([])
		const [searchValue, setSearchValue] = React.useState<string>('')
		const [cartOpened, setCartOpened] = React.useState<boolean>(false)

		React.useEffect(() => {
				axios.get('https://6284a4013060bbd3473c603f.mockapi.io/items').then(res => {
						setItems(res.data);
				})
				axios.get('https://6284a4013060bbd3473c603f.mockapi.io/cart').then(res => {
						setCartItems(res.data);
				})
				axios.get('https://6284a4013060bbd3473c603f.mockapi.io/favorites').then(res => {
						setFavorites(res.data);
				})
		}, []);

		const onAddToCart = (obj: itemType) => {
				console.log(obj)
				axios.post('https://6284a4013060bbd3473c603f.mockapi.io/cart', obj)
				setCartItems(prev => [...prev, obj])
		}

		const onRemoveItem = (id: string) => {
				axios.delete(`https://6284a4013060bbd3473c603f.mockapi.io/cart/${id}`)
				setCartItems((prev) => prev.filter(item => item.id !== id))
		}

		const onAddToFavorite = async (obj: itemType) => {
				console.log(obj)
				try {
						if (favorites.find(favObj => favObj.id === obj.id)) {
								axios.delete(`https://6284a4013060bbd3473c603f.mockapi.io/favorites/${obj.id}`)
						} else {
								const {data} = await axios.post('https://6284a4013060bbd3473c603f.mockapi.io/favorites', obj)
								setFavorites(prev => [...prev, data])
						}
				} catch (error) {
						alert('не удалосьdassad')
				}
		}

		const onChangeSearchInput = (e: ChangeEvent<HTMLInputElement>) => {
				setSearchValue(e.currentTarget.value)
		}
		return (
				<div className="wrapper clear">
						{cartOpened && <Drawer items={cartItems}
						                       onClose={() => setCartOpened(false)}
						                       onRemove={onRemoveItem}
						/>}


						<Header onClickCart={() => setCartOpened(true)}/>
						<Routes>

								<Route path={'/'}
								       element={<Home items={items}
								                      searchValue={searchValue}
								                      onChangeSearchInput={onChangeSearchInput}
								                      onAddToFavorite={onAddToFavorite}
								                      onAddToCart={onAddToCart}
								       />}/>
								<Route path={'/favorites'}
								       element={<Favorites items={favorites}
								                           onAddToFavorite={onAddToFavorite}
								       />}/>

						</Routes>

				</div>
		);
}
