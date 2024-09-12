<template>
  <div class="edit-container">
    <div class="edit-form">
      <div class="edit-form__item item--profile-image">
        <AAvatar :size="64" icon="user" />
      </div>
      <div class="edit-form__input">
        <label for="edit-form__nickname-input">닉네임</label>
        <div class="edit-form__input__main">
          <AInput
            type="text"
            id="edit-form__nickname-input"
            v-model="user.nickname"
          />
        </div>
      </div>
      <div class="edit-form__input">
        <label for="edit-form__email-input">직무</label>
        <AInput
          type="text"
          id="edit-form__email-input"
          v-model="user.userEmail"
        />
      </div>
      <div class="edit-form__input">
        <label for="edit-form__name-input">소속</label>
        <div class="edit-form__input__main">
          <AInput
            type="text"
            id="edit-form__name-input"
            v-model="user.userName"
          />
        </div>
      </div>
      <div class="edit-form__input">
        <label for="edit-form__name-input">경력</label>
        <div class="edit-form__input__main">
          <AInput
            type="text"
            id="edit-form__name-input"
            v-model="user.userName"
          />
        </div>
      </div>
      <div class="edit-form__input">
        <label for="edit-form__name-input">자기소개</label>
        <div class="edit-form__input__main">
          <AInput
            type="text"
            id="edit-form__name-input"
            v-model="user.userName"
          />
        </div>
      </div>
      <div class="edit-form__input">
        <label for="edit-form__name-input">관심분야</label>
        <div class="edit-form__input__main">
          <AInput
            type="text"
            id="edit-form__name-input"
            v-model="user.userName"
          />
        </div>
      </div>
      <div class="edit-form__btn">
        <button class="drop-btn" @click="dropAccount">회원 탈퇴</button>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex';
// import {clearAllCookies} from '@/utils/cookies';
import {showAlert} from '@/utils/alertUtils';

export default {
  data() {
    return {
      user: {
        userEmail: '',
        userName: '',
        nickname: '',
        profileImage: '',
      },
    };
  },
  computed: {
    ...mapGetters('memberStore', ['getIsLogin']),
  },
  created() {
    this.getUserData();
  },
  methods: {
    async getUserData() {
      if (!this.getIsLogin) {
        showAlert('로그인이 필요한 서비스 입니다.', 'warning', 1500);
        this.$router.push('/').catch(() => {});
      }
    },
  },
};
</script>

<style lang="css" scoped>
@import './css/accountEditForm.css';
</style>
