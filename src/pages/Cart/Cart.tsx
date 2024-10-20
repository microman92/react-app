import { CartItem } from '@/components/CartItem/CartItem';
import Title from '@/components/Title/Title';
import { PREFIX } from '@/helpers/API';
import { Productinfo } from '@/interfaces/Products.interfaces';
import { AppDispatch, RootState } from '@/store/store';
import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './Cart.module.css';
import cn from 'classnames';
import Button from '@/components/Button/Button';
import { useNavigate } from 'react-router-dom';
import { cartSlice } from '@/store/cart.slice';

const DELIVERY_SUMM = 169;


export function Cart() {

    const [cartProduct, setCardProduct] = useState<Productinfo[]>([]);
    const items = useSelector((s: RootState) => s.cart.items);
    const jwt = useSelector((s: RootState) => s.user.jwt);
    const navigate = useNavigate();
    const total = items
        .map(i => {
            const product = cartProduct.find(p => p.id === i.id);
            if (!product) {
                return undefined;
            }
            return i.count * product.price;
        })
        .filter(value => value !== undefined)
        .reduce((acc, i) => acc + i, 0);
    const dispatch = useDispatch<AppDispatch>();

    const getItem = async (id: number) => {
        const { data } = await axios.get<Productinfo>(`${PREFIX}/products/${id}`);
        return data;
    };

    const loadAllItems = useCallback(async () => {
        const res = await Promise.all(items.map(i => getItem(i.id)));
        setCardProduct(res);
    }, [items]);

    const checkout = async () => {
        await axios.post(`${PREFIX}/order`, {
            products: items
        },
            {
                headers: {
                    Authorization: `Bearer ${jwt}`
                }
            }
        );
        navigate('/succes');
        clearCart();
    };

    const clearCart = () => {
        setCardProduct([]);
        dispatch(cartSlice.actions.clearCart());
    };


    useEffect(() => {
        loadAllItems();
    }, [items, loadAllItems]);

    return <>
        <div>

            <Title>Корзина</Title>
            <div className={styles['items']}>
                {items.map(i => {
                    const product = cartProduct.find(p => p.id === i.id);
                    if (!product) {
                        return;
                    }
                    return <CartItem key={product.id} count={i.count} {...product} />;
                })}
            </div>
            <div className={styles['order']}>
                <div className={cn(styles['summary-item'], styles['summa'])}>
                    <span>Итог</span>
                    <span>
                        {total}
                        <span className={styles['cash']}>₽</span>
                    </span>
                </div>
                <div className={cn(styles['delivery'], styles['summary-item'])}>
                    <span>Доставка</span>
                    <span>{DELIVERY_SUMM} <span className={styles['cash']}>₽</span></span>
                </div>
                <div className={cn(styles['total'], styles['summary-item'])}>
                    <span>Общая сумма: <span className={styles['cash']}>({items.length})</span></span>
                    <span>{total ? total + DELIVERY_SUMM : 0} <span className={styles['cash']}>₽</span></span>
                </div>
            </div>

        </div>

        <Button appereance='big' className={styles['buy']} onClick={checkout}> Оформить </Button>

    </>;
}