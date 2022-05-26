import React, {useState} from 'react';
import {Card} from '../Card/Card';
import {itemType} from '../../App';
import axios from 'axios';
import AppContext from '../../context';


type Props = {}

export const Orders: React.FC<Props> = () => {
		const {onAddToFavorite, onAddToCart}: any = React.useContext(AppContext)
		const [orders, setOrders] = useState<itemType[]>([])
		const [isLoading, setIsloading] = useState<boolean>(true)

		React.useEffect(() => {
				(async () => {
						try {
								const {data} = await axios.get('https://6284a4013060bbd3473c603f.mockapi.io/orders')
								setOrders(data.reduce((prev: itemType[], obj: any) => [...prev, ...obj.items], []))
								setIsloading(false)
						} catch (error) {
								alert('Ошибка при запросе заказов')
						}
				})()
		}, [])

		return (
				<div className="content p-40">
						<div className={'d-flex align-center justify-between mb-40'}>
								<h1>Мои заказы</h1>
						</div>

						<div className="d-flex flex-wrap">
								{(isLoading ? [...Array(8)] : orders).map((item: itemType, index: number) => (
										<Card key={item ? item.id : index}
										      {...item}
										      loading={isLoading}/>
								))}
						</div>
				</div>
		);
};