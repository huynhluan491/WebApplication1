import { favorite } from '~/function';
import HomeProducts from './HomeProducts/HomeProducts';

function FavoriteShop() {
    return <HomeProducts productCate={favorite} headerTitle="Cửa hàng" headerCate="Favorite" />;
}

export default FavoriteShop;
