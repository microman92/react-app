import { forwardRef } from 'react';
import { SearchProps } from './Search.props';
import styles from './Search.module.css';
import cn from 'classnames';

const Search = forwardRef<HTMLInputElement, SearchProps>(
    function Input({ className, isValid = true, ...props }, ref) {

        return (
            <label className={styles['search-label']}>
                <input {...props} ref={ref} className={cn(className, styles['input'], {
                    [styles['invalid']]: isValid
                })} placeholder='Введите блюдо или состав' />
                <img className={styles['search-icon']} src="/react-app/img/search-icon.svg" alt="Иконка поиска" />
            </label>
        );
    });

export default Search;
