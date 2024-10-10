<template>
  <div v-if="isVisible" class="popup">
    <div class="popup-content">
      <div class="popup-header">
        <span
          class="material-icons back-button"
          @click="goBack"
          v-if="currentStep > 0"
        >
          arrow_back_ios
        </span>

        <span class="material-icons close-button" @click="closePopup"
          >close</span
        >
      </div>
      <div class="step-indicator">
        <span :class="{active: currentStep === 0}">1</span>
        <p>-</p>
        <span :class="{active: currentStep === 1}">2</span>
        <p>-</p>
        <span :class="{active: currentStep === 2}">3</span>
        <p>-</p>
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

        <!-- 직무, 경력 선택 영역 -->
        <div class="label-group">
          <div class="dropdown">
            <div
              class="dropdown-select"
              :class="selectedJobClass"
              @click="toggleDropdown('job')"
            >
              <span>{{ job || '직무 선택' }}</span>
              <span class="arrow"></span>
            </div>
            <ul v-if="isJobDropdownOpen" class="dropdown-list">
              <li @click="selectJob('개발')">개발</li>
              <li @click="selectJob('디자인')">디자인</li>
            </ul>
          </div>

          <div class="dropdown" style="margin-left: 15px">
            <div
              class="dropdown-select"
              :class="selectedExperienceClass"
              @click="toggleDropdown('experience')"
            >
              <span>{{ experience || '경력 선택' }}</span>
              <span class="arrow"></span>
            </div>
            <ul v-if="isExperienceDropdownOpen" class="dropdown-list">
              <li @click="selectExperience('1년')">1년</li>
              <li @click="selectExperience('2년')">2년</li>
            </ul>
          </div>
        </div>

        <!-- 소속 입력 영역 -->
        <div class="label-group">
          <label>소속을 입력해 주세요</label>
          <div class="public-private">
            <input type="radio" v-model="visibility" value="공개" />
            <label> 공개 </label>
            <input type="radio" v-model="visibility" value="비공개" />
            <label> 비공개 </label>
          </div>
        </div>
        <input
          class="affiliation"
          v-model="affiliation"
          placeholder="소속 학교 또는 직장 입력"
        />
      </div>

      <!-- 현재 상태 입력 영역 -->
      <div class="form-group" v-else-if="currentStep === 1">
        <div class="options">
          <div
            v-for="option in stateOptions"
            :key="option"
            @click="selectState(option)"
            :class="{selected: selectedState.includes(option)}"
          >
            {{ option }}
          </div>
        </div>
      </div>

      <div class="form-group" v-else-if="currentStep === 2">
        <p>관심이 있거나 보유하고 있는 스킬을 선택해 주세요:</p>
        <div class="options">
          <div v-for="skill in skills" :key="skill" @click="selectSkill(skill)">
            {{ skill }}
          </div>
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
      job: '',
      experience: '',
      isJobDropdownOpen: false,
      isExperienceDropdownOpen: false,
      selectedJobClass: 'default-select',
      selectedExperienceClass: 'default-select',
      affiliation: '',
      visibility: '공개',
      selectedState: [],
      selectedSkills: [],
      stepTitles: [
        '업무 분야와 경력에 맞춰 딱 맞는 정보를 추천해 드릴게요!',
        '현재 상태를 알려주세요',
        '관심이 있거나 보유하고 있는 스킬을 선택해 주세요',
      ],
      stateOptions: [
        '사이드 프로젝트 팀빌딩 중이에요',
        '사이드 프로젝트를 찾고 있어요',
        '스터디 그룹을 찾고 있어요',
        '스터디 팀원을 찾고 있어요',
        '창업을 준비중이이요',
        '초기 멤버를 찾고 있어요',
        '공모전에 참여할 팀원을 구해요',
        '참여할 공모전을 찾고 있어요',
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
    closePopup() {
      this.isVisible = false;
    },
    selectState(state) {
      if (this.selectedState.includes(state)) {
        this.selectedState.pop(state);
      } else {
        this.selectedState.push(state);
      }
    },
    selectSkill(skill) {
      this.selectedSkills.push(skill);
    },
    toggleDropdown(type) {
      if (type === 'job') {
        this.isJobDropdownOpen = !this.isJobDropdownOpen;
        this.isExperienceDropdownOpen = false;
      } else {
        this.isExperienceDropdownOpen = !this.isExperienceDropdownOpen;
        this.isJobDropdownOpen = false;
      }
    },
    selectJob(value) {
      this.job = value;
      this.isJobDropdownOpen = false;
      this.selectedJobClass = 'selected-select';
    },
    selectExperience(value) {
      this.experience = value;
      this.isExperienceDropdownOpen = false;
      this.selectedExperienceClass = 'selected-select';
    },
  },
};
</script>

<style lang="css" scoped>
@import './css/signupPopup.css';
</style>
