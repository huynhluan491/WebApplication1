import { phone } from '~/function';
import ProductByCate from '~/components/ProductByCate';

function Phone() {
    return (
        <div>
            <ProductByCate categoryFunction={phone} titleCate="Điện thoại" />
        </div>
    );
}

export default Phone;
