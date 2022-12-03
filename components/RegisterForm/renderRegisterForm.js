// W funkcji poniżej:
// 1. Wybranie i wyczyszczenie sekcji o klasie "content"
// 2. Stwórz element <form> i nadaj mu id 'register-form'.
// 3. Stówrz element <input>, nadaj mu type "email", placeholder "email", id "register-email-input".
// 4. Stwórz 2 osobne inputy, oba będą miały type 'password', oba placeholder "password", pierwszy będzie miał id "register-first-input-password" a drugi id "register-second-input-password"
// 5. Stwórz element <button>, nadaj mu type "submit" i textContent "Register"
// 6. Do elementu <form> (pkt 2) podpiąć wszystkie inputy i button.
// 7. Do sekcji content podpiąć cały formularz

import { auth } from "../../firebaseConfig.js";
import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.8.2/firebase-auth.js";
import renderHomePage from "../HomePage/renderHomePage.js";

export default function () {
    const contentClass = document.querySelector(".content"); // nie zadziałało gdy użyłem getElementsByClassName
    contentClass.innerHTML = "";

    const registerForm = document.createElement("form");
    registerForm.setAttribute("id", "register-form");

    const inputEmail = document.createElement("input");
    inputEmail.setAttribute("type", "email");
    inputEmail.setAttribute("placeholder", "email");
    inputEmail.setAttribute("id", "register-email-input");

    const inputPassword = document.createElement("input");
    inputPassword.setAttribute("type", "password");
    inputPassword.setAttribute("placeholder", "password");
    inputPassword.setAttribute("id", "register-first-input-password");

    const inputPasswordConfirm = document.createElement("input");
    inputPasswordConfirm.setAttribute("type", "password");
    inputPasswordConfirm.setAttribute("placeholder", "password");
    inputPasswordConfirm.setAttribute("id", "register-second-input-password");

    const buttonRegister = document.createElement("button");
    buttonRegister.setAttribute("type", "submit");
    buttonRegister.textContent = "Register";

    registerForm.appendChild(inputEmail);
    registerForm.appendChild(inputPassword);
    registerForm.appendChild(inputPasswordConfirm);
    registerForm.appendChild(buttonRegister);

    contentClass.appendChild(registerForm);

    registerForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const email = inputEmail.value;
        const password = inputPassword.value;
        const passwordConfirm = inputPasswordConfirm.value;

        console.log(email, password, passwordConfirm);
        if (password === passwordConfirm) {
            console.log("hasła są takie same ");
            createUserWithEmailAndPassword(auth, email, password)
                .then((userCredentials) => {
                    console.log(userCredentials);
                    renderHomePage();
                });
        } else {
            console.log("hasła nie są ze sobą zgodne");
        }
    })

}
