<template>
  <section class="groups">
    <!-- <LoginPopup v-if="isLoginModal" @close-modal="isLoginModal = false">
      <LoginPopupContent />
    </LoginPopup> -->
    <ul class="group-item">
      <LoginPopup v-if="isLoginModal" @close-modal="isLoginModal = false">
        <LoginPopupContent />
      </LoginPopup>
      <a class="item-box">
        <li class="item">
          <template v-if="!getIsLogin">
            <div class="bookmark off" @click="isLoginModal = true">
              <img src="@/images/bookmark_star_off.png" />
            </div>
          </template>
          <template v-else>
            <div class="bookmark off">
              <img src="@/images/bookmark_star_off.png" />
            </div>
          </template>
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
import LoginPopup from '@/views/PopupView.vue';
import LoginPopupContent from '@/components/user/LoginPopupContent.vue';
import {showAlert} from '@/utils/alertUtils';
import {
  getIsSocialLoginFirst,
  getAcessTokenFromCookie,
  getSocialLogin,
  saveisLogin,
  deleteCookie,
} from '@/utils/cookies';
import {mapActions, mapGetters, mapMutations} from 'vuex';

export default {
  components: {
    LoginPopup,
    LoginPopupContent,
  },
  data() {
    return {
      isLoginModal: false,
      isVisible: false,
    };
  },
  created() {
    this.handleSocialLogin();
  },
  computed: {
    ...mapGetters('memberStore', ['getIsLogin']),
  },
  methods: {
    ...mapMutations('memberStore', ['SET_ISLOGIN', 'SET_ACCESTOKEN']),
    ...mapActions('memberStore', ['LOGOUT']),
    async handleSocialLogin() {
      if (getIsSocialLoginFirst()) {
        showAlert('가입이 완료되었습니다.', 'success', 1500);
      }

      if (getSocialLogin() === 'success') {
        saveisLogin('socialLogin');
        this.SET_ISLOGIN('memberStore/SET_ISLOGIN', true);
        this.SET_ACCESTOKEN(getAcessTokenFromCookie());

        const cookiesToDelete = ['isFirst', 'accessToken', 'socialLogin'];
        cookiesToDelete.forEach((cookie) => deleteCookie(cookie));

        await this.$router.push('/').catch(() => {});
      }
    },
  },
};
</script>

<style lang="css" scoped>
@import './css/mainGroups.css';
</style>
