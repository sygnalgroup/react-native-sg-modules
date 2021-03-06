import { call, put, takeLatest } from 'redux-saga/effects';
import { toSnackCase } from '../utils/helpers';
import { getErrorMessage } from '../api/api-error';
import actions from './actions';
import Modules from '../../modules';

const sagas = [];

Object.keys(Modules).forEach((module) => {
  const moduleActions = Modules[module].actions;
  const { Types, Creators } = actions[module];

  Object.keys(moduleActions).forEach((action) => {
    function* sagasFunction({ params = {} }) {
      const { data, options } = params;
      if (moduleActions[action].sagas) {
        yield moduleActions[action].sagas(Creators, { params: data, options });
        return;
      }
      try {
        let resp = { data: null };
        if (moduleActions[action].api) {
          resp = yield call(moduleActions[action].api, data);
        } else {
          resp = params;
        }
        yield put(Creators[`${action}Success`](resp.data));

        if (options && options.onSuccess) {
          options.onSuccess(resp.data);
        }
      } catch (error) {
        if (options && options.onError) {
          options.onError(getErrorMessage(error));
        }
        yield put(Creators[`${action}Error`](getErrorMessage(error)));
      }
    }

    const actionName = toSnackCase(action);
    sagas.push(takeLatest(Types[`${actionName.toUpperCase()}_START`], sagasFunction));
  });
});

export default sagas;
