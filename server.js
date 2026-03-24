const express = require("express");
const cors = require("cors");
const sqlite3 = require("sqlite3").verbose();

const app = express();
app.use(cors());
app.use(express.json());

const db = new sqlite3.Database("./notes.db");

// Create table if it doesn't exist
db.run(`
  CREATE TABLE IF NOT EXISTS notes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    text TEXT
  )
`);

// GET notes
app.get("/api/notes", (req, res) => {
  db.all("SELECT * FROM notes", [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

// ADD note
app.post("/api/notes", (req, res) => {
  const { text } = req.body;

  db.run("INSERT INTO notes(text) VALUES(?)", [text], function (err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }

    res.json({
      id: this.lastID,
      text
    });
  });
});

// DELETE note
app.delete("/api/notes/:id", (req, res) => {
  db.run("DELETE FROM notes WHERE id = ?", req.params.id, function (err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }

    res.json({ message: "Note deleted" });
  });
});

app.listen(3001, () => {
  console.log("Server running on port 3001");
});