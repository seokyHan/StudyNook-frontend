<template>
  <div class="login-box">
    <div class="login-intro">
      <img src="@/images/snook_logo.png" />
    </div>
    <div class="login-button-group">
      <div class="kako-btn" @click="redirectToOAuth('kakao')">
        <img src="@/images/kakao.png" />
        <div>Kakao 로그인</div>
      </div>
      <div class="naver-btn" @click="redirectToOAuth('naver')">
        <img src="@/images/naver.png" />
        <div>Naver 로그인</div>
      </div>
      <div class="google-btn" @click="redirectToOAuth('google')">
        <img src="@/images/google.png" />
        <div>Google 로그인</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      baseUrl: process.env.VUE_APP_API_URL,
    };
  },
  methods: {
    redirectToOAuth(provider) {
      window.location.href = `${this.baseUrl}/oauth2/authorization/${provider}`;
    },
  },
};
</script>

<style lang="css" scoped>
@import './css/LoginPopup.css';
</style>
