
import { createRouter, createWebHistory } from 'vue-router'

/* ============================================================
 * LAYOUTS
 * ============================================================ */
import PublicLayout from '@/layouts/PublicLayout.vue'
import DashboardLayout from '@/layouts/DashboardLayout.vue'
import AdminLayout from '@/layouts/AdminLayout.vue'

/* ============================================================
 * VUES PUBLIQUES
 * ============================================================ */
import HomeView from '@/views/Home.vue'
import JobsView from '@/views/Jobs.vue'
import JobDetailsView from '@/views/JobDetail.vue'
import AboutView from '@/views/About.vue'
import ContactView from '@/views/Contact.vue'
import FaqView from '@/views/Faq.vue'
import NotFoundView from '@/views/NotFound.vue'

/* ============================================================
 * AUTHENTIFICATION
 * ============================================================ */
import LoginView from '@/views/Login.vue'
import RegisterView from '@/views/Register.vue'

/* ============================================================
 * ROUTES
 * ============================================================ */
const routes = [
  /* -------------------- SITE PUBLIC -------------------- */
  {
    path: '/',
    component: PublicLayout,
    children: [
      {
        path: '',
        name: 'home',
        component: HomeView,
        meta: { title: 'Accueil' },
      },
      {
        path: 'jobs',
        name: 'jobs',
        component: JobsView,
        meta: { title: "Offres d'emploi" },
      },
      {
        path: 'jobs/:id',
        name: 'job-detail',
        component: JobDetailsView,
        meta: { title: "Détail de l'offre" },
      },
      {
        path: 'about',
        name: 'about',
        component: AboutView,
        meta: { title: 'À propos' },
      },
      {
        path: 'contact',
        name: 'contact',
        component: ContactView,
        meta: { title: 'Contact' },
      },
      {
        path: 'faq',
        name: 'faq',
        component: FaqView,
        meta: { title: 'FAQ' },
      },
    ],
  },

  /* -------------------- CONNEXION -------------------- */
  {
    path: '/login',
    name: 'login',
    component: LoginView,
    meta: {
      title: 'Connexion',
      guestOnly: true,
    },
  },

  /* -------------------- INSCRIPTION -------------------- */
  {
    path: '/register',
    name: 'register',
    component: RegisterView,
    meta: {
      title: 'Inscription',
      guestOnly: true,
    },
  },

  /* -------------------- ESPACE CANDIDAT -------------------- */
  {
    path: '/candidate',
    component: DashboardLayout,
    meta: {
      requiresAuth: true,
      role: 'candidate',
    },
    children: [
      // Ajoute ici les pages du candidat.
      // Exemple :
      // {
      //   path: '',
      //   name: 'candidate-dashboard',
      //   component: CandidateDashboardView,
      //   meta: { title: 'Mon espace candidat' },
      // },
    ],
  },

  /* -------------------- ESPACE EMPLOYEUR -------------------- */
  {
    path: '/employer',
    component: DashboardLayout,
    meta: {
      requiresAuth: true,
      role: 'employer',
    },
    children: [
      // Ajoute ici les pages de l'employeur.
      // Exemple :
      // {
      //   path: '',
      //   name: 'employer-dashboard',
      //   component: EmployerDashboardView,
      //   meta: { title: 'Espace employeur' },
      // },
    ],
  },

  /* -------------------- ESPACE ADMINISTRATEUR -------------------- */
  {
    path: '/admin',
    component: AdminLayout,
    meta: {
      requiresAuth: true,
      role: 'admin',
    },
    children: [
      // Ajoute ici les pages d'administration.
      // Exemple :
      // {
      //   path: '',
      //   name: 'admin-dashboard',
      //   component: AdminDashboardView,
      //   meta: { title: 'Administration' },
      // },
    ],
  },

  /* -------------------- PAGE 404 -------------------- */
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: NotFoundView,
    meta: {
      title: 'Page introuvable',
    },
  },
]

/* ============================================================
 * CRÉATION DU ROUTEUR
 * ============================================================ */
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,

  scrollBehavior(_to, _from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }

    return {
      top: 0,
      behavior: 'smooth',
    }
  },
})

/* ============================================================
 * GUARD : TITRE DES PAGES
 * ============================================================ */
router.beforeEach((to) => {
  const baseTitle = 'PHENIX Jobs & Carrières'

  document.title = to.meta.title
    ? `${String(to.meta.title)} | ${baseTitle}`
    : baseTitle
})

export default router

