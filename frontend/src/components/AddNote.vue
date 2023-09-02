<template>
  <nav>
    <router-link :to="'/'" class="note-app">Note App</router-link>
    <button type="submit" @click="addNote()" :disabled="isButtonDisabled">Save</button>
  </nav>
  <div class="form_wrap">
    <form @submit.prevent="addNote" id="noteForm">
      <input v-model="title" placeholder="Title" required @keydown="handleKeyDown" />
      <textarea ref="expandingTextarea" v-model="text" @input="autoExpand" placeholder="Text" required autofocus
        @keydown="handleKeyDown"></textarea>
    </form>
  </div>
</template>

<script>
import noteService from '@/services/noteService';

export default {
  data() {
    return {
      title: ``,
      text: ''
    };
  },
  methods: {
    async addNote() {
      if (this.text.length) {
        const titleToSave = this.title.length ? this.title : new Date().toLocaleString("ru-RU");
        const textToSave = this.text;
        const createNote = [titleToSave, textToSave];
        await noteService.addNote(createNote);
        this.$router.push('/');
      }
    },
    async autoExpand() {
      this.$refs.expandingTextarea.style.height = 'auto';
      this.$refs.expandingTextarea.style.height = this.$refs.expandingTextarea.scrollHeight + 'px';
    },
    async handleKeyDown(event) {
      if (event.ctrlKey && event.key === "Enter") {
        this.addNote();
      }
    },
  },
  computed: {
    isButtonDisabled() {
      return this.text.trim() === '';
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