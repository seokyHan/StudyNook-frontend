import {instance, instanceWithAuth} from '@/api/index';

function reissue() {
  return instance.post('/members/reissue');
}

function memberLogOut() {
  return instanceWithAuth.post('/members/logout');
}

export {memberLogOut, reissue};
