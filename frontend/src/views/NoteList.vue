<template>
  <div>
    <NoteList :notes="notes" />
  </div>
</template>
  
<script>
import NoteList from '@/components/NoteList.vue';
import noteService from '@/services/noteService';

export default {
  components: {
    NoteList
  },
  data() {
    return {
      notes: []
    };
  },
  async mounted() {
    const response = await noteService.getAllNotes();
    this.notes = response.data;
  }
};
</script>
  