import classNames from 'classnames/bind';
import styles from './ProductCollection.module.scss';
import ProductCate from '~/components/ProductCateHeader';
import { imageCollection } from '~/data';
import { Gallery } from 'react-grid-gallery';
import { useState } from 'react';

const cx = classNames.bind(styles);

function ProductCollection() {
    const images = imageCollection.map((image) => ({
        ...image,
        customOverlay: (
            <div className="custom-overlay__caption">
                <div>{image.caption}</div>
                {image.tags &&
                    image.tags.map((t, index) => (
                        <div key={index} className="custom-overlay__tag">
                            {t.title}
                        </div>
                    ))}
            </div>
        ),
    }));

    return (
        <div className={cx('picture-layout')}>
            <ProductCate headerTitle="Bộ sưu tập" headerCate="Sản phẩm" />
            <Gallery images={images} />
        </div>
    );
}

export default ProductCollection;
