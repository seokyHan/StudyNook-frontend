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
    getJob(state) {
      return state.job;
    },
    getExperience(state) {
      return state.experience;
    },
    getVisibility(state) {
      return state.visibility;
    },
    getAffiliation(state) {
      return state.affiliation;
    },
    getCurrentStatus(state) {
      return state.currentStatus;
    },
    getCategory(state) {
      return state.category;
    },
    getSkills(state) {
      return state.skills;
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
    SET_ISLOGIN(state, isLogin) {
      state.isLogin = isLogin;
    },
    SET_JOB(state, job) {
      state.job = job;
    },
    SET_EXPERIENCE(state, experience) {
      state.experience = experience;
    },
    SET_VISIBILITY(state, visibility) {
      state.visibility = visibility;
    },
    SET_AFFILIATION(state, affiliation) {
      state.affiliation = affiliation;
    },
    SET_CURRENTSTATUS(state, currentStatus) {
      state.currentStatus = currentStatus;
    },
    SET_CATEGORY(state, category) {
      state.category = category;
    },
    SET_SKILLS(state, skills) {
      state.skills = skills;
    },
    SET_NICKNAME(state, nickname) {
      state.nickname = nickname;
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
