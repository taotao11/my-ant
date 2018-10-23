import { routerRedux } from 'dva/router';
import { message } from 'antd';
import {jsoup,addJsoup,addJsoupCon} from '../services/jsoup';

export default {
  namespace: 'jsoup',

  state: {
    jsoup:[],
    // 是否刷新
    record: false,
  },

  effects: {
    *jsoup({ payload }, { call, put }) {
      const response = yield call(jsoup, payload.param);
      console.log(response)
      yield put({
        type: 'getJsoup',
        payload: response,
        isSpin: false,
      });
    },
    *addJsoup({ payload }, { call, put }) {
      const response = yield call(addJsoup, payload.param);
      console.log(response)
      //  判断是否返回正确
      if(response.code == 200){
        message.success(response.message)
        yield put({
          type: 'record',
          payload: true,
        });
      }else{
        message.message(response.message)
      } 
    },
    *addJsoupCon({ payload }, { call, put }) {
      const response = yield call(addJsoupCon, payload.param);
      console.log(response)
      //  判断是否返回正确
      if(response.code == 200){
        message.success(response.message)
        yield put({
          type: 'record',
          payload: true,
        });
      }else{
        message.message(response.message)
      } 
    },
  },

  reducers: {
    getJsoup(state, { payload }) {
      const bookData = payload.data;
      console.log(bookData);
      return {
        ...state,
        jsoup: bookData,
        isSpin: false,
      };
    },
    //  开启关闭生命周期
    record(state,{ payload }){
      return {
        ...state,
        record: payload,
        isSpin: false,
      }
    },
    //  开启关闭刷新
    isSpin(state,{ payload }){
      return {
        ...state,
        isSpin: payload,
      }
    }
  },
  
};
