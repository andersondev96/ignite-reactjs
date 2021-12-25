import { ActionTypes, IProduct } from "./types";

export function addProductsToCartRequest(product: IProduct) {
    return {
        type: ActionTypes.addProductsToCartRequest,
        payload: {
            product,
        }
    };
}

export function addProductsToCartSuccess(product: IProduct) {
    return {
        type: ActionTypes.addProductsToCartSuccesss,
        payload: {
            product,
        }
    };
}

export function addProductsToCartFailure(productId: number) {
    return {
        type: ActionTypes.addProductsToCartFailure,
        payload: {
            productId,
        }
    };
}