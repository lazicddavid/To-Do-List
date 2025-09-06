//brisanje elemenata iz todo liste
//treba ce se izbrisati prvi element iz niza
//posle toga i sa ekrana
//za brisanje sa ekrana, pogledaj metodu filter
//kako ces da znas kad kliknes na to do, da ga povezes sa to do koji treba da izbrises iz niza
//prilikom dodavanja to do u niz, napravi za svaki todo ID (pogledaj crypto.randomuuid
//prilikom postavljanja to do na ekran, zakaci ID todo-a na list element
//kad kliknem na to do, procitaj taj ID i to je ID todo-a koji treba da se izbrise

const form = document.getElementById("todoForm");
const input = document.getElementById("todoInput");
const list = document.getElementById("todoList");

let todos = [];
let nextId = 0;

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const value = input.value.trim();
  if (!value) return;

  todos.push({ id: nextId++, text: value, done: false });

  input.value = "";
  render();
});
//UMESTO smeca i checkbox Id-a, zakaciti ID na listelement i procitati ga jednom uz pomoc closest-a
//napraviti  varijablu za to-do text input i popuni je preko addEventList.
list.addEventListener("click", (e) => {
  const trashBtn = e.target.closest(".btn-trash");

  if (trashBtn) {
    const id = Number(trashBtn.dataset.id);
    todos = todos.filter((t) => t.id !== id);
    render();
    return;
  }
  const checkbox = e.target.closest(".todo-check");
  if (checkbox) {
    const id = Number(checkbox.dataset.id);
    const todo = todos.find((t) => t.id === id);
    if (!todo) return;

    todo.done = checkbox.checked;

    render();
  }
});
function render() {
  list.innerHTML = "";
  todos.forEach((t) => {
    const li = document.createElement("li");
    li.className = "todo-item";
    li.innerHTML = `
        <input type="checkbox" class="todo-check" data-id="${t.id}" ${
      t.done ? "checked" : ""
    }>
        <span class="todo-text ${t.done ? "done" : ""}">${t.text}</span>
        <button class="btn-trash" data-id="${t.id}">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
            <path d="M136.7 5.9L128 32 32 32C14.3 32 0 46.3 0 64S14.3 96 32 96l384 0c17.7 
            0 32-14.3 32-32s-14.3-32-32-32l-96 0-8.7-26.1C306.9-7.2 294.7-16 
            280.9-16L167.1-16c-13.8 0-26 8.8-30.4 21.9zM416 144L32 144 
            53.1 467.1C54.7 492.4 75.7 512 101 512L347 512c25.3 
            0 46.3-19.6 47.9-44.9L416 144z"/>
          </svg>
        </button>
      `;
    list.appendChild(li);
  });
}

//doraditi render da radi sa innerHtml direktno na li
//dodati check box na svaki To-do
//kad se klikne na taj checkbox, todo treba da postane uradjen
//i na ekranu, da se precrta tekst
