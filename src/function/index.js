import data from '~/data/data.json';
import { toast } from 'react-toastify';

export const appleBrandList = data.filter((item) => item.brand === 'apple');
export const favorite = data.filter((item) => (item.favorite = true));
export const gamingPhone = data.filter((item) => item.type === 'gaming');
export const laptop = data.filter((item) => item.category === 'laptop');
export const keyboard = data.filter((item) => item.category === 'keyboard');
export const phone = data.filter((item) => item.category === 'phone');
export const networkDevice = data.filter((item) => item.category === 'networkdevice');
export const smartClock = data.filter((item) => item.category === 'watch');
export const speaker = data.filter((item) => item.category === 'speaker');
export const tablet = data.filter((item) => item.category === 'tablet');

export const showToast = () => {
    toast.success('Thêm vào giỏ hàng thành công!', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000,
    });
};
