import store from '@/store/index';
import router from '@/routes/index';
import {reissue} from '@/api/member';
import {showAlert} from '@/utils/alertUtils';
import {clearAllCookies, deleteIsLogin} from '@/utils/cookies';

const ERROR_CODES = {
  TOKEN_EXPIRED: 'I-AUT-0002',
  SESSION_EXPIRED: 'I-AUT-0006',
};

export function setInterceptors(instance) {
  instance.interceptors.request.use(addAuthHeader, Promise.reject);
  instance.interceptors.response.use(
    (response) => response,
    handleResponseError,
  );

  return instance;
}

async function addAuthHeader(request) {
  const token = store.getters['memberStore/getAccessToken'];
  if (!token) {
    const {data} = await reissue();
    store.commit('memberStore/SET_ACCESTOKEN', data.accessToken);
  }
  request.headers.Authorization = `${process.env.VUE_APP_API_TOKEN_PREFIX} ${store.getters['memberStore/getAccessToken']}`;

  return request;
}

async function handleResponseError(error) {
  const errorCode = error.response?.data?.code;

  switch (errorCode) {
    case ERROR_CODES.TOKEN_EXPIRED:
      return await handleTokenExpired(error);
    case ERROR_CODES.SESSION_EXPIRED:
      await handleSessionExpired();
      break;
  }

  return Promise.reject(error);
}

async function handleTokenExpired(error, instance) {
  const {data} = await reissue();
  store.commit('memberStore/SET_ACCESS_TOKEN', data.accessToken);
  error.config.headers.Authorization = `${process.env.VUE_APP_API_TOKEN_PREFIX} ${data.accessToken}`;
  return instance(error.config);
}

async function handleSessionExpired() {
  showAlert('세션이 만료되었습니다.', 'warning', 1500);
  deleteIsLogin();
  clearAllCookies();
  await router.push('/');
}
