import { computed, reactive } from "vue";
import { useField } from "@/use/field";

export function useForm(init = {}) {
  const form = reactive({});
  const validKey = "valid";
  for (const [key, value] of Object.entries(init)) {
    form[key] = useField(value);
  }
  const withoutValidKey = (k) => k !== validKey;

  form[validKey] = computed(() => {
    return Object.keys(form)
      .filter(withoutValidKey)
      .every((item) => form[item].isValid);
  });
  return form;
}
