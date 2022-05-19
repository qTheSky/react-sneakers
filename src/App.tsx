import React, {ChangeEvent} from 'react';
import axios from 'axios'
import 'macro-css'
import {Header} from './components/Header';
import {Drawer} from './components/Drawer';
import {Routes, Route} from 'react-router-dom';
import {Home} from './components/pages/Home';
import {Favorites} from './components/pages/Favorites';
import AppContext from './context';

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
		const [isLoading, setIsLoading] = React.useState<boolean>(true)

		React.useEffect(() => {
				async function fetchData() {
						const cartResponse = await axios.get('https://6284a4013060bbd3473c603f.mockapi.io/cart')
						const favoritesResponse = await axios.get('https://6284a4013060bbd3473c603f.mockapi.io/favorites')
						const itemsResponse = await axios.get('https://6284a4013060bbd3473c603f.mockapi.io/items')

						setIsLoading(false)

						setCartItems(cartResponse.data)
						setFavorites(favoritesResponse.data)
						setItems(itemsResponse.data)
				}

				fetchData()
		}, []);

		const onAddToCart = (obj: itemType) => {
				if (cartItems.find(item => item.id === obj.id)) {
						axios.delete(`https://6284a4013060bbd3473c603f.mockapi.io/cart/${obj.id}`)
						setCartItems(prev => prev.filter(item => item.id !== obj.id))
				} else {
						axios.post('https://6284a4013060bbd3473c603f.mockapi.io/cart', obj)
						setCartItems(prev => [...prev, obj])
				}

		}

		const onRemoveItem = (id: string) => {
				axios.delete(`https://6284a4013060bbd3473c603f.mockapi.io/cart/${id}`)
				setCartItems((prev) => prev.filter(item => item.id !== id))
		}

		const onAddToFavorite = async (obj: itemType) => {
				try {
						if (favorites.find(favObj => favObj.id === obj.id)) {
								axios.delete(`https://6284a4013060bbd3473c603f.mockapi.io/favorites/${obj.id}`)
						} else {
								const {data} = await axios.post('https://6284a4013060bbd3473c603f.mockapi.io/favorites', obj)
								setFavorites(prev => [...prev, data])
						}
				} catch (error) {
						alert('Не удалось добавить в фавориты')
				}
		}

		const onChangeSearchInput = (e: ChangeEvent<HTMLInputElement>) => {
				setSearchValue(e.currentTarget.value)
		}

		const isItemAdded = (id: string) => {
				return cartItems.some(obj => obj.id === id)
		}


		return (
				<AppContext.Provider value={{items, cartItems, favorites, isItemAdded, onAddToFavorite}}>
						<div className="wrapper clear">
								{cartOpened && <Drawer items={cartItems}
								                       onClose={() => setCartOpened(false)}
								                       onRemove={onRemoveItem}
								/>}
								<Header onClickCart={() => setCartOpened(true)}/>
								<Routes>
										<Route path={'/'} element={
												<Home items={items}
												      searchValue={searchValue}
												      onChangeSearchInput={onChangeSearchInput}
												      onAddToFavorite={onAddToFavorite}
												      onAddToCart={onAddToCart}
												      isLoading={isLoading}
												/>}/>
										<Route path={'/favorites'} element={
												<Favorites/>}/>
								</Routes>
						</div>
				</AppContext.Provider>
		);
}