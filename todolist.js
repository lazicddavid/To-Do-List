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

const input = document.getElementById("todoInput");
const list = document.getElementById("todoList");
const form = document.getElementById("todoForm");

let todos = [];
let nextId = 0;
//uraditi ovo sa Submit, tj napravi formu i na formu dodati submit event
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const value = input.value.trim();
  if (!value) return;
  todos.push({ id: nextId++, text: value });
  input.value = "";
  render();
});

list.addEventListener("click", (e) => {
  e.preventDefault();
  const trashBtn = e.target.closest(".btn-trash");
  if (!trashBtn) return;

  const id = Number(trashBtn.dataset.id);
  todos = todos.filter((niz) => niz.id !== id);
  render();
});

function render() {
  list.innerHTML = "";
  todos.forEach((niz) => {
    const li = document.createElement("li");
    li.className = "todo-item";

    const p = document.createElement("p");
    p.className = "todo-text";
    p.textContent = niz.text;

    const btn = document.createElement("button");
    btn.className = "btn-trash";
    btn.dataset.id = niz.id;

    btn.innerHTML = `
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M9 3h6l1 2h4v2H4V5h4l1-2zm1 8h2v7h-2v-7zm4 0h2v7h-2v-7zM7 11h2v7H7v-7z"/>
      </svg>
    `;

    li.appendChild(p);
    li.appendChild(btn);
    list.appendChild(li);
  });
}

//doraditi render da radi sa innerHtml direktno na li
//dodati check box na svaki To-do
//kad se klikne na taj checkbox, todo treba da postane uradjen
//i na ekranu, da se precrta tekst
