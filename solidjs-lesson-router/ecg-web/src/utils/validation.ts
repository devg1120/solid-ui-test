import { createStore } from "solid-js/store";
import { useAuth } from "./AuthContext";

export type SignInFormFields = {
  username: string;
  email: string;
  password: string;
  passwordConfirm: string;
};

const submit = (form: SignInFormFields) => {
  const [actions] = useAuth();

  console.log(typeof actions, typeof actions.sign_in);
  actions.sign_in();

  console.log(`signin in`);
};

export const useSignInForm = () => {
  const [form, setForm] = createStore<SignInFormFields>({
    username: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });

  const clearField = (fieldName: string) => {
    setForm({
      [fieldName]: "",
    });
  };

  const updateFormField = (fieldName: string) => (event: Event) =>
    setForm({
      [fieldName]: (event.currentTarget as HTMLInputElement).value,
    });

  return { form, submit, updateFormField, clearField };
};
