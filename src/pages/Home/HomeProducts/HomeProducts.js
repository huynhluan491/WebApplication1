import { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './HomeProducts.module.scss';
import ProductItem from '~/components/ProductItem';
import ProductCate from '~/components/ProductCateHeader';
import Button from '~/components/Button';
import { Link } from 'react-router-dom';
import config from '~/config';

const cx = classNames.bind(styles);

function HomeProducts(props) {
    const { productCate, headerTitle, headerCate } = props;
    const productData = productCate;
    const titleHeader = headerTitle;
    const cateHeader = headerCate;
    const [productLimit, setProductLimit] = useState(15);

    useEffect(() => {
        const mediaQuery = window.matchMedia('(max-width: 767px)');

        const handleMediaQueryChange = () => {
            if (mediaQuery.matches) {
                setProductLimit(6);
            } else {
                setProductLimit(15);
            }
        };

        handleMediaQueryChange();

        mediaQuery.addEventListener('change', handleMediaQueryChange);

        return () => mediaQuery.removeEventListener('change', handleMediaQueryChange);
    }, []);

    return (
        <div className={cx('wrapper')}>
            <ProductCate headerCate={cateHeader} headerTitle={titleHeader} />
            <div className={cx('products-container')}>
                {productData &&
                    productData
                        .slice(0, productLimit ? productLimit : productData.length)
                        .map((product, index) => <ProductItem key={index} data={product} />)}
            </div>
            <div className={cx('seeAll-btn')}>
                <Link to={config.routes.allproducts}>
                    <Button seeAll onClick={() => window.scrollTo(0, 0)}>
                        Xem tất cả
                    </Button>
                </Link>
            </div>
        </div>
    );
}

export default HomeProducts;
