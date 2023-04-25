import { createRouter, createWebHistory } from 'vue-router'
import { Root } from '@/views/root'
import { TestInfoPane } from '@/views/test-info-pane'

const baseUrl = import.meta.env.BASE_URL

export const routes = createRouter({
  history: createWebHistory(baseUrl),
  routes: [
    {
      path: '/',
      name: 'root',
      component: Root
    },
    {
      path: '/test',
      name: 'test',
      component: TestInfoPane
    }
  ]
})
