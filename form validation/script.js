const form = document.getElementById("myForm");

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const name = document.getElementById("name");
  const email = document.getElementById("email");
  const phone = document.getElementById("phone");
  const password = document.getElementById("password");

  let isValid = true;

  clearErrors();

  if (name.value.trim() === "") {
    showError(name, "nameError");
    isValid = false;
  }

  if (!isValidEmail(email.value.trim())) {
    showError(email, "emailError");
    isValid = false;
  }

  if (phone.value.trim().length < 10 || isNaN(phone.value.trim())) {
    showError(phone, "phoneError");
    isValid = false;
  }

  if (password.value.trim().length < 6) {
    showError(password, "passwordError");
    isValid = false;
  }

  if (isValid) {
    const successSection = document.getElementById("successSection");

    successSection.style.display = "block";

    successSection.scrollIntoView({
      behavior: "smooth",
    });

    form.reset();
  }
});

function showError(input, errorId) {
  input.classList.add("input-error");
  document.getElementById(errorId).style.display = "block";
}

function clearErrors() {
  const inputs = document.querySelectorAll("input");
  const errors = document.querySelectorAll("small");

  inputs.forEach(function (input) {
    input.classList.remove("input-error");
  });

  errors.forEach(function (error) {
    error.style.display = "none";
  });
}

function isValidEmail(email) {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
}
