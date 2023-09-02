<template>
  <div class="edit-note-view">
    <EditNote :id="noteId" />
  </div>
</template>

<script>
import EditNote from '@/components/EditNote.vue';

export default {
  components: {
    EditNote
  },
  computed: {
    noteId() {
      return this.$route.params.id;
    }
  }
};
</script>

<style scoped>
.edit-note-view {
  text-align: center;
}
</style>