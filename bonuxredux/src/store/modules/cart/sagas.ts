import { AxiosResponse } from 'axios';
import { all, select, takeLatest, call, put } from 'redux-saga/effects';
import { IState } from '../..';
import api from '../../../services/api';
import { addProductsToCartFailure, addProductsToCartRequest, addProductsToCartSuccess } from './actions';
import { ActionTypes } from './types';

type checkProductStockRequest = ReturnType<typeof addProductsToCartRequest>;

interface IStockResponse {
    id: number;
    quantity: number;
}

function* checkProductStock({ payload }: checkProductStockRequest) {
    const { product } = payload;

    const currentQuantity: number = yield select((state: IState) => {
        return state.cart.items.find(item => item.product.id === product.id)?.quantity ?? 0;
    });

    const availableStockResponse: AxiosResponse<IStockResponse> = yield call(api.get, `stock/${product.id}`);

    if (availableStockResponse.data.quantity > currentQuantity) {
        yield put(addProductsToCartSuccess(product));
    } else {
        yield put(addProductsToCartFailure(product.id));
    }
}

export default all([
    takeLatest(ActionTypes.addProductsToCartRequest, checkProductStock)
]);