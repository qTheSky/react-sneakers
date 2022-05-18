import React from 'react';
import {Card} from '../Card/Card';
import {itemType} from '../../App';


type Props = {
		items: itemType[]
		searchValue: string
		onChangeSearchInput: any
		onAddToFavorite: any
		onAddToCart: any
}

export const Home: React.FC<Props> = ({
		                                      items,
		                                      searchValue,
		                                      onChangeSearchInput,
		                                      onAddToFavorite,
		                                      onAddToCart
                                      }) => {
		return (
				<div className="content p-40">
						<div className={'d-flex align-center justify-between mb-40'}>
								<h1>Все кроссовки</h1>
								<div className={'search-block d-flex'}>
										<img src="/img/search.svg" alt="Search"/>
										<input value={searchValue} onChange={onChangeSearchInput} placeholder={'Поиск...'}/>
								</div>
						</div>

						<div className="d-flex flex-wrap">
								{items
										.filter(item => item.title.toLowerCase().includes(searchValue.toLowerCase()))
										.map((item) => (
												<Card
														key={item.id}
														onFavorite={(obj) => onAddToFavorite(obj)}
														onPlus={(obj) => onAddToCart(obj)}
														{...item}
												/>
										))}
						</div>
				</div>
		);
};