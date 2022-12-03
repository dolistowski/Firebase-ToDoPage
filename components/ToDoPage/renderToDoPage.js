import renderToDoForm from "../ToDoForm/renderToDoForm.js";
import { ref, onValue, push, update, remove } from "https://www.gstatic.com/firebasejs/9.8.2/firebase-database.js";

import { auth, database } from "../../firebaseConfig.js";

// ZADANIE 1 CZĘŚĆ ELSE
// 1. Stwórz element <h2>, textContent 'Add, remove and edit your todos'
// 2. Stwórz zmienną listItems, wartością tej zmiennej będzie wywołanie metody .map() na zmiennej todos (const listItems = todos.map(el, i)=> ...).
// 3. W metodzie map (pkt 2):
// - stwórz element <li>, id li-${i}
// - stwórz element <div>, id div-${i}
// - stwórz element <span>, textContent będzie musiał zawierać todoText i kategorię
// - stwórz element <button>, id edit-button-${i}, class 'edit-button', textContent 'Edit
// - stwórz element <button>, id remove-button-${i}, class 'remove-button', textContent 'remove'
// - do diva podepnij spana, editButton  removeButton przy pomocy .appendChild()
// - do li podepnij diva (appendChild)
// zwróc li przy pomocy return (return li)
// 4. POZA METODA MAP console.log(listItems)


// ZADANIE 1 CZĘŚĆ IF
// 1. Wyczyść contentContainer
// 2. Stwórz element <h2> z textContent "Add, remove and edit your todos" i podepnij go do content containera
// 3. Wywołaj funckję renderTodoForm i zapisz wynik wywołania d ozmiennej (const todoFrom = renderTodoForm())
// 4. Podpięcie todoForm do containera (con.apc(todoForm))
// 5. Dodaj eventListener na todoForm (reagujemy na submit, pamiętać o event.preventDefault())
// W eventListenerze
// 6. Wybierz wszystkie radio inputy i zapisz de zmiennej radios (document.getElementsByName (DOKUMENTACJA)), zrób z tego array bo getElementsByName zwraca HTMLCollection
// 7. Z tych 4 radio imputów znajdź ten który jezt zaznaczony (input.checked, .find(), wybieranie elementów w CSS w zależności od atrybutów), po znalezieniu inputu ściągnąć z niego .value
// 8. Wybierz input o id "todo-input" przy pomocy getElementById i ściągnij z niego value, zapisz do zmiennej

