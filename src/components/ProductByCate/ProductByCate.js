import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './ProductByCate.module.scss';
import ProductCate from '~/components/ProductCateHeader';
import ProductItem from '~/components/ProductItem';
import { ProductsGrid } from '~/components/Grid';
import Button from '~/components/Button';
import { useEffect, useState } from 'react';

const cx = classNames.bind(styles);

const ProductByCate = (props) => {
    const { categoryFunction, titleCate } = props;
    const categoryProducts = categoryFunction;
    const [loadMore, setLoadMore] = useState(10);
    const [endLoad, setEndLoad] = useState(false);
    const cateproduct = categoryProducts.slice(0, loadMore);

    const handleSeeMore = () => {
        setLoadMore(loadMore + 10);
    };

    useEffect(() => {
        if (categoryProducts.length - loadMore <= 0) {
            setEndLoad(true);
        }
    }, [loadMore]);

    return (
        <div className={cx('products-mid-layout')}>
            <ProductCate headerCate={titleCate} />
            <ProductsGrid>
                {cateproduct?.map((item, index) => (
                    <ProductItem data={item} key={index} />
                ))}
            </ProductsGrid>

            {!endLoad && (
                <div className={cx('seemore-btn')}>
                    <Button seeAll onClick={handleSeeMore}>
                        Xem thêm {categoryProducts.length - loadMore} sản phẩm
                    </Button>
                </div>
            )}
        </div>
    );
};

export default ProductByCate;
