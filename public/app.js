const API_URL = '/api/notes';

const noteForm = document.getElementById('note-form');
const noteIdInput = document.getElementById('note-id');
const titleInput = document.getElementById('note-title');
const contentInput = document.getElementById('note-content');
const formTitle = document.getElementById('form-title');
const saveBtn = document.getElementById('save-btn');
const cancelBtn = document.getElementById('cancel-btn');
const notesGrid = document.getElementById('notes-grid');

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

async function fetchNotes() {
  try {
    const res = await fetch(API_URL);
    const notes = await res.json();
    renderNotes(notes);
  } catch (err) {
    console.error('Error fetching notes:', err);
  }
}

function renderNotes(notes) {
  notesGrid.innerHTML = '';
  if (notes.length === 0) {
    notesGrid.innerHTML = '<p>No notes found. Create your first note above!</p>';
    return;
  }

  notes.forEach((note) => {
    const card = document.createElement('div');
    card.className = 'note-card';
    card.innerHTML = `
      <div>
        <h3>${escapeHTML(note.title)}</h3>
        <p>${escapeHTML(note.content)}</p>
      </div>
      <div class="card-actions">
        <button class="btn-edit" onclick="startEdit(${note.id}, '${escapeQuote(note.title)}', '${escapeQuote(note.content)}')">Edit</button>
        <button class="btn-delete" onclick="deleteNote(${note.id})">Delete</button>
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
  if (!confirm('Are you sure you want to delete this note?')) return;
  try {
    await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    fetchNotes();
  } catch (err) {
    console.error('Error deleting note:', err);
  }
}

function startEdit(id, title, content) {
  noteIdInput.value = id;
  titleInput.value = title;
  contentInput.value = content;
  formTitle.innerText = 'Edit Note';
  saveBtn.innerText = 'Update Note';
  cancelBtn.classList.remove('hidden');
}

function resetForm() {
  noteIdInput.value = '';
  titleInput.value = '';
  contentInput.value = '';
  formTitle.innerText = 'Create Note';
  saveBtn.innerText = 'Save Note';
  cancelBtn.classList.add('hidden');
}

function escapeHTML(str) {
  return str.replace(/[&<>'"]/g, 
    tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
  );
}

function escapeQuote(str) {
  return str.replace(/'/g, "\\'").replace(/"/g, '&quot;').replace(/\n/g, '\\n');
}
