import React from 'react';
import PropTypes from 'prop-types';
import './GlobalStyles.scss';
import '~/responsive/MediaQuery.scss';

function GlobalStyles({ children }) {
    return React.Children.only(children); // chi cho ep truyen vao 1 children
}

GlobalStyles.propTypes = {
    children: PropTypes.node.isRequired,
};

export default GlobalStyles;
