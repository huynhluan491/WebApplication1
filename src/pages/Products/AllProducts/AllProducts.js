import classNames from 'classnames/bind';
import styles from './AllProducts.module.scss';
import data from '~/data/data.json';
import ProductByCate from '~/components/ProductByCate';

const cx = classNames.bind(styles);

function AllProducts() {
    return (
        <div>
            <ProductByCate categoryFunction={data} titleCate="Tất cả sản phẩm" />
        </div>
    );
}

export default AllProducts;
