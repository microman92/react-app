import { MenuListProps } from './MenuList.props';
import ProductCard from '@/components/Product/ProductCard';


export function MenuList({ products }: MenuListProps) {

    return products.map(p => (
        <ProductCard
            key={p.id}
            id={p.id}
            title={p.name}
            rating={p.rating}
            price={p.price}
            desc={p.ingredients.join(', ')}
            img={p.image}
        />
    ));


}