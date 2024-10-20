import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import styles from './Layout.module.css';
import Button from '../../components/Button/Button';
import cn from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '@/store/store';
import { getProfile, userActions } from '@/store/user.slice';
import { useEffect } from 'react';
import { RootState } from '@/store/store';


export function Layout() {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const profile = useSelector((s: RootState) => s.user.profile);
    const items = useSelector((s: RootState) => s.cart.items);

    useEffect(() => {
        dispatch(getProfile());
    }, [dispatch]);

    const logOut = () => {
        dispatch(userActions.logOut());
        navigate('/auth/login');
    };

    return <div className={styles['layout']}>

        <div className={styles['sidebar']}>
            <div className={styles['user']}>
                <div className={styles['user-img']}>
                    <img src="/react-app/img/avatar.jfif" alt="Картинка аватарки" />
                </div>


                <div className={styles['sidebar-info']}>
                    <h2 className={styles['sidebar-title']}>{profile?.name}</h2>
                    <p className={styles['sidebar-email']}>{profile?.email}</p>
                </div>

            </div>


            <div className={styles['menu']}>

                <NavLink to="/" className={({ isActive }) => cn(styles['link'], { [styles.active]: isActive })}> <img src="/react-app/img/menu.svg" alt="Иконка меню" /> <span>Меню</span> </NavLink>

                <NavLink to="/Cart" className={({ isActive }) => cn(styles['link'], { [styles.active]: isActive })}>
                    <img src="/react-app/img/cart-icon.svg" alt="Иконка корзины" /> <span>Корзина</span> <span className={styles['cart-count']}>{items.reduce((acc, item) => acc += item.count, 0)}</span>  </NavLink>

            </div>
            <Button className={styles['exit']} onClick={logOut}>
                <img src="/react-app/img/exit.svg" alt="Иконка выхода" />
                Выйти
            </Button>
        </div>
        <div className={styles['content']}>
            <Outlet />
        </div>

    </div>;
}