// 1. Importy: storage z firebaseConfig; uploadBytes, ref ("https://www.gstatic.com/firebasejs/9.8.2/firebase-storage.js")
// W funkcji:
// 2. Wybranie i czyszczenie content containera
// 3. Stwórz element <h2>, textContent 'Upload your profile photo!', od razu podepnij pod content container.
// 4. Stwórz element <form>, id "file-form".
// 5. Stwórz element <input>, id 'file-input', type 'file', accept "image/png, image/jpeg"
// 6. Stwórz element <button>, id "file-form-submit-button", type "submit", textContent "Upload your file"
// 7. Do form (pkt 4) podepnij input i submit button
// 8. Do content containera podepnij form
// 9. Funkcję zaimportuj do index.js, podepnij event listener do storage buttona i tam wywołuj renderStoragePage

// 1
import { storage, auth } from "../../firebaseConfig.js";
import { uploadBytes, ref } from "https://www.gstatic.com/firebasejs/9.8.2/firebase-storage.js";

export default function () {
    // 2
    const contentContainer = document.querySelector(".content");
    contentContainer.innerHTML = "";
    // 3
    const h2 = document.createElement("h2");
    h2.textContent = "Upload your profile photo!";
    contentContainer.appendChild(h2);
    // 4
    const fileForm = document.createElement("form");
    fileForm.setAttribute("id", "file-form");
    // 5
    const fileInput = document.createElement("input");
    fileInput.setAttribute("id", "file-input");
    fileInput.setAttribute("type", "file");
    fileInput.setAttribute("accept", "image/png, image/jpeg");
    // 6
    const submitButton = document.createElement("button");
    submitButton.setAttribute("id", "file-form-submit-button");
    submitButton.setAttribute("type", "submit");
    submitButton.textContent = "Upload your file";
    // 7 
    fileForm.appendChild(fileInput);
    fileForm.appendChild(submitButton);
    // 8
    contentContainer.appendChild(fileForm);

    // część wspólna z trenerem

    // nałożenie addEventListenera
    fileForm.addEventListener("submit", (event) => {
        event.preventDefault();
        // stworzenie referencji do storage
        const storageRef = ref(storage, `/users/${auth.currentUser.uid}/avatar`) // jeśli chcę wyświetlać w firebase pierwotną nazwę pliku, zamiast avatar robię ${file.name}

        const file = fileInput.files[0]; // nie .value, bo fileInputy nie mają wartości, file da nam fileList, gdzie będzie tylko jedno zdjęcie
        uploadBytes(storageRef, file) // to funkcja z firebase, która daje możliwość wrzucania plików do storage'a
            .then(() => console.log("File uploaded"))
            .catch(() => console.log("Failed to upload the file"));

        // teraz chcemy, żeby zdjęcie pokazywało się w Home Page więc przechodzimy do renderHomePage i robimy tam import:
        // import { storage, auth } from "../../firebaseConfig.js";
        // import { ref, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.8.2/firebase-storage.js";
    });
}