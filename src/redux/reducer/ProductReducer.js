import data from '~/data/data.json';

const initState = {
    products: data,
    product: {},
};

const ProductReducer = (state = initState, action) => {
    switch (action.type) {
        case 'PRODUCT':
            return {
                ...state,
                product: state.products.find((product) => product.name === action.nameproduct),
            };
        default:
            return state;
    }
};

export default ProductReducer;
