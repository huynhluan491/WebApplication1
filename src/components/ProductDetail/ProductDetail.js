import classNames from 'classnames/bind';
import React, { Suspense } from 'react';
import styles from './ProductDetail.module.scss';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import ProductSingleModal from '../ProductSingleModal';
import Customer from '../Customer';
const cx = classNames.bind(styles);

function ProductDetail() {
    const { nameproduct } = useParams(); // get nameproduct from url (/:nameproduct) by using useParam

    const dispatch = useDispatch();
    const { product } = useSelector((state) => state.ProductReducer); // get state của product được trả về từ ProductReducer

    useEffect(() => {
        dispatch({ type: 'PRODUCT', nameproduct }); // will return state of product thoa man dieu kien PRODUCT REDUCER
        // truyền tham số nameproduct để check tên ở ProductReducer để lấy được state của product
    }, [nameproduct]);

    useEffect(() => {});

    return (
        <Suspense>
            <div className={cx('container')}>
                <ProductSingleModal product={product} />
                <Customer productDetail={product} />
            </div>
        </Suspense>
    );
}

export default ProductDetail;
