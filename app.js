// State & Constants
const API_URL = "https://api.dictionaryapi.dev/api/v2/entries/en/";
let currentAudioUrl = null;
let savedWords = JSON.parse(localStorage.getItem("savedWords")) || [];

// DOM Elements
const searchForm = document.getElementById("searchForm");
const searchInput = document.getElementById("searchInput");
const errorContainer = document.getElementById("errorContainer");
const resultContainer = document.getElementById("resultContainer");
const resultWord = document.getElementById("resultWord");
const resultPhonetic = document.getElementById("resultPhonetic");
const playAudioBtn = document.getElementById("playAudioBtn");
const saveWordBtn = document.getElementById("saveWordBtn");
const meaningsContainer = document.getElementById("meaningsContainer");
const savedWordsList = document.getElementById("savedWordsList");
const clearSavedBtn = document.getElementById("clearSavedBtn");
const themeToggleBtn = document.getElementById("themeToggleBtn");

// Initialize application
document.addEventListener("DOMContentLoaded", () => {
    renderSavedWords();
    loadSavedTheme();
});

// Event Listeners
searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const query = searchInput.value.trim();
    if (query) fetchWordData(query);
});

themeToggleBtn.addEventListener("click", toggleTheme);
saveWordBtn.addEventListener("click", saveCurrentWord);
clearSavedBtn.addEventListener("click", clearAllSaved);
playAudioBtn.addEventListener("click", playPhoneticAudio);

// Task 3 & 4: Fetch Data & Handle Errors
async function fetchWordData(word) {
    try {
        // Reset UI States
        errorContainer.classList.add("d-none");
        resultContainer.classList.add("d-none");
        playAudioBtn.classList.add("d-none");
        currentAudioUrl = null;

        const response = await fetch(`${API_URL}${word}`);
        
        if (!response.ok) {
            throw new Error(`Word not found. Try another search!`);
        }

        const data = await response.json();
        displayResult(data[0]);
    } catch (error) {
        showError(error.message);
    }
}

// Dynamically Render API Data to DOM
function displayResult(wordData) {
    resultWord.textContent = wordData.word;
    
    // Parse phonetics text
    resultPhonetic.textContent = wordData.phonetic || wordData.phonetics?.[0]?.text || "";

    // Parse audio (find first non-empty audio string in array)
    const phoneticWithAudio = wordData.phonetics?.find(p => p.audio && p.audio !== "") || null;
    if (phoneticWithAudio) {
        currentAudioUrl = phoneticWithAudio.audio;
        playAudioBtn.classList.remove("d-none");
    }

    // Render meanings, definitions, synonyms
    meaningsContainer.innerHTML = "";
    wordData.meanings.forEach(meaning => {
        const meaningElement = document.createElement("div");
        meaningElement.className = "mb-4";
        
        // Part of Speech
        const partOfSpeechHeader = document.createElement("h4");
        partOfSpeechHeader.className = "text-primary text-capitalize fs-6 fw-bold mb-2";
        partOfSpeechHeader.textContent = meaning.partOfSpeech;
        meaningElement.appendChild(partOfSpeechHeader);

        // Definitions list
        const definitionsList = document.createElement("ol");
        meaning.definitions.slice(0, 3).forEach(def => {
            const li = document.createElement("li");
            li.className = "mb-2";
            li.innerHTML = `<strong>${def.definition}</strong>`;
            
            if (def.example) {
                li.innerHTML += `<br><span class="text-muted small">"Example: ${def.example}"</span>`;
            }
            definitionsList.appendChild(li);
        });
        meaningElement.appendChild(definitionsList);

        // Synonyms list
        if (meaning.synonyms && meaning.synonyms.length > 0) {
            const synonymsDiv = document.createElement("div");
            synonymsDiv.className = "mt-2 mb-3";
            synonymsDiv.innerHTML = `<span class="badge bg-secondary me-2">Synonyms</span>` + 
                meaning.synonyms.slice(0, 5).map(s => `<span class="text-info me-2 cursor-pointer" onclick="fetchWordData('${s}')">${s}</span>`).join("");
            meaningElement.appendChild(synonymsDiv);
        }

        meaningsContainer.appendChild(meaningElement);
    });

    resultContainer.classList.remove("d-none");
}

// Error Rendering Helper
function showError(msg) {
    errorContainer.textContent = msg;
    errorContainer.classList.remove("d-none");
}

// Audio Playback Handler
function playPhoneticAudio() {
    if (currentAudioUrl) {
        const audio = new Audio(currentAudioUrl);
        audio.play().catch(err => console.error("Audio playback blocked/failed: ", err));
    }
}

// Saved Words (Local Storage & State Management)
function saveCurrentWord() {
    const wordToSave = resultWord.textContent;
    if (wordToSave && !savedWords.includes(wordToSave)) {
        savedWords.push(wordToSave);
        localStorage.setItem("savedWords", JSON.stringify(savedWords));
        renderSavedWords();
    }
}

function renderSavedWords() {
    savedWordsList.innerHTML = "";
    if (savedWords.length === 0) {
        savedWordsList.innerHTML = `<li class="list-group-item text-muted text-center py-3">No saved words yet.</li>`;
        clearSavedBtn.classList.add("d-none");
        return;
    }

    savedWords.forEach(word => {
        const li = document.createElement("li");
        li.className = "list-group-item saved-word-item d-flex justify-content-between align-items-center";
        
        const wordSpan = document.createElement("span");
        wordSpan.textContent = word;
        wordSpan.addEventListener("click", () => {
            searchInput.value = word;
            fetchWordData(word);
        });

        const deleteBtn = document.createElement("button");
        deleteBtn.className = "btn-close btn-sm";
        deleteBtn.setAttribute("aria-label", "Delete");
        deleteBtn.addEventListener("click", (e) => {
            e.stopPropagation(); // Stop trigger of parent click event
            deleteWord(word);
        });

        li.appendChild(wordSpan);
        li.appendChild(deleteBtn);
        savedWordsList.appendChild(li);
    });

    clearSavedBtn.classList.remove("d-none");
}

function deleteWord(word) {
    savedWords = savedWords.filter(w => w !== word);
    localStorage.setItem("savedWords", JSON.stringify(savedWords));
    renderSavedWords();
}

function clearAllSaved() {
    savedWords = [];
    localStorage.removeItem("savedWords");
    renderSavedWords();
}

// Dynamic Theme Toggling
function toggleTheme() {
    const isDark = document.body.classList.toggle("dark-theme");
    localStorage.setItem("theme", isDark ? "dark" : "light");
    themeToggleBtn.textContent = isDark ? "Toggle Light Mode" : "Toggle Dark Mode";
}

function loadSavedTheme() {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
        document.body.classList.add("dark-theme");
        themeToggleBtn.textContent = "Toggle Light Mode";
    }
}