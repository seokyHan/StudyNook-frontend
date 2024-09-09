import {instance, instanceWithAuth} from '@/api/index';

function reissue() {
  return instance.post('/users/reissue');
}

function userLogOut() {
  return instanceWithAuth.post('/users/logout');
}

export {userLogOut, reissue};
