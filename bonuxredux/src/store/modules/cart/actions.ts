import { IProduct } from "./types";

export function addProductsToCartRequest(product: IProduct) {
    return {
        type: 'ADD_PRODUCT_TO_CART_REQUEST',
        payload: {
            product,
        }
    };
}

export function addProductsToCartSuccess(product: IProduct) {
    return {
        type: 'ADD_PRODUCT_TO_CART_SUCCESS',
        payload: {
            product,
        }
    };
}

export function addProductsToCartFailure(productId: number) {
    return {
        type: 'ADD_PRODUCT_TO_CART_FAILURE',
        payload: {
            productId,
        }
    };
}