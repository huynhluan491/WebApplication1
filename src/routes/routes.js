import config from '~/config';

//Layouts

import Home from '~/pages/Home';
import AllProducts from '~/pages/Products/AllProducts';
import Phone from '~/pages/Products/Phone';
import Laptop from '~/pages/Products/Laptop';
import Keyboard from '~/pages/Products/Keyboard';
import Tablet from '~/pages/Products/Tablet';
import NetworkDevice from '~/pages/Products/NetworkDevice';
import SmartClock from '~/pages/Products/SmartClock';
import Speaker from '~/pages/Products/Speaker';
import Login from '~/pages/Login';
import Register from '~/pages/Register/Register';
import Product from '~/pages/ProductDetail';
import ProductCart from '~/pages/ProductCart';

// Public routes

const publicRoutes = [
    { path: config.routes.home, component: Home },
    { path: config.routes.allproducts, component: AllProducts },
    { path: config.routes.phone, component: Phone },
    { path: config.routes.laptop, component: Laptop },
    { path: config.routes.keyboard, component: Keyboard },
    { path: config.routes.tablet, component: Tablet },
    { path: config.routes.networkdevice, component: NetworkDevice },
    { path: config.routes.smartclock, component: SmartClock },
    { path: config.routes.speaker, component: Speaker },
    { path: config.routes.product, component: Product },
    { path: config.routes.productcart, component: ProductCart, layout: null },
    { path: config.routes.login, component: Login, layout: null },
    { path: config.routes.register, component: Register, layout: null },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
