<template>
  <div class="popup">
    <div class="popup-content">
      <div class="popup-header">
        <span
          class="material-icons back-button"
          @click="goBack"
          v-if="currentStep > 0"
        >
          arrow_back_ios
        </span>

        <span class="material-icons close-button" @click="$emit('close-modal')"
          >close</span
        >
      </div>
      <div class="step-indicator">
        <span :class="{active: currentStep === 0}">1</span>
        <div class="step_stepLine"></div>
        <span :class="{active: currentStep === 1}">2</span>
        <div class="step_stepLine"></div>
        <span :class="{active: currentStep === 2}">3</span>
        <div class="step_stepLine"></div>
        <span :class="{active: currentStep === 3}">4</span>
      </div>
      <h1 class="title" v-if="stepTitles.length > 0">
        {{ stepTitles[currentStep]['codeName'] }}
      </h1>

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
              <span>{{ this.getJob || '직무 선택' }}</span>
              <span class="arrow"></span>
            </div>
            <ul v-if="isJobDropdownOpen" class="dropdown-list">
              <li
                v-for="(job, index) in jobOptions"
                :key="index"
                @click="selectJob(job)"
              >
                {{ job.codeName }}
              </li>
            </ul>
          </div>

          <div class="dropdown" style="margin-left: 15px">
            <div
              class="dropdown-select"
              :class="selectedExperienceClass"
              @click="toggleDropdown('experience')"
            >
              <span>{{ this.getExperience || '경력 선택' }}</span>
              <span class="arrow"></span>
            </div>
            <ul v-if="isExperienceDropdownOpen" class="dropdown-list">
              <li
                v-for="(experience, index) in experienceOptions"
                :key="index"
                @click="selectExperience(experience)"
              >
                {{ experience.codeName }}
              </li>
            </ul>
          </div>
        </div>

        <!-- 소속 입력 영역 -->
        <div class="label-group">
          <label>소속을 입력해 주세요</label>
          <div class="public-private">
            <input
              type="radio"
              v-model="visibility"
              @click="setVisibility"
              value="공개"
            />
            <label> 공개 </label>
            <input
              type="radio"
              v-model="visibility"
              @click="setVisibility"
              value="비공개"
            />
            <label> 비공개 </label>
          </div>
        </div>
        <input
          class="inputText"
          v-model="affiliation"
          placeholder="소속 학교 또는 직장 입력"
          @input="setAffiliation"
        />
      </div>

      <!-- 현재 상태 입력 영역 -->
      <div class="form-group" v-else-if="currentStep === 1">
        <div class="options">
          <div
            v-for="(option, index) in stateOptions"
            :key="index"
            @click="selectState(option)"
            :class="{selected: selectedState.includes(option.id)}"
          >
            {{ option.codeName }}
          </div>
        </div>
      </div>

      <!-- Skill 입력 영역 -->
      <div class="form-group" v-else-if="currentStep === 2">
        <div class="categories">
          <div
            v-for="category in skillCategories"
            :key="category.name"
            :class="{selected: selectedCategory === category.name}"
            @click="selectCategory(category.name)"
          >
            <img :src="category.imageSrc" />
            <p>
              {{ category.name }}
            </p>
          </div>
        </div>

        <div class="skills" v-if="selectedCategory">
          <div class="skills-list">
            <div
              v-for="(skill, index) in getSkillsForSelectedCategory()"
              :key="index"
              @click="toggleSkill(skill)"
              :class="{selected: selectedSkillList.includes(skill.id)}"
            >
              {{ skill.codeName }}
            </div>
          </div>
        </div>
      </div>

      <!-- 닉네임 입력 영역 -->
      <div class="form-group" v-else-if="currentStep === 3">
        <input
          class="inputText"
          v-model="nickName"
          @input="setNickName"
          placeholder="닉네임 입력"
        />
      </div>

      <template v-if="currentStep === 3">
        <button class="next-button" @click="nextStep">프로필저장</button>
      </template>
      <template v-else>
        <button class="next-button" @click="nextStep">다음</button>
      </template>
    </div>
  </div>
</template>

