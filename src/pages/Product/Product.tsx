// import { useParams } from 'react-router-dom';

import { Productinfo } from '@/interfaces/Products.interfaces';
import { Suspense } from 'react';
import { Await, Link, useLoaderData } from 'react-router-dom';
import styles from './Products.module.css';
import Title from '@/components/Title/Title';
import Button from '@/components/Button/Button';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/store/store';
import { cartActions } from '@/store/cart.slice';

export function Product() {

    // const { id } = useParams();

    const data = useLoaderData() as { data: Productinfo };
    const dispatch = useDispatch<AppDispatch>();

    const add = (id: number) => {
        dispatch(cartActions.increase(id));
    };




    return (
        <>
            <Suspense fallback={'Колдую ...'}>
                <Await resolve={data.data}>

                    {({ data }: { data: Productinfo }) => (
                        <div className={styles['details']}>
                            <div className={styles['details-top']}>
                                <div className={styles['details-left']}>
                                    <Link to='/' className={styles['details-back']}>
                                        <img src="/react-app/img/arrow-left.svg" alt="Иконка назад" />
                                    </Link>
                                    <Title className={styles['details-title']}>{data.name}</Title>
                                </div>
                                <Button appereance='small' className={styles['details-btn']} onClick={() => add(data.id)}>
                                    <svg width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M20.2526 11.0968C20.1738 10.4166 19.8484 9.7855 19.3345 9.3158C18.8206 8.84609 18.1515 8.56825 17.446 8.5316V8.33165C17.4466 7.76273 17.3312 7.19936 17.1063 6.67378C16.8815 6.1482 16.5517 5.6708 16.1359 5.26911C15.7209 4.86621 15.2278 4.54672 14.6851 4.32892C14.1423 4.11113 13.5605 3.99934 12.973 4C11.7871 4.00042 10.6499 4.45699 9.81135 5.2694C8.97278 6.08181 8.50151 7.1836 8.50107 8.33252V8.53469C7.80495 8.58262 7.14802 8.86536 6.6447 9.33371C6.14137 9.80206 5.82348 10.4265 5.74599 11.0984L5 17.682C5.00368 18.5648 5.3688 19.41 6.01524 20.0321C6.66168 20.6542 7.53674 21.0023 8.4479 21H17.5523C18.4635 21.0023 19.3383 20.6542 19.9848 20.0321C20.6312 19.41 20.9963 18.5648 21 17.682L20.2526 11.0968ZM9.81435 8.33959C9.81424 7.93776 9.89577 7.53984 10.0544 7.16856C10.2131 6.79729 10.4458 6.45997 10.739 6.1758C11.0323 5.89162 11.3803 5.66614 11.7635 5.51234C12.1467 5.35854 12.5574 5.27947 12.9722 5.27947C13.3871 5.27909 13.7979 5.35804 14.1812 5.51186C14.5644 5.66567 14.9127 5.89122 15.2058 6.1757C15.4996 6.45956 15.7325 6.79684 15.8914 7.16818C16.0503 7.53951 16.132 7.93761 16.1317 8.33959V8.52521H9.81435V8.33959ZM10.4374 12.8403C10.3332 12.8404 10.2299 12.8206 10.1336 12.782C10.0373 12.7434 9.94981 12.6868 9.87612 12.6154C9.80243 12.544 9.74404 12.4592 9.70421 12.3659C9.66438 12.2726 9.64394 12.1726 9.64405 12.0717C9.64394 11.9707 9.66438 11.8707 9.70421 11.7774C9.74404 11.6841 9.80243 11.5993 9.87612 11.5279C9.94981 11.4565 10.0373 11.3999 10.1336 11.3614C10.2299 11.3228 10.3332 11.303 10.4374 11.3031C10.5418 11.3029 10.6452 11.3225 10.7416 11.3611C10.8381 11.3996 10.9258 11.4561 10.9997 11.5275C11.0736 11.5989 11.1323 11.6837 11.1724 11.777C11.2125 11.8704 11.2331 11.9706 11.2332 12.0717C11.2331 12.1728 11.2125 12.2729 11.1724 12.3662C11.1323 12.4596 11.0736 12.5444 10.9997 12.6158C10.9258 12.6871 10.8381 12.7437 10.7416 12.7822C10.6452 12.8207 10.5418 12.8405 10.4374 12.8403ZM15.5644 12.8403C15.46 12.8405 15.3566 12.8207 15.2602 12.7822C15.1637 12.7437 15.076 12.6871 15.0021 12.6158C14.9282 12.5444 14.8695 12.4596 14.8294 12.3662C14.7893 12.2729 14.7687 12.1728 14.7686 12.0717C14.7687 11.9706 14.7893 11.8704 14.8294 11.777C14.8695 11.6837 14.9282 11.5989 15.0021 11.5275C15.076 11.4561 15.1637 11.3996 15.2602 11.3611C15.3566 11.3225 15.46 11.3029 15.5644 11.3031C15.6686 11.303 15.7717 11.3228 15.868 11.3614C15.9643 11.3999 16.052 11.4565 16.1257 11.5279C16.1994 11.5993 16.2578 11.6841 16.2976 11.7774C16.3374 11.8707 16.3579 11.9707 16.3578 12.0717C16.3579 12.1726 16.3374 12.2726 16.2976 12.3659C16.2578 12.4592 16.1994 12.544 16.1257 12.6154C16.052 12.6868 15.9643 12.7434 15.868 12.782C15.7717 12.8206 15.6686 12.8404 15.5644 12.8403Z" fill="#fff" />
                                        <circle cx="10.5" cy="12.5" r="1.5" fill="#fe724c" />
                                        <circle cx="15.5" cy="12.5" r="1.5" fill="#fe724c" />
                                    </svg>

                                    В корзину</Button>
                            </div>


                            <div className={styles['details-info']}>

                                <div className={styles['details-img']}>
                                    <img src={data.image} alt={data.name} />
                                </div>

                                <div className={styles['details-desc']}>

                                    <div className={styles['price']}>
                                        <span>Цена</span>
                                        <span className={styles['price-value']}>{data.price}<span className={styles['cash']}>₽</span></span>

                                    </div>

                                    <div className={styles['rating']}>
                                        <span>Рейтинг</span>
                                        <span className={styles['rating-value']}>{data.rating} <img src="/react-app/img/star.svg" alt="иконка звёзды" /></span>

                                    </div>


                                    <div className={styles['ingredients']}>
                                        <span className={styles['ingredients-span']}>Состав:</span>

                                        <ul>
                                            {data && data.ingredients.map((ingredient, index) => (
                                                <li key={index} className={styles['ingredients-item']}>{ingredient}</li>
                                            ))}
                                        </ul>

                                    </div>
                                </div>

                            </div>


                        </div>
                    )}



                </Await>
            </Suspense>
        </>
    );
}
