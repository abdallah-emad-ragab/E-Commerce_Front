import HeaderCounter from '../HeaderCounter/HeaderCounter';
import { useAppSelector } from '../../../../store/hooks';
import CartLogo from '../../../../assets/svg/cart.svg?react';
import WishlistLogo from '../../../../assets/svg/wishlist.svg?react';
import { getCartTotalQuantity } from '../../../../store/cart/selectors';

export default function HeaderLeftSide() {
    const cartTotalQuantity = useAppSelector((state) => getCartTotalQuantity(state));
    const wishlistTotalQuantity = useAppSelector((state) => state.wishlist.itemsId.length);

    return (
        <div className="d-flex gap-2 align-items-center">
            <HeaderCounter
                logo={<WishlistLogo className="text-white bg-white p-1" style={{ width: '35px', height: '35px', borderRadius: '50%' }} />}
                navigateTo="/wishlist"
                totalQuantity={wishlistTotalQuantity}
            />
            <HeaderCounter
                logo={<CartLogo className="text-white bg-white p-1" style={{ width: '35px', height: '35px', borderRadius: '50%' }} />}
                navigateTo="/cart"
                totalQuantity={cartTotalQuantity}
            />
        </div>
    )
}