import { laptop } from '~/function';
import ProductByCate from '~/components/ProductByCate';

function Laptop() {
    return (
        <div>
            <ProductByCate categoryFunction={laptop} titleCate="Laptop" />
        </div>
    );
}

export default Laptop;
