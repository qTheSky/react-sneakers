import React from 'react';
import AppContext from '../context';


type PropsType = {
		title: string
		description: string
		image: string
}

export const Info: React.FC<PropsType> = ({image, title, description}) => {
		const {setCartOpened}: any = React.useContext(AppContext)

		return (
				<div className={'cartEmpty d-flex align-center justify-center flex-column flex'}>
						<img className={'mb-20'} width={120} src={image} alt="Empty"/>
						<h2>{title}</h2>
						<p className={'opacity-6'}>{description}</p>
						<button onClick={() => setCartOpened(false)} className={'greenButton'}>
								<img src="img/arrow.svg" alt="Arrow"/>
								Вернуться назад
						</button>
				</div>
		);
};
