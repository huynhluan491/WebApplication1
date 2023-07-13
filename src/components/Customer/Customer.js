import CustomerItem from '../CustomerItem/CustomerItem';
import { useState } from 'react';

function Customer({ productDetail }) {
    const [randomStart, setRandomStart] = useState(5);
    const [randomEnd, setRandomEnd] = useState(50);

    return (
        <div>
            <CustomerItem
                product={productDetail}
                title="Cửa hàng"
                cate="Yêu thích"
                randomStart={randomStart}
                randomEnd={randomEnd}
            />
            <CustomerItem
                product={productDetail}
                title="Dành cho"
                cate="Bạn"
                randomStart={randomStart + 5}
                randomEnd={randomEnd + 10}
            />
        </div>
    );
}

export default Customer;
