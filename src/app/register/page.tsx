export default function Register() {
  return (
    <div>
      <h1>Register</h1>
      <form>
        <input type="email" name="email" />
        <input type="password" name="password" />
        <input type="password" name="confirmPassword" />
        <button type="submit">Register</button>
      </form>
    </div>
  );
}
