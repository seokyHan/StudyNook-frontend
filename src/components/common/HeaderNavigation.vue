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
      <div class="button-list">
        <button class="fast white" v-html="formattedButtonText"></button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      buttonText: '로그인',
    };
  },
  computed: {
    formattedButtonText() {
      return (
        '<div><span>' +
        this.buttonText.trim().split('').join('</span><span>') +
        '</span></div>'
      );
    },
  },
};
</script>

<style lang="css" scoped>
@import './css/headerNavigation.css';
</style>
