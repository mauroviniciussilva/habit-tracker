import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';

import HomePage from '../views/HomePage.vue';
import AddHabit from '../views/AddHabit.vue';
import SettingsPage from '../views/SettingsPage.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: HomePage
  },
  {
    path: '/add-habit',
    name: 'AddHabit',
    component: AddHabit
  },
  {
    path: '/settings',
    name: 'SettingPage',
    component: SettingsPage
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
