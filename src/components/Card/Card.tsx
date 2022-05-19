import React from 'react';
import styles from './Card.module.scss'
import {itemType} from '../../App';
import ContentLoader from 'react-content-loader'
import AppContext from '../../context';


type PropsType = {
		title: string
		price: number
		imageUrl: string
		onPlus?: ({}: itemType) => void
		onFavorite?: ({}: itemType) => void
		favorited?: boolean
		id: string
		loading?: boolean
}
export const Card: React.FC<PropsType> = ({
		                                          id,
		                                          title,
		                                          price,
		                                          imageUrl,
		                                          onPlus,
		                                          onFavorite,
		                                          favorited = false,
		                                          loading = false,
                                          }) => {


		const {isItemAdded}: any = React.useContext(AppContext)
		const [isFavorite, setIsFavorite] = React.useState(favorited)

		console.log(title, isItemAdded(id))

		const onClickPlus = () => {
				onPlus?.({id, title, imageUrl, price})
		}

		const onClickFavorite = () => {
				onFavorite?.({id, title, imageUrl, price})
				setIsFavorite(!isFavorite)
		}

		return (
				<div className={styles.card}>
						{
								loading
										? <ContentLoader
												speed={2}
												width={165}
												height={250}
												viewBox="0 0 155 265"
												backgroundColor="#f3f3f3"
												foregroundColor="#ecebeb"
										>
												<rect x="0" y="0" rx="10" ry="10" width="155" height="155"/>
												<rect x="0" y="167" rx="5" ry="5" width="155" height="15"/>
												<rect x="0" y="187" rx="5" ry="5" width="100" height="15"/>
												<rect x="0" y="234" rx="5" ry="5" width="80" height="25"/>
												<rect x="124" y="230" rx="10" ry="10" width="32" height="32"/>
										</ContentLoader>
										: <>
												<div className={styles.favorite} onClick={onClickFavorite}>
														<img src={isFavorite ? '/img/heart-liked.svg' : '/img/heart-unliked.svg'}
														     alt="like"/>
												</div>
												<img width={'100%'} height={135} src={imageUrl} alt="Sneakers"/>
												<h5>{title}</h5>
												<div className="d-flex justify-between align-center">
														<div className="d-flex flex-column">
																<span>Цена:</span>
																<b>{price}руб.</b>
														</div>
														<img className={styles.plus} onClick={onClickPlus}
														     src={isItemAdded(id) ? '/img/btn-checked.svg' : '/img/btn-plus.svg'}
														     alt="Plus"/>
												</div>
										</>
						}
				</div>
		);
};