import { useSignInForm } from "../utils/validation";

const SignIn = () => {
  const { form, updateFormField, submit, clearField } = useSignInForm();

  const handleSubmit = (event: Event): void => {
    event.preventDefault();
    submit(form);
  };

  return (
    <form onSubmit={handleSubmit} class="centered-children">
      <h1>Sign In</h1>
      <div class="field-block">
        <input
          type="text"
          name="username"
          placeholder="Username"
          required
          onChange={updateFormField("username")}
        />
      </div>
      <div class="field-block">
        <input
          type="password"
          name="password"
          placeholder="Password"
          required
          minlength="6"
          onChange={updateFormField("password")}
        />
      </div>

      <button type="submit">Sign In</button>
    </form>
  );
};

export default SignIn;
