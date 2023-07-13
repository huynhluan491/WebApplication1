import { smartClock } from '~/function';
import ProductByCate from '~/components/ProductByCate';

function SmartClock() {
    return (
        <div>
            <ProductByCate categoryFunction={smartClock} titleCate="Đồng Hồ" />
        </div>
    );
}

export default SmartClock;
