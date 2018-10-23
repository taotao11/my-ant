import { routerRedux } from 'dva/router';
import { message } from 'antd';
import {query,section,text,jsoup} from '../services/book';

export default {
  namespace: 'book',

  state: {
    text: {},
    section: {},
    jsoup:[],
    bookData: [
      {
        "name": "永生的战法术师",
        "id": "00019bc3a457455e9ae024f828243795",
        "content": "在这个睡一觉都能重生都能穿越的年代被雷劈穿似乎不是什么稀奇的事情。穿越带着系统指引？刘璃好像没带……穿过来之后世界感觉很熟悉？这里刘璃听都没听说过……刘璃穿越时体内只带了一块雷霆碎片，和一项名为“不死”的天赋。刘璃：“好奇心害死猫……还有养猫的人……”",
        "readUrl": "https://www.bqg5200.com/xiaoshuo/14/14948/",
        "imgUrl": "https://www.bqg5200.com/files/article/image/14/14948/14948s.jpg",
        "dwUrl": null,
        "auth": "作者：夏渊湛",
        "status": 0,
        "newWorks": "第四百二十九章 木天蓼",
        "click": 2284,
        "createTime": "2018-08-31T14:22:03.000+0000",
        "type": "玄幻魔法"
      },
      {
        "name": "大梦追万古",
        "id": "000427c32bd24c80a191dd89031521d4",
        "content": "金山古佛，弥勒行世。 苦海浮沉，念破苍穹。 仙落凡尘，遍寻黄州。 少年独行，一眼万古。 寻前梦，今生道，求长生，痴如梦，回头已是万年身",
        "readUrl": "https://www.bqg5200.com/xiaoshuo/23/23858/",
        "imgUrl": "https://www.bqg5200.com/files/article/image/23/23858/23858s.jpg",
        "dwUrl": null,
        "auth": "作者：那斯骨骼精奇",
        "status": 0,
        "newWorks": "第十二章 初窥修行",
        "click": 87,
        "createTime": "2018-08-31T14:26:19.000+0000",
        "type": "玄幻魔法"
      },
    ],
  },

  effects: {
    // 查询书库
    *queryBooks({ payload }, { call, put }) {
      const response = yield call(query, payload.param);
      console.log(response)
      yield put({
        type: 'getBooks',
        payload: response,
      });
    },
    *section({ payload }, { call, put }) {
      const response = yield call(section, payload.param);
      console.log(response)
      yield put({
        type: 'getSection',
        payload: response,
      });
    },
    *text({ payload }, { call, put }) {
      const response = yield call(text, payload.param);
      console.log(response)
      yield put({
        type: 'getText',
        payload: response,
      });
    },
    *jsoup({ payload }, { call, put }) {
      console.log(1);
      const response = yield call(jsoup, payload.param);
      console.log(response)
      yield put({
        type: 'getJsoup',
        payload: response,
      });
    },
  },

  reducers: {
    getBooks(state, { payload }) {
      const bookData = payload.data;
      console.log(bookData);
      return {
        ...state,
        bookData: bookData,
      };
    },
    getSection(state, { payload }) {
      const bookData = payload.data;
      console.log(bookData);
      return {
        ...state,
        section: bookData,
      };
    },
    getText(state, { payload }) {
      const bookData = payload.data;
      console.log(bookData);
      return {
        ...state,
        text: bookData,
      };
    },
    getJsoup(state, { payload }) {
      const bookData = payload.data;
      console.log(bookData);
      return {
        ...state,
        jsoup: bookData,
      };
    },
  },
};
