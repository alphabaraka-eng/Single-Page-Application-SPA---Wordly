# Single-Page-Application-SPA---Wordly
# Lab: Single Page Application (SPA) – Wordly

## Introduction

You have just joined the front-end development team at **Wordly**, an online language learning platform. Your assignment is to build an interactive dictionary Single Page Application (SPA) that allows users to search for words, view their definitions, hear pronunciations, and save their favorite terms for future reference—all on a single page without refreshing. 

This lab will strengthen your skills in integrating external public APIs using `fetch()`, processing JSON payloads, handling user form submissions, utilizing `localStorage` for state persistence, and dynamically updating the DOM.

---

## Tools & Resources

* **GitHub Repo**: [Single-Page-Application-SPA---Wordly](https://github.com/alphabaraka-eng/Single-Page-Application-SPA---Wordly)
* **Public API**: [Free Dictionary API](https://dictionaryapi.dev/)
* **Core APIs**: `fetch()`, `async/await`, `localStorage`, `Audio()`
* **DOM Methods**: `document.createElement()`, `Element.append()`, `EventTarget.addEventListener()`

---

## Set Up & Workflow Process

To build, authenticate, and sync this project using your Ubuntu terminal and VS Code, the following workflow process was completed:

### Step 1: Create the Repository on GitHub
1. Navigate to [GitHub](https://github.com/) and log into the account: **`alphabaraka-eng`**.
2. Click the green **New** button (or the **`+`** icon in the top right corner) to create a new repository.
3. Named the repository exactly: `Single-Page-Application-SPA---Wordly`.
4. Kept the repository **Public**.
5. Left all initialization options unchecked (did *not* add a README, `.gitignore`, or license) to keep the repository clean and ready for cloning.
6. Clicked **Create repository**.

### Step 2: Clone the Repository & Setup VS Code on Ubuntu
Using the Ubuntu terminal, the remote repository was cloned locally to create a working folder:
```bash
# Open your Ubuntu Terminal (Ctrl + Alt + T) and navigate to your workspace
cd ~/Desktop

# Clone the remote repository to your local machine
git clone [https://github.com/alphabaraka-eng/Single-Page-Application-SPA---Wordly.git](https://github.com/alphabaraka-eng/Single-Page-Application-SPA---Wordly.git)

# Move into the newly created folder
cd Single-Page-Application-SPA---Wordly

# Open the directory in VS Code
code .



Instructions
1. Fetch Definitions for a Given Word
Create an asynchronous function that takes a word input string and uses fetch() to request data from the Free Dictionary API:
https://api.dictionaryapi.dev/api/v2/entries/en/${WORD}

Handle network errors, API failures, and empty states gracefully.

2. Display the Word Details
When the fetch is successful, dynamically generate and render:

The Target Word & Phonetic Spelling: Display the searched word alongside its phonetic representation.

Audio Playback: Reveal a "Play Audio" button if a valid pronunciation URL exists within the API's phonetics payload.

Definitions & Lexical Elements: Loop through the API's meanings array. For each block, show the Part of Speech and up to three clean definitions with their corresponding usage examples.

Synonym Badges: List synonyms as clickable badges. Clicking a synonym must automatically trigger a new fetch search for that word.

3. Clear and Reset the UI
Each time a user submits a search:

Clear the search input field.

Hide previous error blocks.

Update the details container with fresh data, removing any previous elements from the DOM.

4. Error Handling
When a lookup fails (e.g., misspelled word, word not found, or network disconnect):

Display the message from the catch block:

JavaScript
.catch(error => console.log(error.message))
Render the error inside a dedicated, styled error container.

Ensure this container is hidden immediately upon the next successful search.

BONUS: Additional Features Implemented
⭐ Saved Words Sidebar (Favorites List):
Allows users to save key vocabulary terms. These terms are stored locally and persist across page refreshes using localStorage. Clicking on a saved word immediately re-triggers its search.

🌓 Dynamic Dark & Light Theme:
Utilizes CSS variables (--bg-color, --text-color, --card-bg) to toggle the entire application's theme dynamically without layout shifts or page reloads. The preferred theme state is saved in localStorage.

Testing and Refining
To validate the application's robust design, verify the following manual verification guidelines:

Fetch Request Validation: Verify that typing "serendipity" and hitting submit retrieves exact semantic definitions.

Dynamic UI Reset: Confirm that searching for a new word completely wipes out the previous word's details.

Error Resilience: Search for a random set of characters (e.g., "qwertyuiop"). Ensure the application handles the 404 Not Found response smoothly and outputs an error card.

Interactive States: Verify that clicking a dynamic synonym badge instantly performs a dictionary lookup for that clicked term.