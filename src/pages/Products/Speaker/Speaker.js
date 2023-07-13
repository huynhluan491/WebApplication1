import classNames from 'classnames/bind';
import styles from './Speaker.module.scss';
import ProductCate from '~/components/ProductCateHeader';
import ProductItem from '~/components/ProductItem';
import { ProductsGrid } from '~/components/Grid';
import { speaker } from '~/function';
import { Nodata } from '~/components/Icons';
const cx = classNames.bind(styles);

function Speaker() {
    const speakerProducts = speaker;
    return speakerProducts.length > 0 ? (
        <div className={cx('products-mid-layout')}>
            <ProductCate headerCate="Loa" />
            <ProductsGrid>
                {speakerProducts?.map((item, index) => (
                    <ProductItem data={item} key={index} />
                ))}
            </ProductsGrid>
        </div>
    ) : (
        <div className={cx('products-mid-layout')}>
            <ProductCate headerCate="Loa" />
            <div className={cx('container')}>
                <Nodata />
                <h1>Hiện tại của hàng chưa có sản phẩm nào cho danh mục này.</h1>
            </div>
        </div>
    );
}

export default Speaker;
