import { reactive, ref, watch } from "vue";

export function useField(field) {
  const isValid = ref(true);
  const value = ref(field.value);
  const errors = reactive({});

  const reAssign = (val) => {
    // if no validators -> empty object {}. Else -> map by validators
    Object.keys(field.validators ?? {}).map((name) => {
      // validator[name] contains a function !!!!
      const valid = field.validators[name](val);
      errors[name] = !valid;
    });
  };
  reAssign(field.value);
  watch(value, reAssign);
  return { value, isValid, errors };
}
