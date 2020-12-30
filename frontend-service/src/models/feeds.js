import { query, destroy } from '../services/feeds'
export default {

    namespace: 'feeds',

    state: {},

    subscriptions: {
      setup({ dispatch, history }) {  // eslint-disable-line
      },
    },

    effects: {
      *fetch({ payload }, { call, put }) {  // eslint-disable-line
        const response = yield call(query);
        yield put({ type: 'list', payload: response.data });
        return response.data;
      },
      *storePath({ payload }, { call, put }) {  // eslint-disable-line
        yield put({ type: 'getPath', payload });
      },
      *delete({ payload }, { call, put }) {
        const res = yield call(destroy, payload);
      }
    },

    reducers: {
      list(state, action) {
        return {data:action.payload};
      },
      getPath(state, action) {
        return {datas:action.payload};
      },
    },

  };
