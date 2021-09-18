import { useFetch } from "@/use/fetch";
import { ref } from 'vue';

export async function useUsers() {
  const isLoaded = ref(false)
  const { response: users, request } = useFetch(
    "https://jsonplaceholder.typicode.com/users"
  );
  if (!isLoaded.value) {
    await request();
    isLoaded.value = true;
  }
  return { users };
}
