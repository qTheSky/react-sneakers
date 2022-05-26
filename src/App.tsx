import React, {ChangeEvent} from 'react';
import axios from 'axios'
import 'macro-css'
import {Header} from './components/Header';
import {Drawer} from './components/Drawer/Drawer';
import {Routes, Route} from 'react-router-dom';
import {Home} from './components/pages/Home';
import {Favorites} from './components/pages/Favorites';
import AppContext from './context';
import {Orders} from './components/pages/Orders';

export type itemType = {
		title: string
		price: number
		imageUrl: string
		id: string
		parentId?: string
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
						try {
								const [cartResponse, favoritesResponse, itemsResponse] = await Promise.all([
										axios.get('https://6284a4013060bbd3473c603f.mockapi.io/cart'),
										axios.get('https://6284a4013060bbd3473c603f.mockapi.io/favorites'),
										axios.get('https://6284a4013060bbd3473c603f.mockapi.io/items')
								]);

								setIsLoading(false)
								setCartItems(cartResponse.data)
								setFavorites(favoritesResponse.data)
								setItems(itemsResponse.data)
						} catch (error) {
								alert('Ошибка при запросе данных ;(')
						}
				}

				fetchData()
		}, []);

		const onAddToCart = async (obj: itemType) => {
				try {
						const findItem = cartItems.find(item => item.parentId === obj.id)
						if (findItem) {
								setCartItems(prev => prev.filter(item => item.parentId !== obj.id))
								await axios.delete(`https://6284a4013060bbd3473c603f.mockapi.io/cart/${findItem.id}`)
						} else {
								setCartItems(prev => [...prev, obj])
								const {data} = await axios.post('https://6284a4013060bbd3473c603f.mockapi.io/cart', obj)
								setCartItems(prev => prev.map(item => {
										if (item.parentId === data.parentId) {
												return {
														...item,
														id: data.id
												}
										}
										return item
								}))
						}
				} catch (error) {
						alert('Ошибка при добавлении в корзину')
				}
		}

		const onRemoveItem = (id: string) => {
				try {
						setCartItems((prev) => prev.filter(item => item.id !== id))
						axios.delete(`https://6284a4013060bbd3473c603f.mockapi.io/cart/${id}`)
				} catch (error) {
						alert('Ошибка при удалении из корзины')
				}
		}

		const onAddToFavorite = async (obj: itemType) => {
				try {
						if (favorites.find(favObj => favObj.id === obj.id)) {
								axios.delete(`https://6284a4013060bbd3473c603f.mockapi.io/favorites/${obj.id}`)
								setFavorites(prev => prev.filter(item => item.id !== obj.id))
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
				return cartItems.some(obj => obj.parentId === id)
		}


		return (
				<AppContext.Provider
						value={{
								items,
								cartItems,
								favorites,
								isItemAdded,
								onAddToFavorite,
								onAddToCart,
								setCartOpened,
								setCartItems
						}}>
						<div className="wrapper clear">
								<Drawer items={cartItems}
								        onClose={() => setCartOpened(false)}
								        onRemove={onRemoveItem} opened={cartOpened}/>
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
										<Route path={'/orders'} element={<Orders/>}/>
								</Routes>
						</div>
				</AppContext.Provider>
		);
}