import classNames from 'classnames/bind';
import styles from './Search.module.scss';
import data from '../../data/data.json';
import { useState } from 'react';
import { CloseIcon, SearchIcon } from '../Icons';
import Button from '../Button/Button';
import ProductItem from '../ProductItem/ProductItem';
import { useEffect } from 'react';
import images from '~/assets/images';
import { useDebounce } from '~/hooks';
import { useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-regular-svg-icons';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

const Search = ({ setSearchToggle }) => {
    const [productSearched, setProductSearched] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const [showLoading, setShowLoading] = useState(false);
    const debouncedValue = useDebounce(searchValue, 1000);
    const inputRef = useRef();

    useEffect(() => {
        if (!debouncedValue.trim()) {
            setProductSearched([]);
            return;
        }
        setShowLoading(true);

        setTimeout(() => {
            const result = data.filter((item) => item.name.toLowerCase().includes(debouncedValue.toLowerCase()));
            setProductSearched(result);
            setShowLoading(false);
        }, 1000);

        // const fetchingData = async () => {
        //     const data = await fetch('https://api.npoint.io/2212cc61db4c6711e3b2');
        //     const dataJson = await data.json();
        //     const result = await dataJson.filter((item) => item.name.toLowerCase().includes(debouncedValue));
        //     console.log(result);
        //     setProductSearched(result);
        //     setShowLoading(false);
        // };
    }, [debouncedValue]);

    const handleClearInput = () => {
        setSearchValue('');
        setProductSearched([]);
        inputRef.current.focus();
    };

    const handleInputChange = (e) => {
        const searchValue = e.target.value;
        const KEY_SPACE = /\s/g;

        if (!KEY_SPACE.test(searchValue[0])) {
            setSearchValue(searchValue);
        }
    };

    return (
        <div className={cx('search-container')}>
            <div className={cx('search-input-container')}>
                <div className={cx('logo')}>
                    <img src={images.logo} alt="logo" />
                </div>
                <div className={cx('search-input')}>
                    <input
                        type="text"
                        ref={inputRef}
                        value={searchValue}
                        placeholder="Nhập tên sản phẩm.."
                        onChange={handleInputChange}
                    />
                    {!!searchValue && !showLoading > 0 && (
                        <button className={cx('clear-icon')} onClick={handleClearInput}>
                            <FontAwesomeIcon icon={faCircleXmark} className={cx('icon')} />
                        </button>
                    )}
                    {showLoading && <FontAwesomeIcon className={cx('loading')} icon={faSpinner} />}
                    <Button whiteNoborder className={cx('search-icon')}>
                        <SearchIcon />
                    </Button>
                </div>
                <Button className={cx('close-icon')} whiteNoborder onClick={() => setSearchToggle(false)}>
                    <CloseIcon className={cx('icon')} />
                </Button>
            </div>
            <div className={cx('content-wrapper')}>
                <h1 className={cx('title')}>Được tìm kiếm nhiều nhất</h1>
                <div className={cx('products-wrapper')}>
                    {productSearched.map((item, index) => (
                        <div className={cx('product-item')} onClick={() => setSearchToggle(false)}>
                            <ProductItem key={index} data={item} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Search;
