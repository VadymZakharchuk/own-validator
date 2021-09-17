import { reactive } from "vue";

export function useForm(init = {}) {
  const form = reactive({});
  for (const [key, value] of Object.entries(init)) {
    console.log(key, value);
  }
  return form;
}
