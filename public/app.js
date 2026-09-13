const API_URL = '/api/notes';

// DOM Elements
const noteForm = document.getElementById('note-form');
const noteIdInput = document.getElementById('note-id');
const titleInput = document.getElementById('note-title');
const contentInput = document.getElementById('note-content');
const formTitle = document.getElementById('form-title');
const saveBtn = document.getElementById('save-btn');
const cancelBtn = document.getElementById('cancel-btn');
const notesGrid = document.getElementById('notes-grid');

// Event Listeners
document.addEventListener('DOMContentLoaded', fetchNotes);

noteForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const id = noteIdInput.value;
  const title = titleInput.value;
  const content = contentInput.value;

  if (id) {
    await updateNote(id, title, content);
  } else {
    await createNote(title, content);
  }

  resetForm();
  fetchNotes();
});

cancelBtn.addEventListener('click', resetForm);

// API Interaction Functions
async function fetchNotes() {
  try {
    const res = await fetch(API_URL);
    const notes = await res.json();
    renderNotes(notes);
  } catch (err) {
    console.error('Error fetching notes:', err);
    notesGrid.innerHTML = '<p>Error connecting to your thoughts...</p>';
  }
}

// *** UPDATED: New Aesthetic Classes ***
function renderNotes(notes) {
  notesGrid.innerHTML = '';
  if (notes.length === 0) {
    notesGrid.innerHTML = '<p>No reflections recorded yet...</p>';
    return;
  }

  notes.forEach((note) => {
    const card = document.createElement('div');
    card.className = 'note-card'; // Main aesthetic change is CSS-driven
    card.innerHTML = `
      <div>
        <h3>${escapeHTML(note.title)}</h3>
        <p>${escapeHTML(note.content)}</p>
      </div>
      <div class="card-actions">
        <!-- New btn-small-text classes -->
        <button class="btn-small-text btn-edit" onclick="startEdit(${note.id}, '${escapeQuote(note.title)}', '${escapeQuote(note.content)}')">Edit</button>
        <button class="btn-small-text btn-delete" onclick="deleteNote(${note.id})">Delete</button>
      </div>
    `;
    notesGrid.appendChild(card);
  });
}

async function createNote(title, content) {
  try {
    await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, content }),
    });
  } catch (err) {
    console.error('Error creating note:', err);
  }
}

async function updateNote(id, title, content) {
  try {
    await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, content }),
    });
  } catch (err) {
    console.error('Error updating note:', err);
  }
}

async function deleteNote(id) {
  if (!confirm('Are you certain you wish to discard this memory?')) return;
  try {
    await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    fetchNotes();
  } catch (err) {
    console.error('Error deleting note:', err);
  }
}

// UI State Management
function startEdit(id, title, content) {
  noteIdInput.value = id;
  titleInput.value = title;
  contentInput.value = content;
  // Dynamic header update to maintain vibe
  formTitle.innerText = 'Revise reflection'; 
  saveBtn.innerText = 'Re-Commit Memory';
  cancelBtn.classList.remove('hidden');
  // Scroll to form nicely
  document.querySelector('.paper-page').scrollIntoView({ behavior: 'smooth' });
}

function resetForm() {
  noteIdInput.value = '';
  titleInput.value = '';
  contentInput.value = '';
  formTitle.innerText = 'New Entry';
  saveBtn.innerText = 'Commit to Memory';
  cancelBtn.classList.add('hidden');
}

// Security: Escaping Utility Functions
function escapeHTML(str) {
  return str.replace(/[&<>'"]/g, 
    tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
  );
}

// Security: Escaping quotes/newlines for inline onclick attributes
function escapeQuote(str) {
  return str.replace(/'/g, "\\'").replace(/"/g, '&quot;').replace(/\n/g, '\\n');
}
