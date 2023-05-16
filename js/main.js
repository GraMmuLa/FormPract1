function createErrorLabel(text, inputParent) {
    if (inputParent.classList.contains("error"))
        return null;

    inputParent.classList.add("error");

    const errorLabel = document.createElement('label');
    errorLabel.textContent = text;
    errorLabel.classList.add(formClassName(inputParent.classList[0], "errorEmptyLabel"));
    errorLabel.setAttribute("for", inputParent.querySelector('input').id);

    errorLabel.style.color = "rgba(255, 0, 0, 0.671)";
    errorLabel.style.alignSelf = "flex-start";
    errorLabel.style.fontSize = "12px";

    inputParent.append(errorLabel);

    return errorLabel;
}

function removeEmptyErrorLabel(inputParent) {
    console.log("hello");
    inputParent.querySelector('.' + formClassName(inputParent.classList[0], "errorEmptyLabel")).remove();
    inputParent.classList.remove('error');
}

function formClassName(parentClassName, elementClassName) {
    return parentClassName.substring(0, parentClassName.lastIndexOf('_') + 1) + elementClassName;
}

function validate(form) {

    let result = true;

    let regLogin = new RegExp(/\w{6,}/);
    let regEmail = new RegExp(/\w+@[a-zA-Z]+\.[a-zA-Z]+/);
    let regPassword = new RegExp(/(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/);

    for (x of form.querySelectorAll('input')) {
        if (x.value === "") {
            createErrorLabel("поле не заполнено", x.parentNode);
            result = false;
        }
        else if (x.id === 'my-form__login' && !regLogin.test(x.value)) {
            createErrorLabel("некорректный логин", x.parentNode);
            result = false;
        }
        else if (x.id === 'my-form__email' && !regEmail.test(x.value)) {
            createErrorLabel("некорректный e-mail", x.parentNode);
            result = false;
        }
        else if (x.id === 'my-form__password' && !regPassword.test(x.value)) {
            createErrorLabel("некорректный пароль", x.parentNode);
            result = false;
        }
    }

    return result;
}

document.querySelector('.my-form').addEventListener("submit", (e) => {
    if (!validate(e.target))
        e.preventDefault();
});

document.querySelector('.my-form').addEventListener("click", (e) => {
    if (e.target.tagName === 'INPUT' && e.target.parentNode.classList.contains('error')) {
        removeEmptyErrorLabel(e.target.parentNode);
    }
})
