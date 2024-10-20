import styles from './CartItem.module.css';
import { useDispatch } from 'react-redux';
import { CartItemProps } from './CartItem.props';
import { AppDispatch } from '@/store/store';
import cn from 'classnames';
import { cartActions } from '@/store/cart.slice';


export function CartItem(props: CartItemProps) {

    const dispatch = useDispatch<AppDispatch>();

    const increase = () => {
        dispatch(cartActions.increase(props.id));
    };
    const decrease = () => {
        dispatch(cartActions.decrease(props.id));
    };
    const remove = () => {
        dispatch(cartActions.remove(props.id));
    };

    return (
        <>
            <div className={styles['carts']}>

                <div className={styles['carts-item']}>
                    <div className={styles['carts-left']}>
                        <div className={styles['carts-img']}>
                            <img src={props.image} alt="картинка товара" />
                        </div>
                        <div className={styles['carts-desc']}>
                            <h2 className={styles['carts-title']}>{props.name}</h2>
                            <p className={styles['carts-price']}>{props.price} ₽</p>
                        </div>
                    </div>

                    <div className={styles['carts-right']}>
                        <div className={styles['carts-counter']}>
                            <button className={cn(styles['btn'], styles['minus'])} onClick={decrease}> <svg width="11" height="2" viewBox="0 0 11 2" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <line x1="0.899529" y1="0.843689" x2="9.38082" y2="0.843689" stroke="#FE724C" strokeWidth="1.5" strokeLinecap="round" />
                            </svg>
                            </button>
                            <span className={styles['count']}>{props.count}</span>
                            <button className={cn(styles['btn'], styles['plus'])} onClick={increase}> <svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <line x1="6.15662" y1="0.899658" x2="6.15662" y2="9.38095" stroke="#FE724C" strokeWidth="1.5" strokeLinecap="round" />
                                <line x1="1.61951" y1="4.84375" x2="10.1008" y2="4.84375" stroke="#FE724C" strokeWidth="1.5" strokeLinecap="round" />
                            </svg>
                            </button>
                        </div>
                        <button className={styles['delete']} onClick={remove}> <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M4.19185 4.19318L12.5768 12.5782" stroke="#FF3600" strokeLinecap="round" />
                            <path d="M4.19342 12.5784L12.5784 4.19343" stroke="#FF3600" strokeLinecap="round" />
                        </svg></button>
                    </div>

                </div>


            </div >
        </>
    );

}