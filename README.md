# Cloud-Notes-App
## ☁️ Whispers in the Cloud 
---
A lightweight, full-stack notes application featuring an aesthetic diary-like user interface, a RESTful Node.js backend, and persistent local storage with SQLite. Configured for easy deployment on AWS EC2.

## 🎨 Features
* **Journal UI:** Styled after lined paper and leather-bound journals, featuring warm sepia tones and elegant typography.
* **Full CRUD Functionality:**
  * **Create:** Write new notes/journal entries.
  * **Read:** Display all stored notes ordered by date.
  * **Update:** Edit existing entries inline.
  * **Delete:** Remove unwanted notes.
* **Responsive Layout:** Works seamlessly across mobile, tablet, and desktop devices.
* **Zero-Config Database:** Embedded SQLite database running natively within Node.js.
* **Production-Ready:** Configured for background execution using PM2 on cloud servers like AWS EC2.

---
## 📁 Project Structure

```text
cloud-notes-app/
├── package.json        # Backend dependencies and scripts
├── server.js          # Express backend API & static routing
├── database.js        # SQLite database connection & schema initialization
├── README.md          # Documentation
└── public/
    ├── index.html     # Main HTML entry point
    ├── style.css      # Custom journal/paper styling
    └── app.js         # Client-side DOM manipulation & API requests


---

## ✍️ Author

Made with ❤️ by **Avanthika** for **CodeChef VITC**.
