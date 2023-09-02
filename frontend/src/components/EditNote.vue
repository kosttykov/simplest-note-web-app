<template>
  <nav>
    <router-link :to="'/'" class="note-app">Note App</router-link>
    <button type="submit" @click="updateNote()" :disabled="isButtonDisabled">Save</button>
  </nav>
  <div class="form_wrap">
    <form @submit.prevent="updateNote" id="noteForm">
      <input v-model="title" placeholder="Title" required @keydown="handleKeyDown" />
      <span class="date">{{ this.date }}</span>
      <textarea ref="expandingTextarea" v-model="text" @input="autoExpand" placeholder="Text" required
        @keydown="handleKeyDown"></textarea>
    </form>
  </div>
</template>
  
<script>
import noteService from '@/services/noteService';

export default {
  props: ['id'],
  data() {
    return {
      title: '',
      text: '',
      date: '',
    };
  },
  async mounted() {
    await this.fetchNoteData();
    this.autoExpand();
  },
  methods: {
    async fetchNoteData() {
      try {
        const response = await noteService.getNoteById(this.id);
        const note = response.data;
        const localDate = new Date(note[0].date);
        const localFormat = localDate.toLocaleString("ru-RU");
        this.date = localFormat;
        this.title = note[0].title;
        this.text = note[0].text;
        this.old_title = note[0].title;
        this.old_text = note[0].text;
      } catch (error) {
        console.error('Error fetching note data:', error);
      }
    },
    async updateNote() {
      try {
        const updatedNote = [this.title, this.text];
        await noteService.updateNoteById(this.id, updatedNote);
        this.$router.push('/');
      } catch (error) {
        console.error('Error updating note:', error);
      }
    },
    async autoExpand() {
      this.$refs.expandingTextarea.style.height = 'auto';
      this.$refs.expandingTextarea.style.height = this.$refs.expandingTextarea.scrollHeight + 'px';
    },
    async handleKeyDown(event) {
      if (event.ctrlKey && event.key === "Enter") {
        this.updateNote();
      }
    },
  },
  computed: {
    isButtonDisabled() {
      return this.title.trim() === '' || this.text.trim() === '' || (this.text === this.old_text && this.title === this.old_title);
    },
  },
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
  width: 100%;
  background-color: #202021;
}

.note-app {
  color: #dbdddf;
  font-size: 1.5em;
  font-weight: 700;
  text-decoration: none;
  text-align: center;
}

.form_wrap {
  width: 100%;
  min-height: 300px;
  display: flex;
  justify-content: center;
  padding-bottom: 50px;
}

form {
  display: flex;
  flex-direction: column;
  align-items: start;
  width: 70%;
}

input {
  margin: 50px 0;
  height: 40px;
  width: 100%;
  background-color: transparent;
  font-size: 32px;
  font-weight: 700;
  color: #dbdddf;
}

.date {
  font-size: 13px;
  font-weight: 700;
  position: relative;
  top: -50px;
  color: #6a6a6a;
}

textarea {
  padding: 0 0 30px 0;
  width: 100%;
  font-size: 16px;
  color: #dbdddf;
  background-color: transparent;
  resize: none;
  overflow: hidden;
}

button {
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

button:hover {
  color: #29292b;
  background-color: #dbdddf;
}

button:disabled {
  background-color: #202021;
  color: #6a6a6a;
  cursor: not-allowed;
}

@media (max-width: 425px) {
  form {
    width: 90%;
  }
}
</style>