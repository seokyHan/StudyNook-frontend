import {
  getIdFromCookie,
  getEmailFromCookie,
  getIsLoginFromStorage,
  getIsSocialLoginFirst,
  deleteIsLogin,
  clearAllCookies,
} from '@/utils/cookies';
import {memberLogOut} from '@/api/member';

const memberStore = {
  namespaced: true,
  state: {
    accessToken: '',
    id: getIdFromCookie() || '',
    email: getEmailFromCookie() || '',
    isLogin: getIsLoginFromStorage() != null,
    isFirst: getIsSocialLoginFirst() || false,
    job: '',
    experience: '',
    visibility: '',
    affiliation: '',
    currentStatus: [],
    category: '',
    skills: [],
    nickname: '',
  },
  getters: {
    getIsLogin(state) {
      return state.isLogin;
    },
    getAccessToken(state) {
      return state.accessToken;
    },
    getId(state) {
      return state.id;
    },
    getEmail(state) {
      return decodeURI(state.email);
    },
    getNickname(state) {
      return decodeURI(state.nickname);
    },
    getIsFirst(state) {
      return state.isFirst;
    },
  },
  mutations: {
    SET_ACCESTOKEN(state, accessToken) {
      state.accessToken = accessToken;
    },
    SET_EMAIL(state, email) {
      state.email = email;
    },
    SET_ID(state, id) {
      state.id = id;
    },
    SET_NICKNAME(state, nickname) {
      state.nickname = nickname;
    },
    SET_ISLOGIN(state, isLogin) {
      state.isLogin = isLogin;
    },
    CLEAR_ALL(state) {
      state.accessToken = '';
      state.id = '';
      state.email = '';
      state.nickname = '';
      state.isLoginUser = null;
    },
  },
  actions: {
    async LOGOUT({commit}, data) {
      await memberLogOut(data);
      clearAllCookies();
      deleteIsLogin();
      commit('CLEAR_ALL');
    },
  },
};

export default memberStore;
