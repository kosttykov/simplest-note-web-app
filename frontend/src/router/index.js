import { createRouter, createWebHistory } from 'vue-router';
import NoteList from '@/views/NoteList.vue';
import AddNote from '@/views/AddNote.vue';
import EditNote from '@/views/EditNote.vue';
import NotFound from '@/views/NotFound';

const routes = [
  {
    path: '/',
    component: NoteList
  },
  {
    path: '/add',
    component: AddNote
  },
  {
    path: '/edit/:id',
    component: EditNote,
    props: true
  },
  {
    path: '/:catchAll(.*)',
    name: 'Not Found',
    component: NotFound
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;