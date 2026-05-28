import { useLocalStorage } from "./useLocalStorage";

const DEFAULT_PROFILE = {
  name: "",
  allergies: [],
  dislikes: [],
  diet: "omnivore",
};

export function useUserProfile() {
  return useLocalStorage("optimeal_profile", DEFAULT_PROFILE);
}
