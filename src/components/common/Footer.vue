<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <footer>
    <div class="inner">
      <ul class="menu">
        <li>
          <a href="javascript:void(0)" class="">개인정보처리방침</a>
        </li>
        <li>
          <a href="javascript:void(0)">영상정보처리기기 운영관리 방침</a>
        </li>
        <li><a href="javascript:void(0)">홈페이지 이용약관</a></li>
        <li><a href="javascript:void(0)">위치정보 이용약관</a></li>
        <li><a href="javascript:void(0)">이용약관</a></li>
        <li><a href="javascript:void(0)">윤리경영 핫라인</a></li>
      </ul>

      <div class="info">
        <span>사업자등록번호 2022-01-29</span>
        <span>❤️(주)스눅 돼장 김유신❤️</span>
        <span>TEL : 02) 3015-1100 / FAX : 02) 3015-1106</span>
        <span>강아지 : 한석희</span>
      </div>

      <p class="copyright">
        &copy; <span class="this-year"></span> Study Nook Company. All Rights
        Reserved.
      </p>
    </div>
    <!--TO TOP BUTTON-->
    <div id="to-top" @click="toTop">
      <div class="material-icons">arrow_upward</div>
    </div>
  </footer>
</template>

<script>
export default {
  data() {
    return {
      scrollTimer: 0,
      scrollY: 0,
    };
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll);
  },
  methods: {
    handleScroll() {
      if (this.scrollTimer) {
        return;
      }
      this.scrollTimer = setTimeout(() => {
        this.scrollY = window.scrollY;
        clearInterval(this.scrollTimer);
        this.scrollTimer = 0;
      }, 100);
    },
    toTop() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    },
  },
};
</script>

<style lang="css" scoped>
@import './css/footer.css';
</style>
