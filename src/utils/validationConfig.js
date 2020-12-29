const config = (fields) => ({
  fields: {
    username: {
      // messages can be passed either as strings or objects thanks to validateField function
      isRequired: "Please fill out a username",
      initialValue: "My username",
    },
    password: {
      isRequired: { message: "Please fill out a password" },
      isMinLength: { value: 6, message: "Please make it more secure" },
      isNotEqual: {
        value: fields.username,
        message: `Your username and password can't both be '${fields.username}'`,
      },
    },
  },
  onSubmit: (context) => {
    if (context.isFormValid) {
      alert("form is valid, submit it!", context);
    } else {
      alert("The form still has errors!");
    }
  },
  showErrors: "always",
});

export default config;
