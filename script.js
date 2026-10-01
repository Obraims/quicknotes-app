// DOM Element Selection using querySelector
const noteForm = document.querySelector("#note-form");
const noteInput = document.querySelector("#note-input");
const noteCategory = document.querySelector("#note-category");
const searchInput = document.querySelector("#search-input");
const notesList = document.querySelector("#notes-list");
const noteCount = document.querySelector("#note-count");
const errorMessage = document.querySelector("#error-message");
const clearAllBtn = document.querySelector("#clear-all-btn");

let notes = JSON.parse(localStorage.getItem("quicknotes_app_data")) || [];

function saveNotes() {
  localStorage.setItem("quicknotes_app_data", JSON.stringify(notes));
}

function updateCount() {
  const count = notes.length;
  if (count === 0) {
    noteCount.textContent = "You have no notes yet.";
  } else if (count === 1) {
    noteCount.textContent = "You have 1 note.";
  } else {
    noteCount.textContent = `You have ${count} notes.`;
  }
}

function deleteNote(id) {
  notes = notes.filter((note) => note.id !== id);
  saveNotes();
  render();
}

function render() {
  const searchTerm = searchInput.value.trim().toLowerCase();
  notesList.textContent = "";

  const filteredNotes = notes.filter((note) =>
    note.text.toLowerCase().includes(searchTerm)
  );

  if (notes.length > 0 && searchTerm !== "" && filteredNotes.length === 0) {
    const emptyLi = document.createElement("li");
    emptyLi.textContent = "No notes match your search.";
    emptyLi.style.padding = "16px";
    emptyLi.style.color = "#666666";
    notesList.appendChild(emptyLi);
  } else {
    filteredNotes.forEach((note) => {
      const li = document.createElement("li");
      li.className = `note-card category-${note.category.toLowerCase()}`;

      const textSpan = document.createElement("span");
      textSpan.className = "note-text";
      textSpan.textContent = note.text;

      const metaDiv = document.createElement("div");
      metaDiv.className = "note-meta";

      const badgeSpan = document.createElement("span");
      badgeSpan.className = "note-badge";
      badgeSpan.textContent = note.category;

      const dateSpan = document.createElement("span");
      dateSpan.className = "note-date";
      dateSpan.textContent = note.createdAt;

      metaDiv.appendChild(badgeSpan);
      metaDiv.appendChild(dateSpan);

      const deleteBtn = document.createElement("button");
      deleteBtn.type = "button";
      deleteBtn.className = "delete-btn";
      deleteBtn.textContent = "Delete";
      deleteBtn.addEventListener("click", () => {
        deleteNote(note.id);
      });

      li.appendChild(textSpan);
      li.appendChild(metaDiv);
      li.appendChild(deleteBtn);

      notesList.appendChild(li);
    });
  }

  updateCount();
}

noteForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const rawText = noteInput.value;
  const trimmedText = rawText.trim();

  if (trimmedText.length === 0) {
    errorMessage.textContent = "Please type a note first.";
    return;
  }

  if (trimmedText.length > 200) {
    errorMessage.textContent = "Notes must be 200 characters or fewer.";
    return;
  }

  errorMessage.textContent = "";

  const newNote = {
    id: Date.now(),
    text: trimmedText,
    category: noteCategory.value,
    createdAt: new Date().toLocaleString(),
  };

  notes.push(newNote);
  saveNotes();
  noteInput.value = "";
  render();
});

searchInput.addEventListener("input", render);

clearAllBtn.addEventListener("click", () => {
  if (confirm("Delete all notes?")) {
    notes = [];
    saveNotes();
    render();
  }
});

render();
