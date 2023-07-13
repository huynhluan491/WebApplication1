import { tablet } from '~/function';
import ProductByCate from '~/components/ProductByCate';

function Tablet() {
    return (
        <div>
            <ProductByCate categoryFunction={tablet} titleCate="Tablet" />
        </div>
    );
}

export default Tablet;
