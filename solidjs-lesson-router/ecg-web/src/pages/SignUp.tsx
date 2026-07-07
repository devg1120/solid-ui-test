import { useSignInForm } from "../utils/validation";

const SignUp = () => {
  const { form, updateFormField, submit } = useSignInForm();

  const handleSubmit = (event: Event): void => {
    event.preventDefault();
    submit(form);
  };

  return (
    <form onSubmit={handleSubmit} class="centered-children">
      <h1>Sign Up</h1>
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
          name="email"
          type="email"
          placeholder="Email"
          required
          onChange={updateFormField("email")}
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

      <button type="submit">Sign Up</button>
    </form>
  );
};

export default SignUp;
