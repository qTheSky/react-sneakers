import React from 'react';
import {Card} from '../Card/Card';
import AppContext from '../../context';
import {itemType} from '../../App';


type Props = {}

export const Favorites: React.FC<Props> = () => {

		const {favorites, onAddToFavorite}: any = React.useContext(AppContext)


		return (
				<div className="content p-40">
						<div className={'d-flex align-center justify-between mb-40'}>
								<h1>Мои закладки</h1>
						</div>

						<div className="d-flex flex-wrap">
								{favorites.map((item: itemType, index: number) => (
										<Card key={index}
										      favorited={true}
										      onFavorite={onAddToFavorite}
										      {...item}
										/>
								))}
						</div>
				</div>
		);
};