const selectors = {
  root: "[data-js-root]",
  newsletter: "[data-js-newsletter]",
  success: "[data-js-success]",
  form: "[data-js-newsletter-form]",
  error: "[data-js-newsletter-error]",
  inputEmail: "[data-js-newsletter-email]",
  successTitle: "[data-js-success-title]",
  successEmail: "[data-js-success-email]",
  dismissButton: "[data-success-dismiss]",
};

const stateClasses = {
  error: "newsletter-form__input--error",
};

const attributes = {
  invalid: "aria-invalid",
  tab: "tabindex",
};

const ERROR_MESSAGE = "Valid email required";

const rootElement = document.querySelector(selectors.root);
const newsletterElement = rootElement.querySelector(selectors.newsletter);
const successElement = rootElement.querySelector(selectors.success);
const formElement = newsletterElement.querySelector(selectors.form);
const errorElement = newsletterElement.querySelector(selectors.error);
const inputEmailElement = newsletterElement.querySelector(selectors.inputEmail);
const successTitleElement = successElement.querySelector(
  selectors.successTitle
);
const successEmailElement = successElement.querySelector(
  selectors.successEmail
);
const dismissButtonElement = successElement.querySelector(
  selectors.dismissButton
);

function isEmailValid() {
  return inputEmailElement.validity.valid;
}

function showError() {
  errorElement.textContent = ERROR_MESSAGE;

  inputEmailElement.classList.add(stateClasses.error);
  inputEmailElement.setAttribute(attributes.invalid, "true");
}

function clearError() {
  errorElement.textContent = "";

  inputEmailElement.classList.remove(stateClasses.error);
  inputEmailElement.removeAttribute(attributes.invalid);
}

function showSuccess(email) {
  successEmailElement.textContent = email;

  newsletterElement.hidden = true;
  successElement.hidden = false;

  successTitleElement.setAttribute(attributes.tab, "-1");
  successTitleElement.focus();
}

function showNewsletter() {
  successElement.hidden = true;
  newsletterElement.hidden = false;

  formElement.reset();
  clearError();
  inputEmailElement.focus();
}

formElement.addEventListener("submit", (event) => {
  event.preventDefault();

  clearError();
  if (!isEmailValid()) {
    showError();
    inputEmailElement.focus();
    return;
  }

  showSuccess(inputEmailElement.value.trim());
});

dismissButtonElement.addEventListener("click", () => {
  showNewsletter();
});

inputEmailElement.addEventListener("input", () => {
  if (inputEmailElement.classList.contains(stateClasses.error)) {
    clearError();
  }
});
