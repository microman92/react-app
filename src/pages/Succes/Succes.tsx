import { useNavigate } from 'react-router-dom';
import styles from './Succes.module.css';
import Button from '@/components/Button/Button';

export function Succes() {
    const navigate = useNavigate();

    return (
        <div className={styles['succes']}>
            <img src="/react-app/img/pizza.png" alt="Изображение пиццы" className={styles['succes-img']} />
            <h2 className={styles['succes-title']}>Ваш заказ успешно оформлен!</h2>

            <Button appereance='big' onClick={() => navigate('/')}>Сделать новый заказ?</Button>
        </div>
    );

}

