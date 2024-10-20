import styles from './Products.module.css';
import { ProductCardProps } from './ProductCard.props';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/store/store';
import { cartActions } from '@/store/cart.slice';
import { MouseEvent } from 'react';

function ProductCard(props: ProductCardProps) {

    const dispatch = useDispatch<AppDispatch>();

    const add = (e: MouseEvent) => {
        e.preventDefault();
        dispatch(cartActions.increase(props.id));
    };


    return (
        <Link to={`/product/${props.id}`}>
            <div className={styles['card']}>

                <div className={styles['card-top']}>
                    <div className={styles['card-img']}>
                        <img src={props.img} alt="Карточка товара" />
                    </div>
                    <div className={styles['card-price']}>
                        {props.price} <span>₽</span>
                    </div>
                    <button className={styles['add-to-card']} onClick={add}>
                        <img src="/react-app/img/add-cart.svg" alt="Иконка добавление товара" />
                    </button>

                    <div className={styles['rating']}>
                        {props.rating}
                        <img src="/react-app/img/star.svg" alt="Иконка звёздочки" />
                    </div>

                </div>

                <div className={styles['card-bottom']}>
                    <h2 className={styles['card-title']}>{props.title}</h2>
                    <p className={styles['card-desc']}>{props.desc}</p>

                </div>
            </div>
        </Link>
    );

}

export default ProductCard;