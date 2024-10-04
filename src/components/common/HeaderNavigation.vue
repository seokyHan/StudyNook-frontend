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

      <SignupPopupContent v-if="isVisible" />

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
            <AMenu slot="overlay" style="padding: 0; border-radius: 3px">
              <AMenu-item
                key="1"
                style="
                  padding: 16px 25px;
                  border-bottom: 1px solid #e9e9e9;
                  border-radius: 3px 3px 0 0;
                "
              >
                <RouterLink
                  to="/account/edit"
                  style="
                    width: 200px;
                    font-size: 16px;
                    font-family: 'Noto Sans KR', 'sans-serif';
                  "
                >
                  내 정보
                </RouterLink>
              </AMenu-item>
              <AMenu-item
                key="2"
                style="padding: 16px 25px; border-bottom: 1px solid #e9e9e9"
              >
                <RouterLink
                  to="/account/inquiry-list"
                  style="
                    width: 200px;
                    font-size: 16px;
                    font-family: 'Noto Sans KR', 'sans-serif';
                  "
                >
                  1:1 문의 내역
                </RouterLink>
              </AMenu-item>
              <AMenu-item
                key="3"
                style="
                  padding: 16px 10px;
                  border: none;
                  border-radius: 0 0 3px 3px;
                "
              >
                <AButton
                  @click="showConfirm"
                  style="
                    width: 200px;
                    border: none;
                    background-color: transparent;
                    font-size: 16px;
                    text-align: left;
                    cursor: pointer;
                    font-family: 'Noto Sans KR', 'sans-serif';
                  "
                >
                  로그아웃
                </AButton>
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
import SignupPopupContent from '@/components/user/SignupPopupContent.vue';
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
    SignupPopupContent,
  },
  data() {
    return {
      buttonText: '로그인',
      isLoginModal: false,
      isVisible: true,
      menuItems: ['menu1', 'menu2', 'menu3', 'menu4'],
    };
  },
  created() {
    this.handleSocialLogin();
  },
  computed: {
    ...mapGetters('memberStore', ['getNickname', 'getIsLogin']),
    formattedButtonText() {
      return (
        '<div><span>' +
        this.buttonText.trim().split('').join('</span><span>') +
        '</span></div>'
      );
    },
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
    showConfirm() {
      this.$confirm({
        title: () => <h1 class="confirm-title">로그아웃 하시겠습니까?</h1>,
        okText: '확인',
        cancelText: '취소',
        onOk: this.userLogout,
      });
    },
    async userLogout() {
      this.LOGOUT();
      this.SET_ISLOGIN(false);
      await this.$router.push('/').catch(() => {});
    },
  },
};
</script>

<style lang="css" scoped>
@import './css/headerNavigation.css';
</style>
