<template>
  <div class="inner">
    <a href="/" class="logo">
      <img src="@/images/snook_logo.png" alt="SNOOK" />
    </a>

    <div class="menu">
      <ul class="main-menu">
        <li class="item" v-for="(item, index) in menuItems" :key="index">
          <div class="item__name">{{ item }}</div>
        </li>
      </ul>

      <LoginPopup v-if="isLoginModal" @close-modal="isLoginModal = false">
        <LoginPopupContent />
      </LoginPopup>

      <template v-if="!getIsLogin">
        <div class="button-list">
          <button
            class="fast white"
            @click="isLoginModal = true"
            v-html="formattedButtonText"
          ></button>
        </div>
      </template>

      <template v-else>
        <div class="header__user">
          <ADropdown-button size="large">
            {{ getNickname }}
            <AMenu slot="overlay" class="user-menu">
              <AMenu-item
                v-for="(option, index) in userMenuOptions"
                :key="index"
                class="user-menu-item"
              >
                <RouterLink :to="option.link" class="user-menu-link">{{
                  option.label
                }}</RouterLink>
              </AMenu-item>
              <AMenu-item class="logout-item">
                <AButton @click="showConfirm" class="logout-button"
                  >로그아웃</AButton
                >
              </AMenu-item>
            </AMenu>
            <AIcon slot="icon" type="user" />
          </ADropdown-button>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import LoginPopup from '@/views/PopupView.vue';
import LoginPopupContent from '@/components/user/LoginPopupContent.vue';
import { showAlert } from '@/utils/alertUtils';
import {
  getIsSocialLoginFirst,
  getAcessTokenFromCookie,
  getSocialLogin,
  saveisLogin,
  deleteCookie,
} from '@/utils/cookies';
import { mapGetters } from 'vuex';

export default {
  components: {
    LoginPopup,
    LoginPopupContent,
  },
  data() {
    return {
      buttonText: '로그인',
      isLoginModal: false,
      menuItems: ['menu1', 'menu2', 'menu3', 'menu4'],
      userMenuOptions: [
        { label: '내 정보', link: '/account/edit' },
        { label: '1:1 문의 내역', link: '/account/inquiry-list' },
      ],
    };
  },
  created() {
    this.handleSocialLogin();
  },
  computed: {
    ...mapGetters('memberStore', ['getNickname', 'getIsLogin']),
    formattedButtonText() {
      return this.buttonText
        .split('')
        .map((char) => `<span>${char}</span>`)
        .join('');
    },
  },
  methods: {
    handleSocialLogin() {
      if (getIsSocialLoginFirst()) {
        showAlert('회원가입이 완료되었습니다.', 'success', 1500);
      }

      if (getSocialLogin() === 'success') {
        saveisLogin('socialLogin');
        const cookiesToDelete = ['isFirst', 'accessToken', 'socialLogin'];
        cookiesToDelete.forEach((cookie) => deleteCookie(cookie));
        this.$store.commit(
          'memberStore/SET_ACCESTOKEN',
          getAcessTokenFromCookie()
        );
        this.$router.go();
      }
    },
    showConfirm() {
      this.$confirm({
        title: () => <h1 class="confirm-title">로그아웃 하시겠습니까?</h1>,
        okText: '확인',
        cancelText: '취소',
        onOk: this.userLogout,
      });
    },
    userLogout() {
      this.$store.dispatch('memberStore/LOGOUT');
      this.$router.push('/').catch(() => {});
    },
  },
};
</script>

<style lang="css" scoped>
@import './css/headerNavigation.css';
</style>
