// 1. import: renderLoginForm, renderRegisterForm
// W funkcji:
// 2. Wybranie i czyszczenie sekcji content
// 3. Stwórz element <h2> i nadaj mu textContent 'Log in or sign up'
// 4. Stwórz element <p> i nadaj mu textContent "Our authentication mechanism uses Firebase Auth and is 100% secure."
// 5. Stwórz element <label> i nadaj mu textContent 'Log in:'
// 6. Wywołaj funckje renderLoginForm i zapisz wynik do zmiennej (const form = renderLoginForm())
// 7. Stwórz element <button>, nadaj mu id 'register-button' i textContent 'register'
// 8. Do sekcji content podpiąć: h2, p, label, form, button
// 9. Na buttona register nadajecie event listener (na click) (w środku: czyścicie skecje content (innerHTML) i wywołujecie renderRegisterForm)

import renderLoginForm from "../LoginForm/renderLoginForm.js";
import renderRegisterForm from "../RegisterForm/renderRegisterForm.js";

export default function () {
    const contentContainer = document.querySelector(".content");
    contentContainer.innerHTML = "";

    const h2 = document.createElement("h2");
    h2.textContent = "Log in or Sign up";

    const p = document.createElement("p");
    p.textContent = " Our authentication mechanism uses Firebase Auth and it's 100% secure";

    const label = document.createElement("label");
    label.textContent = "Log in";

    const form = renderLoginForm();

    const button = document.createElement("button");
    button.setAttribute("id", "register-button");
    button.textContent = "Register";

    contentContainer.appendChild(h2);
    contentContainer.appendChild(p);
    contentContainer.appendChild(label);
    contentContainer.appendChild(form);
    contentContainer.appendChild(button);

    button.addEventListener("click", function () {
        // contentContainer.innerHTML = ""; // mamy to już na początku w renderRegisterForm
        renderRegisterForm();
    });
}