export default function () {
    const contentContainer = document.querySelector(".content");
    const toDoRef = ref(database, "todos/" + auth.currentUser.uid);

    onValue(toDoRef, (snapshot) => {
        const data = snapshot.val();
        console.log(data);
        if (!data) {
            contentContainer.innerHTML = "";

            const h2 = document.createElement("h2");
            h2.textContent = "Add, remove and edit your todos";
            contentContainer.appendChild(h2);

            const toDoForm = renderToDoForm();

            contentContainer.appendChild(toDoForm);

            toDoForm.addEventListener("submit", (event) => {
                event.preventDefault();

                const radios = [...document.getElementsByName("category")];

                const category = radios.find((el) => el.checked).value;

                const input = document.getElementById("todo-input").value;
                // const inputValue = input.value;
                console.log(category, input);
                push(toDoRef, {
                    input,
                    category
                })
                    .then(() => console.log("Pushed the data to database"))
                    .catch((error) => console.log(error.message));
            })
        } else {
            const todos = Object.values(data);
            console.log(todos);

            const h2 = document.createElement("h2");
            h2.textContent = "Add, remove and edit your todos";

            const listItems = todos.map((el, i) => {
                console.log(el);
                const li = document.createElement("li");
                li.setAttribute("id", `li-${i}`);

                const div = document.createElement("div");
                div.setAttribute("id", `div-${i}`);

                const span = document.createElement("span");
                span.textContent = `${el.input} (${el.category})`;

                const editButton = document.createElement("button");
                editButton.setAttribute("id", `edit-button-${i}`);
                editButton.setAttribute("class", "edit-button");
                editButton.textContent = "Edit";

                const removeButton = document.createElement("button");
                removeButton.setAttribute("id", `remove-button-${i}`);
                removeButton.setAttribute("class", "remove-button");
                removeButton.textContent = "Remove";

                div.appendChild(span);
                div.appendChild(editButton);
                div.appendChild(removeButton);

                li.appendChild(div);

                return li;
            })
            console.log(listItems);

            // ZADANIE 2
            // 1. Stwórz element <ul>
            // 2. Wywołaj metodę forEach na zmiennej listItems, w środku forEach'a podepnij aktualny element po którym iterujesz do ul'a z pkt 1 (el => ul.apc(el))
            // 3. Wyczyść content container (innerHTML)
            // 4. Stwórz zmienną todoForm, zapisz w niej wywołanie renderTodoForm (const todoForm = render...)
            // 5. Do content containera podepnij h2
            // 6. Do content con podepnij todoForm
            // 7. Do content con podepnij ul
            // 8. Na todoForm nakładacie event listenera (ten sam co wyżej w tym pliku)
            // 9. Pomyśl jak można by skrócić kod (mamy 2 te same event listenery), jeżeli wpadniesz na jakiś ponysł, zastosuj go

            const ul = document.createElement("ul");

            listItems.forEach(el => ul.appendChild(el));

            contentContainer.innerHTML = "";

            const toDoForm = renderToDoForm();

            contentContainer.appendChild(h2);

            contentContainer.appendChild(toDoForm);

            contentContainer.appendChild(ul);

            toDoForm.addEventListener("submit", (event) => {
                event.preventDefault();

                const radios = [...document.getElementsByName("category")];

                const category = radios.find((el) => el.checked).value;

                const input = document.getElementById("todo-input").value;
                // const inputValue = input.value;
                console.log(category, input);
                push(toDoRef, {
                    input,
                    category
                })
                    .then(() => console.log("Pushed the data to database"))
                    .catch((error) => console.log(error.message));
            })

            // 1. Wybierz wszystkie edit buttony (wszystkie mają klasę "edit-button"), zwróci wam to HTMLCollection, trzeba przerobić na zwykły array
            // 2. Na arrayu z pkt 1, wywołaj forEach (el, i).
            // W środku forEach'a:
            // a) nadaj na element po którym iterujesz event listener (click)
            // W środku tego event listenera:
            // a) usuń z domu element po którym aktualnie iterujesz (.remove())
            // b) stwórz zmienną div w której będziesz przechowywał diva-rodzica edit buttona (doc.getEBID(div-${i}))
            // c) stwórz zmienną form i wywołaj w niej renderTodoForm
            // d) nadaj temu formularzowi id zależne od indexu (todo-form-${i})
            // e) do diva (ppkt b) podpinacie form (ppkt c)

            const editButtons = [...document.getElementsByClassName("edit-button")];
            editButtons.forEach((el, i) => {
                el.addEventListener("click", () => {
                    el.remove();

                    const div = document.getElementById(`div-${i}`);

                    const form = renderToDoForm();

                    form.setAttribute("id", `todo-form-${i}`);

                    div.appendChild(form);

                    // 1. Na form nałóż event listener na submit
                    // 2. Wybierz todo input z właściwego formularza (this.childNodes) i ściągnij wartość (.value)
                    // 3. Wybierz wszystkie radio inputy z odpowiedniego formularza (this.getElementsByTagName), zrzutuj HTMLCollection na zwykły array, po czym usuń z niego pierwszy element (będzie to input text, my chcemy tylko radio) (.slice()), po czym metodą find znajdź input z atrybutem checked i ściągnij z niego wartość przy pomocy .value
                    // 4. Stwórz obiekt updates.
                    // 5. Przy pomocy bracket notation wrzuć do tego obiektu kategorie ściągniętą z radio inputów i todoText z inputu text
                    // 6. Wywołaj metodę update z obiektem updates jako argument.

                    form.addEventListener("submit", function (event) {
                        event.preventDefault();

                        const input = this.childNodes[0].value;

                        const category = [...this.getElementsByTagName("input")]
                            .slice(1, 5)
                            .find(el => el.checked).value;

                        console.log(input, category);

                        const updates = {};

                        updates[`todos/${auth.currentUser.uid}/${Object.keys(data)[i]}`] = {
                            category,
                            input
                        };

                        update(ref(database), updates);
                    });
                })
            })
            const removeButtons = [...document.getElementsByClassName("remove-button")];
            removeButtons.forEach((el, i) => {
                el.addEventListener("click", function () {
                    this.parentElement.parentElement.remove();
                    remove(ref(database, `todos/${auth.currentUser.uid}/${Object.keys(data)[i]}`));

                })
            })
        }
    });
}

// 1. Na form nałóż event listener na submit
// 2. Wybierz todo input z właściwego formularza (this.childNodes) i ściągnij wartość (.value)
// 3. Wybierz wszystkie radio inputy z odpowiedniego formularza (this.getElementsByTagName), zrzutuj HTMLCollection na zwykły array, po czym usuń z niego pierwszy element (będzie to input text, my chcemy tylko radio) (.slice()), po czym metodą find znajdź input z atrybutem checked i ściągnij z niego wartość przy pomocy .value
// 4. Stwórz obiekt updates.
// 5. Przy pomocy bracket notation wrzuć do tego obiektu kategorie ściągniętą z radio inputów i todoText z inputu text
// 6. Wywołaj metodę update z obiektem updates jako argument.