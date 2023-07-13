import PropTypes from 'prop-types'
import classNames from 'classnames/bind'
import styles from './container_layout.module.scss'

const cx = classNames.bind(styles)

function container_layout( { children } ) {
    return (  
        <div className={cx('wrapper')}>
            {children}
        </div>
    );
}

container_layout.propTypes = {
    children: PropTypes.node.isRequired,
}

export default container_layout;