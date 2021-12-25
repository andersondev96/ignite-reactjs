import { SagaIterator } from 'redux-saga';
import { all } from 'redux-saga/effects';

import cart from './cart/sagas';

export default function* rootSaga(): SagaIterator {
    return yield all([
        cart,
    ])
} 