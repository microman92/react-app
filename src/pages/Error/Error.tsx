import { Link } from 'react-router-dom';
import styles from './Error.module.css';

export function Error() {
    return <div className={styles['error']}>
        <div className={styles['error-img']}>
            <img src="/react-app/img/Logo.svg" alt="логотип" />
        </div>
        <div className={styles['error-desc']}>
            <h2 className={styles['title']}>Похоже такой страницы у нас нет</h2>
            <Link className={styles['link']} to='/'>На главную</Link>
        </div>
    </div >;
}