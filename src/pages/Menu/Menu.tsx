import Search from '@/components/Search/Search';
import Title from '@/components/Title/Title';
import styles from './Menu.module.css';
import { ChangeEvent, useEffect, useState } from 'react';
import { Productinfo } from '@/interfaces/Products.interfaces';
import axios, { AxiosError } from 'axios';
import { PREFIX } from '@/helpers/API';
import { MenuList } from '@/components/MenuList/MenuList';




export function Menu() {

    const [products, setProducts] = useState<Productinfo[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | undefined>();
    const [filter, setFilter] = useState<string>();




    useEffect(() => {
        getMenu(filter);
    }, [filter]);

    const getMenu = async (name?: string) => {
        try {

            setIsLoading(true);

            // await new Promise<void>((resolve) => {
            //     setTimeout(() => {
            //         resolve();
            //     }, 2000);
            // });

            const { data } = await axios.get<Productinfo[]>(`${PREFIX}/products`, {
                params: {
                    name
                }
            });
            setProducts(data);
            setIsLoading(false);

        } catch (error) {
            console.error(error);

            if (error instanceof AxiosError) {
                setError(error.message);
            }

            setIsLoading(true);
            return;
        }
    };

    const updateFilter = (e: ChangeEvent<HTMLInputElement>) => {
        setFilter(e.target.value);
    };


    return <>

        <div className={styles['content-top']}>
            <Title>Заголовок</Title>

            <Search className={styles['search']} onChange={updateFilter} />
        </div>

        <div className={styles['product-items']}>

            {error && <>{error}</>}
            {!isLoading && products.length > 0 && < MenuList products={products} />}

            {isLoading && <>Запрашивем продукты у поставщика  ....</>}

            {!isLoading && products.length == 0 && <>Упс... Такого к сожалению нет</>}

        </div>

    </>;
}


export default Menu;