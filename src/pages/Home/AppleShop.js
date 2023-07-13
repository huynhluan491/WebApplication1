import { appleBrandList } from '~/function';
import HomeProducts from './HomeProducts/HomeProducts';

function AppleShop() {
    return <HomeProducts productCate={appleBrandList} headerTitle="Cửa hàng" headerCate="Apple" />;
}

export default AppleShop;
