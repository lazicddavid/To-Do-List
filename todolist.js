//brisanje elemenata iz todo liste
//treba ce se izbrisati prvi element iz niza
//posle toga i sa ekrana
//za brisanje sa ekrana, pogledaj metodu filter
//kako ces da znas kad kliknes na to do, da ga povezes sa to do koji treba da izbrises iz niza
//prilikom dodavanja to do u niz, napravi za svaki todo ID (pogledaj crypto.randomuuid
//prilikom postavljanja to do na ekran, zakaci ID todo-a na list element
//kad kliknem na to do, procitaj taj ID i to je ID todo-a koji treba da se izbrise
/*
const randomID = crypto.randomUUID();
console.log(randomID);*/
const form = document.getElementById("todoForm");
const input = document.getElementById("todoInput");
const list = document.getElementById("todoList");

let todos = [];
let nextId = 0;

// Dodavanje novog todo-a preko forme
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const value = input.value.trim();
  if (!value) return;

  // start from empty array, push input, render from array
  todos.push({ id: nextId++, text: value, done: false });

  input.value = "";
  render();
});

// Delegacija za brisanje (kantica)
list.addEventListener("click", (e) => {
  const trashBtn = e.target.closest(".btn-trash");
  if (!trashBtn) return;

  const id = Number(trashBtn.dataset.id);
  todos = todos.filter((t) => t.id !== id);
  render();
});

// Delegacija za čekiranje (checkbox)
list.addEventListener("change", (e) => {
  const checkbox = e.target.closest(".todo-check");
  if (!checkbox) return;

  const id = Number(checkbox.dataset.id);
  const todo = todos.find((t) => t.id === id);
  if (!todo) return;

  todo.done = checkbox.checked;
  render();
});

function render() {
  list.innerHTML = "";

  todos.forEach((t) => {
    const li = document.createElement("li");
    li.className = "todo-item";

    // innerHTML direktno na li (kako si tražio)
    li.innerHTML = `
      <label style="display:flex; align-items:center; gap:12px; flex:1;">
        <input
          type="checkbox"
          class="todo-check"
          data-id="${t.id}"
          ${t.done ? "checked" : ""}
          aria-label="Mark as done"
        />
        <p class="todo-text ${t.done ? "done" : ""}">${escapeHtml(t.text)}</p>
      </label>

      <button class="btn-trash" data-id="${t.id}" aria-label="Delete todo">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M9 3h6l1 2h4v2H4V5h4l1-2zm1 8h2v7h-2v-7zm4 0h2v7h-2v-7zM7 11h2v7H7v-7z"/>
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
