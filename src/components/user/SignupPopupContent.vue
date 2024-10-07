<template>
  <div v-if="isVisible" class="popup">
    <div class="popup-content">
      <div>
        <div
          class="material-icons back-button"
          @click="goBack"
          v-if="currentStep > 0"
        >
          arrow_back_ios
        </div>

        <div class="material-icons">close</div>
      </div>
      <div class="step-indicator">
        <span :class="{active: currentStep === 0}">1</span> -
        <span :class="{active: currentStep === 1}">2</span> -
        <span :class="{active: currentStep === 2}">3</span> -
        <span :class="{active: currentStep === 3}">4</span>
      </div>
      <h3 class="title">{{ stepTitles[currentStep] }}</h3>

      <div class="form-group" v-if="currentStep === 0">
        <div class="label-group">
          <label>직무를 입력해 주세요 <span class="red_txt">*</span></label>
          <label style="margin-left: 15px"
            >경력을 입력해 주세요 <span class="red_txt">*</span></label
          >
        </div>
        <div class="label-group">
          <select v-model="job">
            <option disabled selected hidden>직무 선택</option>
            <option>개발</option>
            <option>디자인</option>
          </select>
          <select v-model="experience" style="margin-left: 15px">
            <option disabled selected hidden>경력 선택</option>
            <option>1년</option>
            <option>2년</option>
          </select>
        </div>
        <div class="label-group">
          <label>소속을 입력해 주세요</label>
          <div class="public-private">
            <input type="radio" v-model="visibility" value="공개" />
            <label class="public-private radio"> 공개 </label>
            <input type="radio" v-model="visibility" value="비공개" />
            <label class="public-private radio"> 비공개 </label>
          </div>
        </div>
        <input
          class="affiliation"
          v-model="affiliation"
          placeholder="소속 학교 또는 직장 입력"
        />
      </div>

      <div class="form-group" v-else-if="currentStep === 1">
        <p>현재 상태를 알려주세요:</p>
        <div class="options">
          <button
            v-for="option in stateOptions"
            :key="option"
            @click="selectState(option)"
          >
            {{ option }}
          </button>
        </div>
      </div>

      <div class="form-group" v-else-if="currentStep === 2">
        <p>관심이 있거나 보유하고 있는 스킬을 선택해 주세요:</p>
        <div class="options">
          <button
            v-for="skill in skills"
            :key="skill"
            @click="selectSkill(skill)"
          >
            {{ skill }}
          </button>
        </div>
      </div>

      <button class="next-button" @click="nextStep">다음</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isVisible: true,
      currentStep: 0,
      job: '직무 선택',
      experience: '경력 선택',
      affiliation: '',
      visibility: '공개',
      selectedState: '',
      selectedSkills: [],
      stepTitles: [
        '업무 분야와 경력에 맞춰 딱 맞는 정보를 추천해 드릴게요!',
        '현재 상태를 알려주세요',
        '관심이 있거나 보유하고 있는 스킬을 선택해 주세요',
      ],
      stateOptions: [
        '사이드 프로젝트 팀빌딩 중이에요',
        '사이드 프로젝트를 찾고 있어요',
      ],
      skills: ['JavaScript', 'TypeScript', 'React', 'Vue', 'Nodejs', 'Spring'],
    };
  },
  methods: {
    nextStep() {
      if (this.currentStep < this.stepTitles.length) {
        this.currentStep++;
      } else {
        this.isVisible = false;
      }
    },
    goBack() {
      if (this.currentStep > 0) {
        this.currentStep--;
      }
    },
    selectState(state) {
      this.selectedState = state;
    },
    selectSkill(skill) {
      this.selectedSkills.push(skill);
    },
  },
};
</script>

<style lang="css" scoped>
@import './css/signupPopup.css';
</style>