<script>
import {showAlert} from '@/utils/alertUtils';
import {signUpOptions} from '@/api/member';
import {mapGetters, mapMutations} from 'vuex';
export default {
  data() {
    return {
      currentStep: 0,
      job: '',
      experience: '',
      isJobDropdownOpen: false,
      isExperienceDropdownOpen: false,
      selectedJobClass: 'default-select',
      selectedExperienceClass: 'default-select',
      affiliation: '',
      nickName: '',
      visibility: '',
      selectedState: [],
      selectedCategory: '',
      selectedSkillList: [],
      jobOptions: [],
      experienceOptions: [],
      skillCategories: [],
      stepTitles: [],
      stateOptions: [],
    };
  },
  created() {
    this.getSignUpOptions();
    this.getStateSignUpOptions();
  },
  computed: {
    ...mapGetters('memberStore', [
      'getJob',
      'getExperience',
      'getVisibility',
      'getAffiliation',
      'getCurrentStatus',
      'getCategory',
      'getSkills',
      'getNickname',
    ]),
  },
  methods: {
    ...mapMutations('memberStore', [
      'SET_JOB',
      'SET_EXPERIENCE',
      'SET_VISIBILITY',
      'SET_AFFILIATION',
      'SET_CURRENTSTATUS',
      'SET_CATEGORY',
      'SET_SKILLS',
      'SET_NICKNAME',
    ]),
    nextStep() {
      if (this.currentStep === 0 && this.job === '') {
        showAlert('직무를 선택해주세요.', 'warning', 1500);
        return;
      } else if (this.currentStep === 0 && this.experience === '') {
        showAlert('경력을 선택해주세요.', 'warning', 1500);
        return;
      }

      if (this.currentStep < this.stepTitles.length) {
        this.currentStep++;
      }
    },
    goBack() {
      if (this.currentStep > 0) {
        this.currentStep--;
      }
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
      this.job = value.id;
      this.SET_JOB(value.codeName);
      this.isJobDropdownOpen = false;
      this.selectedJobClass = 'selected-select';
    },
    selectExperience(value) {
      this.experience = value.id;
      this.SET_EXPERIENCE(value.codeName);
      this.isExperienceDropdownOpen = false;
      this.selectedExperienceClass = 'selected-select';
    },
    selectState(option) {
      const index = this.selectedState.indexOf(option.id);
      index !== -1
        ? this.selectedState.splice(index, 1)
        : this.selectedState.push(option.id);

      this.SET_CURRENTSTATUS(this.selectedState);
    },
    selectCategory(category) {
      this.selectedCategory = category;
      this.SET_CATEGORY(this.selectedCategory);
    },
    toggleSkill(skill) {
      const index = this.selectedSkillList.indexOf(skill.id);
      index !== -1
        ? this.selectedSkillList.splice(index, 1)
        : this.selectedSkillList.push(skill.id);

      this.SET_SKILLS(this.selectedSkillList);
    },
    getSkillsForSelectedCategory() {
      const category = this.skillCategories.find(
        (cat) => cat.name === this.selectedCategory,
      );
      return category ? category.skills : [];
    },
    setVisibility(e) {
      this.visibility = e.target.value;
      this.SET_VISIBILITY(this.visibility);
    },
    setAffiliation(e) {
      this.affiliation = e.target.value;
      this.SET_AFFILIATION(this.affiliation);
    },
    setNickName(e) {
      this.nickName = e.target.value;
      this.SET_NICKNAME(this.nickName);
    },
    async getSignUpOptions() {
      const {data} = await signUpOptions();

      this.jobOptions = [...data.jobOptions];
      this.experienceOptions = [...data.experienceOptions];
      this.skillCategories = [...data.skillCategories];
      this.stepTitles = [...data.stepTitles];
      this.stateOptions = [...data.stateOptions];
    },
    getStateSignUpOptions() {
      this.job = this.getJob;
      if (this.job !== '') {
        this.selectedJobClass = 'selected-select';
      }
      this.experience = this.getExperience;
      if (this.experience !== '') {
        this.selectedExperienceClass = 'selected-select';
      }
      this.visibility = this.getVisibility;
      if (this.visibility == '') {
        this.visibility = '비공개';
      }
      this.affiliation = this.getAffiliation;
      this.selectedState = this.getCurrentStatus;
      this.selectedCategory = this.getCategory;
      if (this.selectedCategory == '') {
        this.selectedCategory = '개발';
      }
      this.selectedSkillList = this.getSkills;
      this.nickName = this.getNickname;
    },
  },
};
</script>

<style lang="css" scoped>
@import './css/signupPopup.css';
</style>
