const cartReducer = (state = { products: [], totalPrice: 0, totalQuantities: 0 }, action) => {
    const { products, totalPrice, totalQuantities } = state; // declare variables based state object
    const { type, payload } = action; // declare variables passed from action

    switch (type) {
        case 'ADD_TO_CART': {
            const { product, quantity } = payload; // variables declaration
            const index = products.findIndex((p) => p.id === product.id);
            const updatedTotalPrice = totalPrice + product.price * quantity;
            const updatedTotalQuantities = totalQuantities + quantity;

            if (index !== -1) {
                products[index].quantity += quantity; // increase quantity by quantity passed from dispatch
                return { ...state, totalPrice: updatedTotalPrice, totalQuantities: updatedTotalQuantities };
            } else {
                product.quantity = quantity;
                return {
                    ...state,
                    products: [...products, product],
                    totalPrice: updatedTotalPrice,
                    totalQuantities: updatedTotalQuantities,
                };
            }
        }
        case 'INCREASE': {
            const findProduct = products.find((p) => p.id === payload);
            const index = products.findIndex((p) => p.id === payload);
            findProduct.quantity += 1;
            products[index] = findProduct;
            return { ...state, totalPrice: totalPrice + findProduct.price, totalQuantities: totalQuantities + 1 };
        }
        case 'DECREASE': {
            const findProduct = products.find((p) => p.id === payload);
            const index = products.findIndex((p) => p.id === payload);
            if (findProduct.quantity > 1) {
                findProduct.quantity -= 1;
                products[index] = findProduct;
                return { ...state, totalPrice: totalPrice + findProduct.price, totalQuantities: totalQuantities - 1 };
            } else {
                return state;
            }
        }
        case 'DELETE': {
            const findProduct = products.find((p) => p.id === payload);
            const filteredProducts = products.filter((p) => p.id !== payload);
            return {
                ...state,
                products: filteredProducts,
                totalPrice: totalPrice - findProduct.price * findProduct.quantity,
                totalQuantities: totalQuantities - findProduct.quantity,
            };
        }
        default:
            return state;
    }
};

export default cartReducer;
