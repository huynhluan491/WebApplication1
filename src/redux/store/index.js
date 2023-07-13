import { createStore, combineReducers } from 'redux';
import ProductReducer from '../reducer/ProductReducer';
import CartReducer from '../reducer/CartReducer';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
    key: 'root',
    storage, // place to save state (local storage)
    blacklist: 'ProductReducer', // không lưu state của ProductReducer vào local storage
};

const root = combineReducers({
    // gom tất cả reducer vào 1 const
    ProductReducer,
    CartReducer,
});

const persistedReducer = persistReducer(persistConfig, root);

const store = createStore(persistedReducer);
export const persistor = persistStore(store); //Một khi store đã được khởi tạo, truyền nó vào hàm persistStore để đảm bảo Redux state sẽ được lưu vào storage mỗi khi nó thay đổi.
export default store;
