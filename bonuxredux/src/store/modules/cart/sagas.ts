import { all, select, takeLatest } from 'redux-saga/effects';
import { IState } from '../..';
import { addProductsToCartRequest } from './actions';

type checkProductStockRequest = ReturnType<typeof addProductsToCartRequest>;

function* checkProductStock({ payload }: checkProductStockRequest) {
    const { product } = payload;

    const currentQuantity: number = yield select((state: IState) => {
        return state.cart.items.find(item => item.product.id === product.id)?.quantity ?? 0;
    })

    console.log(currentQuantity);

    console.log('Adicionou ao carrinho');
}

export default all([
    takeLatest('ADD_PRODUCT_TO_CART_REQUEST', checkProductStock)
]);