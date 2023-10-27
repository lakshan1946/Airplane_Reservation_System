function LoginValidation(values) {
  let error = {};
  const username_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const password_pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/;

  if (values.username === "") {
    error.username = "username should not be empty";
  } else if (username_pattern.test(values.username)) {
    error.username = "username didn't match";
  } else {
    error.username = "Invalid username";
  }

  if (values.password === "") {
    error.password = "Password should not be empty";
  } else if (password_pattern.test(values.password)) {
    error.password = "Password didn't match";
  } else {
    error.password = "Invalid Password";
  }

  return error;
}

export default LoginValidation;
