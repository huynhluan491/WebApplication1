import { networkDevice } from '~/function';
import ProductByCate from '~/components/ProductByCate';

function NetworkDevice() {
    return (
        <div>
            <ProductByCate categoryFunction={networkDevice} titleCate="Thiết Bị Mạng" />
        </div>
    );
}

export default NetworkDevice;
