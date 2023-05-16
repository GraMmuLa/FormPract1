function createEmptyErrorLabel(text, inputParent) {
    if (inputParent.classList.contains("error"))
        return null;

    inputParent.classList.add("error");
    const emptyLabel = document.createElement('label');
    emptyLabel.textContent = text;
    emptyLabel.classList.add(formClassName(inputParent.classList[0], "errorEmptyLabel"));

    emptyLabel.style.color = "rgba(255, 0, 0, 0.671)";
    emptyLabel.style.alignSelf = "flex-start";
    emptyLabel.style.fontSize = "12px";

    inputParent.append(emptyLabel);

    console.log(inputParent);

    return emptyLabel;
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

    let regLogin = new RegExp(/\w+/);
    let regPassword = new RegExp(/(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/);
    let regEmail = new RegExp(/(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/);

    for (x of form.querySelectorAll('input')) {
        if (x.value === "") {
            // TODO
            result = false;

            createEmptyErrorLabel("поле не заполнено", x.parentElement);
        }
    }

    return result;
}

document.querySelector('.my-form').addEventListener("submit", (e) => {
    e.preventDefault();
    validate(e.target);
});

document.querySelector('.my-form').addEventListener("click", (e) => {
    if (e.target.tagName === 'INPUT' && e.target.parentNode.classList.contains('error')) {
        removeEmptyErrorLabel(e.target.parentNode);
    }
})
