import {instance, instanceWithAuth} from '@/api/index';

function reissue() {
  return instance.post('/members/reissue');
}

function signUpOptions() {
  return instance.get('/options');
}

function memberLogOut() {
  return instanceWithAuth.post('/members/logout');
}

export {reissue, signUpOptions, memberLogOut};
