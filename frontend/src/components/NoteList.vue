<template>
  <div class="main-page">
    <nav>
      <h1 class="note-app">Note App</h1>
      <router-link to="/add" class="add-button">Add Note</router-link>
    </nav>
    <div class="note-grid">
      <div v-for="note in notes" :key="note.id" class="note-card">
        <h2>
          <router-link :to="'/edit/' + note._id" class="edit-button">{{ note.title }}</router-link>
          <button @click="deleteNote(note._id)" class="delete-button">Delete</button>
        </h2>
        <pre>
          <router-link :to="'/edit/' + note._id" class="edit-button">{{ note.text }}</router-link>
        </pre>
      </div>
      <div class="empthy-card" v-if="!notes.length">no notes</div>
    </div>
  </div>
</template>
  
<script>
import noteService from '@/services/noteService';

export default {
  data() {
    return {
      notes: [],
    };
  },
  async mounted() {
    await this.fetchNotes();
  },
  methods: {
    async fetchNotes() {
      const response = await noteService.getAllNotes();
      this.notes = response.data ? response.data : [];
    },
    async deleteNote(noteId) {
      await noteService.deleteNote(noteId);
      await this.fetchNotes();
    }
  }
};
</script>
  
<style scoped>
nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  position: sticky;
  top: 0;
  background-color: #202021;
}

.note-app {
  color: #dbdddf;
  font-size: 1.5em;
  font-weight: 700;
  text-decoration: none;
  text-align: center;
}

.add-button {
  display: inline-block;
  padding: 10px 20px;
  background-color: #29292b;
  color: #dbdddf;
  text-decoration: none;
  border: none;
  font-weight: bold;
  font-size: 16px;
  border-radius: 4px;
  transition: .2s;
  cursor: pointer;
}

.add-button:hover {
  color: #29292b;
  background-color: #dbdddf;
}

.note-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 15px;
  padding: 20px;
}

.note-card {
  padding: 20px;
  background-color: #29292b;
  border-radius: 7px;
  min-height: 130px;
  max-height: 400px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.note-card h2 {
  display: flex;
  justify-content: space-between;
  margin: 0 0 25px 0;
  white-space: nowrap;
}

.note-card pre {
  height: 100%;
  display: flex;
  overflow: hidden;
  white-space: pre-wrap;
}

.note-card pre a {
  text-align: left;
  width: 100%;
  display: flex;
}

.edit-button {
  color: #dbdddf;
  text-decoration: none;
  overflow: hidden;
  text-overflow: ellipsis;
  display: block;
}

.delete-button {
  color: #d7d7e0;
  border: 1px solid #9d9d9f;
  background-color: transparent;
  cursor: pointer;
  transition: .2s;
  padding: 5px;
  margin: 0 0 0 20px;
}

.delete-button:hover {
  background-color: #dc3545;
  border: 1px solid #dc3545;
}

.empthy-card {
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #dbdddf;
  font-size: 1.3em;
  font-weight: 700;
  text-decoration: none;
  text-align: center;
}
</style>