<template>
  <div class="inner">
    <a href="/" class="logo">
      <img src="@/images/snook_logo.png" alt="SNOOK" />
      <!-- <p>LOGO</p> -->
    </a>

    <!-- <div class="sub-menu">
          <ul class="menu">
            <li>
              <a href="/signin">Sign In</a>
            </li>
            <li>
              <a href="javascript:void(0)">My Starbucks</a>
            </li>
            <li>
              <a href="javascript:void(0)">Customer Service & Ideas</a>
            </li>
            <li>
              <a href="javascript:void(0)">Find a Store</a>
            </li>
          </ul>
          <div class="search">
            <input type="text" />
            <span class="material-icons">search</span>
          </div>
        </div> -->
    <div class="menu">
      <ul class="main-menu">
        <li class="item">
          <div class="item__name">menu1</div>
        </li>

        <li class="item">
          <div class="item__name">menu2</div>
        </li>
        <li class="item">
          <div class="item__name">menu3</div>
        </li>
        <li class="item">
          <div class="item__name">menu4</div>
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
import {showAlert} from '@/utils/alertUtils';
import {
  getIsSocialLoginFirst,
  getAcessTokenFromCookie,
  getSocialLogin,
  saveisLogin,
  deleteCookie,
} from '@/utils/cookies';
import {mapGetters} from 'vuex';

export default {
  components: {
    LoginPopup,
    LoginPopupContent,
  },
  data() {
    return {
      buttonText: '로그인',
      isLoginModal: false,
    };
  },
  created() {
    if (getIsSocialLoginFirst()) {
      showAlert('회원가입이 완료되었습니다.', 'success', 1500);
    }

    if (getSocialLogin() === 'success') {
      saveisLogin('socialLogin');
      deleteCookie('isFirst');
      deleteCookie('accessToken');
      deleteCookie('socialLogin');
      this.$store.commit(
        'memberStore/SET_ACCESTOKEN',
        getAcessTokenFromCookie(),
      );
      this.$router.go();
    }
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
    showConfirm() {
      const headerNavigation = this;
      this.$confirm({
        title: () => (
          <h1 style="font-size: 18px; font-weight: 200; font-family: 'Noto Sans KR', 'sans-serif'; color: #000;">
            로그아웃 하시겠습니까?
          </h1>
        ),
        okText: '확인',
        cancelText: '취소',
        onOk() {
          headerNavigation.userLogout();
        },
        onCancel() {},
        class: 'test',
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
