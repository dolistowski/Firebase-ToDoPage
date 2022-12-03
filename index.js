import renderHomePage from "./components/HomePage/renderHomePage.js";
// import renderRegisterForm from "./components/RegisterForm/renderRegisterForm.js";
// import renderLoginForm from "./components/LoginForm/renderLoginForm.js";

import renderLoginPage from "./components/LoginPage/renderLoginPage.js";
import { ref, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.8.2/firebase-storage.js";
import { auth, storage } from "./firebaseConfig.js";
import { signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.8.2/firebase-auth.js";
import renderToDoForm from "./components/ToDoForm/renderToDoForm.js";
import renderToDoPage from "./components/ToDoPage/renderToDoPage.js";
import renderTeamPage from "./components/TeamPage/renderTeamPage.js";
import renderStoragePage from "./components/StoragePage/renderStoragePage.js";

const contentContainer = document.querySelector(".content");

const homeButton = document.getElementById("home-anchor");
const todosButton = document.getElementById("todos-anchor");
const storageButton = document.getElementById("storage-anchor");
const publicButton = document.getElementById("public-anchor");
const loginButton = document.getElementById("login-anchor");

onAuthStateChanged(auth, (user) => {
    if (user) {
        console.log(`User is logged in (${user.email}), onAuthStateChanged`);
        loginButton.textContent = "Log out";
        const h2 = document.querySelector("h2");
        console.log(h2.textContent);
        if (h2.textContent === "Welcome") {
            const storageRef = ref(storage, `/users/${auth.currentUser.uid}/avatar`);
            getDownloadURL(storageRef)
                .then((url) => {
                    const img = document.createElement("img");
                    img.setAttribute("src", url);
                    contentContainer.appendChild(img);
                });
        }
    } else {
        console.log(`No user logged in. onAuthStateChanged`);
        loginButton.textContent = "Log in";
    }
});

renderHomePage();
// renderRegisterForm();
// contentContainer.appendChild(renderLoginForm());


// Navbar buttons listeners

// Home button

// homeButton.addEventListener("click", () => {
// renderHomePage();
// })

// lub 

homeButton.addEventListener("click", renderHomePage);

// todos

todosButton.addEventListener("click", () => {
    contentContainer.innerHTML = "";
    renderToDoPage();
    //contentContainer.appendChild(renderToDoForm());
})

// storage button

storageButton.addEventListener("click", renderStoragePage);

// team todos button

publicButton.addEventListener("click", renderTeamPage);


loginButton.addEventListener("click", () => {
    // renderLoginPage();
    if (auth.currentUser) {
        signOut(auth).then(() => renderHomePage())
            .catch((error) => console.error(error));
    } else {
        renderLoginPage();
    }

})

