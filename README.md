# QuickNotes

QuickNotes is a lightweight, responsive note-taking web application designed to help users capture, categorize, search, and manage daily thoughts and tasks without any bloat or distraction.

## Features
- **Categorized Note Creation**: Easily assign notes to `Personal`, `Work`, or `Study` categories with custom color-coded left borders.
- **Input Validation**: Enforces non-empty entries and limits notes to 200 characters with helpful error messages displayed in `#error-message`.
- **Live Search**: Case-insensitive instant filtering as you type in the search bar.
- **Persistent Storage**: Saves and loads all notes automatically across browser sessions via `localStorage` JSON serialization.
- **Responsive Layout**: Flexbox form control layout with a mobile-friendly `@media (max-width: 600px)` stacked column design.
- **Clear All (Bonus)**: Bulk clear all saved notes with a confirmation prompt.

## How to Run Locally
1. Clone or download the repository to your computer:
   ```bash
   git clone https://github.com/Obraims/quicknotes-app.git
   ```
2. Open `index.html` directly in any web browser (or run using Live Server in VS Code).

## What I learned
- **Safe DOM Manipulation**: Dynamically creating elements using `document.createElement()` and using `textContent` instead of `innerHTML` to eliminate XSS security vulnerabilities.
- **Data Persistence**: Serializing JavaScript object arrays with `JSON.stringify()` and deserializing with `JSON.parse()` for `localStorage` integration.
- **Responsive Web Design**: Building flexible form controls with CSS Flexbox and custom category indicator classes.
