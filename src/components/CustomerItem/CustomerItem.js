import classNames from 'classnames/bind';
import styles from './CustomerItem.module.scss';
import ProductCate from '../ProductCateHeader';
import ProductItem from '../ProductItem';
import data from '~/data/data.json';

const cx = classNames.bind(styles);

function CustomerItem(props) {
    const { product, title, cate, randomStart, randomEnd } = props;

    return (
        <div className={cx('wrapper')}>
            <ProductCate headerTitle={title} headerCate={cate} />
            <div className={cx('product-item')}>
                {data.slice(randomStart, randomEnd).map((item, index) => (
                    <ProductItem data={item} key={index} />
                ))}
            </div>
        </div>
    );
}

export default CustomerItem;
