function saveisLogin(value) {
  localStorage.setItem('isLogin', value);
}

function getIdFromCookie() {
  return document.cookie.replace(
    /(?:(?:^|.*;\s*)id\s*=\s*([^;]*).*$)|^.*$/,
    '$1',
  );
}

function getEmailFromCookie() {
  return document.cookie.replace(
    /(?:(?:^|.*;\s*)email\s*=\s*([^;]*).*$)|^.*$/,
    '$1',
  );
}

function getNicknameFromCookie() {
  return document.cookie.replace(
    /(?:(?:^|.*;\s*)nickName\s*=\s*([^;]*).*$)|^.*$/,
    '$1',
  );
}

function getIsSocialLoginFirst() {
  return document.cookie.replace(
    /(?:(?:^|.*;\s*)isFirst\s*=\s*([^;]*).*$)|^.*$/,
    '$1',
  );
}

function getSocialLogin() {
  return document.cookie.replace(
    /(?:(?:^|.*;\s*)socialLogin\s*=\s*([^;]*).*$)|^.*$/,
    '$1',
  );
}

function getIsLoginFromStorage() {
  return localStorage.getItem('isLogin');
}

function getAcessTokenFromCookie() {
  return document.cookie.replace(
    /(?:(?:^|.*;\s*)accessToken\s*=\s*([^;]*).*$)|^.*$/,
    '$1',
  );
}

function deleteIsLogin() {
  localStorage.removeItem('isLogin');
}

function deleteCookie(value) {
  document.cookie = `${value}=; expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/;`;
}

function clearAllCookies() {
  deleteCookie('id');
  deleteCookie('email');
  deleteCookie('nickName');
}

export {
  saveisLogin,
  getIdFromCookie,
  getEmailFromCookie,
  getNicknameFromCookie,
  getIsSocialLoginFirst,
  getSocialLogin,
  getIsLoginFromStorage,
  getAcessTokenFromCookie,
  deleteIsLogin,
  deleteCookie,
  clearAllCookies,
};
