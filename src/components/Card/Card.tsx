import React from 'react';
import styles from './Card.module.scss'


type CardPropsType = {
    title: string
    price: number
    imageUrl: string
}

const Card = (props: CardPropsType) => {
    const onClickButton = () =>{
        alert(props.title)
    }

    return (
        <div className={styles.card}>
            <div className={styles.favorite}>
                <img src="/img/heart-unliked.svg" alt="Unliked"/>
            </div>
            <img width={133} height={112} src={props.imageUrl} alt="Sneakers"/>
            <h5>{props.title}</h5>
            <div className="d-flex justify-between align-center">
                <div className="d-flex flex-column">
                    <span>Цена:</span>
                    <b>{props.price}руб.</b>
                </div>
                <button className="button" onClick={onClickButton}>
                    +
                </button>
            </div>
        </div>
    );
};


export default Card