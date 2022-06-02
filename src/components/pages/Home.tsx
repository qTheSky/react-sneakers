import React, {ChangeEvent} from 'react';
import {Card} from '../Card/Card';
import {itemType} from '../../App';


type Props = {
		items: itemType[]
		searchValue: string
		onChangeSearchInput: (e: ChangeEvent<HTMLInputElement>) => void
		onAddToFavorite: (obj: itemType) => void
		onAddToCart: (obj: itemType) => void
		isLoading: boolean
}

export const Home: React.FC<Props> = ({
		                                      items,
		                                      searchValue,
		                                      onChangeSearchInput,
		                                      onAddToFavorite,
		                                      onAddToCart,
		                                      isLoading
                                      }) => {

		const renderItems = () => {
				const filteredItems = items.filter(item => item.title.toLowerCase().includes(searchValue.toLowerCase()))
				return (isLoading ? [...Array(8)] : filteredItems).map((item, index) => (
						<Card
								key={item ? item.id : index}
								onFavorite={(obj) => onAddToFavorite(obj)}
								onPlus={(obj) => onAddToCart(obj)}
								{...item}
								loading={isLoading}
						/>
				))
		}

		return (
				<div className="content p-40">
						<div className={'d-flex align-center justify-between mb-40'}>
								<h1>Все кроссовки</h1>
								<div className={'search-block d-flex'}>
										<img src="img/search.svg" alt="Search"/>
										<input value={searchValue} onChange={onChangeSearchInput} placeholder={'Поиск...'}/>
								</div>
						</div>

						<div className="d-flex flex-wrap">{renderItems()}</div>
				</div>
		);
};