<template>
  <div class="auth-page">
    <pre>{{ authForm.email }}</pre>
    <pre>{{ authForm.password }}</pre>
    <form class="auth-page__form" @submit.prevent="submit">
      <div class="auth-page__form-control">
        <label for="email" class="auth-page__form-control__label">Email</label>
        <input
          type="text"
          id="email"
          class="auth-page__form-control__input"
          :class="{ invalid: !authForm.email.isValid }"
          v-model="authForm.email.value"
        />
      </div>
      <div class="auth-page__form-control">
        <label for="password" class="auth-page__form-control__label">
          Password
        </label>
        <p>
          <input
            :type="typeInput"
            id="password"
            class="auth-page__form-control__input"
            :class="{ invalid: !authForm.password.isValid }"
            v-model="authForm.password.value"
          />
          <img
            v-if="!isPassVisible"
            src="@/assets/hide-password.svg"
            alt=""
            @click="isPassVisible = !isPassVisible"
          />
          <img
            v-else
            src="@/assets/show-password.svg"
            alt=""
            @click="isPassVisible = !isPassVisible"
          />
        </p>
      </div>
      <button class="auth-page__submit" type="submit">Submit</button>
    </form>
  </div>
</template>

<script>
import { ref, watch } from "vue";
import { useForm } from "@/use/form";

const required = (val) => !!val;
const minLength = (num) => (val) => val.length >= num;
const eMail = (email) => {
  const re =
    /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i;
  return re.test(String(email).toLowerCase());
};

export default {
  name: "Home",
  components: {},
  setup() {
    const authForm = useForm({
      email: {
        value: "",
        validators: { required, eMail },
      },
      password: {
        value: "",
        validators: { required, minLength: minLength(6) },
      },
    });
    const isPassVisible = ref(false);
    const typeInput = ref("password");

    watch(isPassVisible, () => {
      if (isPassVisible.value) {
        typeInput.value = "text";
      } else {
        typeInput.value = "password";
      }
    });
    return {
      authForm,
      isPassVisible,
      typeInput,
    };
  },
};
</script>
<style lang="scss">
@import "../styles/mixins.module";

.auth-page {
  margin: 32px;
  @include flex-column(flex-start, center);
  color: var(--subtext);
  &__form {
    width: 500px;
    height: auto;
    padding: 48px;
    @include flex-column(center, center);
    background: var(--secondary-bg);
    border: 1px solid var(--main-bg);
    &-control {
      @include flex-column(flex-start, center);
      margin-bottom: 24px;
      width: 100%;
      &__label {
        align-self: flex-start;
        @include setFont(normal, normal, 14px, 16px, var(--placeholder));
        height: 24px;
      }
      &__input {
        width: 100%;
        background: var(--tertiary-bg);
        font-size: 16px;
        line-height: 18px;
        color: var(--subtext);
        height: 36px;
        margin-bottom: 24px;
        outline: none;
        border: 1px solid var(--border);
        border-radius: 4px;
        position: relative;
        text-indent: 12px;
      }
      p {
        margin: 0;
        width: 100%;
        position: relative;
        display: inline-block;
      }
      img {
        position: absolute;
        top: 35%;
        right: 8px;
        transform: translateY(-50%);
        cursor: pointer;
      }
    }
  }
  &__submit {
    width: 96px;
    height: 36px;
    outline: none;
    background: var(--tertiary-bg);
    color: var(--subtext);
    border: 1px solid var(--border);
    border-radius: 4px;
    cursor: pointer;
  }
}
.invalid {
  border: 1px solid var(--errors);
}
</style>
