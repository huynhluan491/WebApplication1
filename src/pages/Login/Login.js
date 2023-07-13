import classNames from 'classnames/bind';
import styles from './Login.module.scss';
import Button from '~/components/Button/Button';
import { CloseIcon } from '~/components/Icons';
import { Link } from 'react-router-dom';
import config from '~/config';

const cx = classNames.bind(styles);

function Login() {
    return (
        <div className={cx('container')}>
        </div>
    );
}

export default Login;
