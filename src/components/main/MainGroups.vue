<template>
  <section class="groups">
    <LoginPopup v-if="isLoginModal" @close-modal="isLoginModal = false">
      <LoginPopupContent />
    </LoginPopup>
    <ul class="group-item">
      <a class="item-box">
        <li class="item">
          <div class="bookmark off">
            <img src="@/images/bookmark_star_off.png" />
          </div>
          <div class="bg-update">
            <span>✨ 2일전 업데이트</span>
          </div>
          <h2 class="group-intro">
            🐤오리와 강아지의 스터디 맴버를 모집합니다~!🐶
          </h2>
          <div class="group-name">by 오리대장</div>
          <div class="bg-group">
            <ul>
              <li>
                <span> 백엔드 </span>
              </li>
              <li>
                <span> 알고리즘 </span>
              </li>
            </ul>
          </div>
        </li>
      </a>
      <a class="item-box">
        <li class="item"></li>
      </a>
      <a class="item-box">
        <li class="item"></li>
      </a>
      <a class="item-box">
        <li class="item"></li>
      </a>
      <a class="item-box">
        <li class="item"></li>
      </a>
      <a class="item-box">
        <li class="item"></li>
      </a>
      <a class="item-box">
        <li class="item"></li>
      </a>
      <a class="item-box">
        <li class="item"></li>
      </a>
      <a class="item-box">
        <li class="item"></li>
      </a>
      <a class="item-box">
        <li class="item"></li>
      </a>
      <a class="item-box">
        <li class="item"></li>
      </a>
      <a class="item-box">
        <li class="item"></li>
      </a>
    </ul>
  </section>
</template>

<script>
// import LoginPopup from '@/views/PopupView.vue';
// import LoginPopupContent from '@/components/user/LoginPopupContent.vue';
// import { mapActions, mapGetters, mapMutations } from 'vuex';

// export default {
//   components: {
//     LoginPopup,
//     LoginPopupContent,
//   },
//   computed: {
//     ...mapGetters('memberStore', ['getNickname', 'getIsLogin']),
//   },
//   methods: {
//     ...mapMutations('memberStore', ['SET_ISLOGIN', 'SET_ACCESTOKEN']),
//     ...mapActions('memberStore', ['LOGOUT']),
//   },
// };
</script>

<style lang="css" scoped>
@import './css/mainGroups.css';
</style>
