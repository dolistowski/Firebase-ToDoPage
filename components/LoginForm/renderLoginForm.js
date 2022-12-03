// W funkcji:
// 1. Stwórz element <form> i nadaj mu id 'login-form'
// 2. Stwórz element <input>, nadaj mu type 'email', id 'input-email', placeholder 'email'
// 3. Stwórz element <input>, nadaj mu type 'password', id 'input-password', placeholder 'password'
// 4. Stwórz element <button>, nadaj mu type 'submit', textContent 'Sign in'
// 5. Podepnij oba inputy i button do form.
// 6. Na form nakładacie event listener (na submit).
// W środku event listenera:
// 7. Ściągnij wartości inputów email i password, zapisz do zmiennych (.value)
// 8. Wywołanie funkcji signInWithEmailAndPassword, funkcja przyjmuje 3 argumenty:
// - obiekt auth (zaimportuj z firebaseConfig.js)
// - email (który przed chwilą ściągnąłeś z inputa)
// - password (też z inputa)
// 9. Do wywołania poprzedniej funkcji dopisz thena, będzie on przyjmował parametr creds, w środku thena console.log(creds), console.log('Zalogowano') i wywołanie renderHomePage() (wcześniej trzeba zaimportować), dodaj metode catch i console.log('Error')
// KONIEC EL
// 10. Zwróć element form z głównej funkcji przy pomocy return

import { auth } from "../../firebaseConfig.js";
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.8.2/firebase-auth.js";
import renderHomePage from "../HomePage/renderHomePage.js";

export default function () {
    const form = document.createElement("form");
    form.setAttribute("id", "login-form");

    const input1 = document.createElement("input");
    input1.setAttribute("type", "email");
    input1.setAttribute("id", "input-email");
    input1.setAttribute("placeholder", "email");

    const input2 = document.createElement("input");
    input2.setAttribute("type", "password");
    input2.setAttribute("id", "input-password");
    input2.setAttribute("placeholder", "password");

    const button = document.createElement("button");
    button.setAttribute("type", "submit");
    button.textContent = "Sign in";

    form.appendChild(input1);
    form.appendChild(input2);
    form.appendChild(button);

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        const emailValue = input1.value;
        const passwordValue = input2.value;

        signInWithEmailAndPassword(auth, emailValue, passwordValue)
            .then

            ((Credential) => {
                console.log(Credential);
                console.log("Zalogowano");
                renderHomePage();
            })

            .catch((error) => console.log("error"));
    })

    return form;
}