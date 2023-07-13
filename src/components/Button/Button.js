import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './Button.module.scss';
import { Link } from 'react-router-dom';
import { AddIcon } from '../Icons';

const cx = classNames.bind(styles);

function Button({
    to,
    href,
    whiteNoborder = false,
    whiteBorder = false,
    addToCart = false,
    disabled = false,
    seeMore = false,
    smallTango = false,
    mediumTango = false,
    seeAll = false,
    children,
    className,
    onClick,
    ...passProps
}) {
    let Comp = 'button';

    const props = {
        onClick,
        ...passProps,
    };

    if (to) {
        props.to = to;
        Comp = Link;
    } else if (href) {
        props.href = href;
        Comp = 'a';
    }

    const classes = cx('wrapper', {
        [className]: className,
        whiteNoborder,
        whiteBorder,
        addToCart,
        disabled,
        seeMore,
        smallTango,
        mediumTango,
        seeAll,
    });

    return (
        <Comp className={classes} {...props}>
            {addToCart ? <AddIcon /> : null}
            <span className={cx('title-btn')}>{children}</span>
        </Comp>
    );
}

Button.propTypes = {
    to: PropTypes.string,
    href: PropTypes.string,
    whiteNoborder: PropTypes.bool,
    whiteBorder: PropTypes.bool,
    addToCart: PropTypes.bool,
    disabled: PropTypes.bool,
    smallTango: PropTypes.bool,
    mediumTango: PropTypes.bool,
    seeAll: PropTypes.bool,
    children: PropTypes.node,
    onClick: PropTypes.func,
    className: PropTypes.string,
};

export default Button;
