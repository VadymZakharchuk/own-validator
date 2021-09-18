<template>
  <div class="auth-page">
    <!--    <pre>{{ authForm }}</pre>-->
    <h3 v-if="error">{{ error }}</h3>
    <form class="auth-page__form" @submit.prevent="submitForm">
      <div class="auth-page__form-control">
        <label for="email" class="auth-page__form-control__label">Email</label>
        <input
          type="text"
          id="email"
          class="auth-page__form-control__input"
          :class="{
            invalid: !authForm.email.isValid && authForm.email.touched,
          }"
          v-model="authForm.email.value"
          @blur="authForm.email.blur"
        />
        <small
          v-if="authForm.email.errors.required && authForm.email.touched"
          class="error-message"
        >
          EMail field can't be empty
        </small>
        <small
          v-else-if="authForm.email.errors.eMail && authForm.email.touched"
          class="error-message"
        >
          Please, enter correct EMail address
        </small>
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
            :class="{
              invalid: !authForm.password.isValid && authForm.password.touched,
            }"
            v-model="authForm.password.value"
            @blur="authForm.password.blur"
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
        <small
          v-if="authForm.password.errors.required && authForm.password.touched"
          class="error-message"
        >
          EMail field can't be empty
        </small>
        <small
          v-else-if="
            authForm.password.errors.minLength && authForm.password.touched
          "
          class="error-message"
        >
          Password should be min 6 characters length
        </small>
      </div>
      <button
        class="auth-page__submit"
        type="submit"
        :disabled="!authForm.valid"
      >
        Submit
      </button>
    </form>
    <Suspense v-if="isFormSent">
      <UsersList />
      <template #fallback>
        <div class="loader"></div>
      </template>
    </Suspense>
  </div>
</template>

<script>
import { ref, watch, onErrorCaptured } from "vue";
import { useForm } from "@/use/form";
import UsersList from "@/components/UsersList";

const required = (val) => !!val;
const minLength = (num) => (val) => val.length >= num;
const eMail = (email) => {
  const re =
    /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i;
  return re.test(String(email).toLowerCase());
};

export default {
  name: "Home",
  components: { UsersList },
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
    const isFormSent = ref(false);
    const error = ref()
    onErrorCaptured(e => {
      error.value = e.message
    })
    const submitForm = () => {
      console.log("EMail: ", authForm.email.value);
      console.log("Password: ", authForm.password.value);
      isFormSent.value = true;
    };
    watch(isPassVisible, () => {
      if (isPassVisible.value) {
        typeInput.value = "text";
      } else {
        typeInput.value = "password";
      }
    });
    return {
      authForm,
      submitForm,
      isPassVisible,
      typeInput,
      isFormSent,
      error,
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
        margin-bottom: 8px;
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
        top: 40%;
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
.error-message {
  align-self: flex-start;
  color: var(--errors);
}
button:disabled {
  color: var(--border);
  cursor: default;
}

.loader {
  font-size: 10px;
  margin: 50px auto;
  text-indent: -9999em;
  width: 11em;
  height: 11em;
  border-radius: 50%;
  background: #ffffff;
  background: -moz-linear-gradient(
    left,
    #ffffff 10%,
    rgba(255, 255, 255, 0) 42%
  );
  background: -webkit-linear-gradient(
    left,
    #ffffff 10%,
    rgba(255, 255, 255, 0) 42%
  );
  background: -o-linear-gradient(left, #ffffff 10%, rgba(255, 255, 255, 0) 42%);
  background: -ms-linear-gradient(
    left,
    #ffffff 10%,
    rgba(255, 255, 255, 0) 42%
  );
  background: linear-gradient(
    to right,
    #ffffff 10%,
    rgba(255, 255, 255, 0) 42%
  );
  position: relative;
  -webkit-animation: load3 1.4s infinite linear;
  animation: load3 1.4s infinite linear;
  -webkit-transform: translateZ(0);
  -ms-transform: translateZ(0);
  transform: translateZ(0);
}
.loader:before {
  width: 50%;
  height: 50%;
  background: #ffffff;
  border-radius: 100% 0 0 0;
  position: absolute;
  top: 0;
  left: 0;
  content: "";
}
.loader:after {
  background: #2c3e50;
  width: 75%;
  height: 75%;
  border-radius: 50%;
  content: "";
  margin: auto;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
}
@-webkit-keyframes load3 {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
@keyframes load3 {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
</style>
