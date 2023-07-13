import { keyboard } from '~/function';
import ProductByCate from '~/components/ProductByCate';

function Keyboard() {
    return (
        <div>
            <ProductByCate categoryFunction={keyboard} titleCate="Bàn Phím" />
        </div>
    );
}

export default Keyboard;
