// src/router/index.ts

import {
  createRouter,
  createWebHistory,
  type RouteRecordRaw,
} from 'vue-router'

/* ============================================================
 * LAYOUTS
 * ============================================================ */
import PublicLayout from '@/layouts/PublicLayout.vue'
import DashboardLayout from '@/layouts/DashboardLayout.vue'
import AdminLayout from '@/layouts/AdminLayout.vue'
import EmployerLayout from '@/layouts/EmployerLayout.vue'

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
import ForgotPasswordView from '@/views/auth/ForgotPassword.vue'
import ResetPasswordView from '@/views/auth/ResetPassword.vue'
import VerifyOTPView from '@/views/auth/VerifyOTP.vue'
import LoginMFAView from '@/views/auth/LoginMFA.vue'

/* ============================================================
 * ESPACE CANDIDAT
 * ============================================================ */
import CandidateDashboardView from '@/views/candidate/Dashboard.vue'
import CandidateProfileView from '@/views/candidate/Profile.vue'
import CandidateResumeView from '@/views/candidate/Resume.vue'
import CandidateApplicationsView from '@/views/candidate/Applications.vue'
import CandidateFavoritesView from '@/views/candidate/Favorites.vue'
import CandidateAlertsView from '@/views/candidate/Alerts.vue'
import CandidateSettingsView from '@/views/candidate/Settings.vue'

/* ============================================================
 * ESPACE EMPLOYEUR
 * ============================================================ */
import EmployerDashboardView from '@/views/employer/Dashboard.vue'
import EmployerCompanyView from '@/views/employer/Company.vue'
import EmployerNewJobView from '@/views/employer/NewJob.vue'
import EmployerJobsView from '@/views/employer/Jobs.vue'
import EmployerApplicationsView from '@/views/employer/Applications.vue'
import EmployerTalentsView from '@/views/employer/Talents.vue'
import EmployerSettingsView from '@/views/employer/Settings.vue'

/* ============================================================
 * ESPACE ADMIN
 * ============================================================ */
import AdminDashboardView from '@/views/admin/Dashboard.vue'
import AdminModerationView from '@/views/admin/Moderation.vue'
import AdminUsersView from '@/views/admin/Users.vue'
import AdminStatsView from '@/views/admin/Stats.vue'

/* ============================================================
 * STORE AUTH
 * ============================================================ */
import { useAuthStore } from '@/stores/auth'

/* ============================================================
 * TYPES
 * ============================================================ */
type UserRole = 'CANDIDATE' | 'EMPLOYER' | 'ADMIN' | 'SUPERADMIN'

type AppRouteMeta = {
  title?: string
  requiresAuth?: boolean
  guestOnly?: boolean
  public?: boolean
  role?: UserRole | UserRole[]
}

declare module 'vue-router' {
  interface RouteMeta extends AppRouteMeta {}
}

/* ============================================================
 * ROUTES
 * ============================================================ */
const routes: RouteRecordRaw[] = [
  /* SITE PUBLIC */
  {
    path: '/',
    component: PublicLayout,
    children: [
      {
        path: '',
        name: 'home',
        component: HomeView,
        meta: { title: 'Accueil', public: true },
      },
      {
        path: 'jobs',
        name: 'jobs',
        component: JobsView,
        meta: { title: "Offres d'emploi", public: true },
      },
      {
        path: 'jobs/:id',
        name: 'job-detail',
        component: JobDetailsView,
        meta: { title: "Détail de l'offre", public: true },
      },
      {
        path: 'about',
        name: 'about',
        component: AboutView,
        meta: { title: 'À propos', public: true },
      },
      {
        path: 'contact',
        name: 'contact',
        component: ContactView,
        meta: { title: 'Contact', public: true },
      },
      {
        path: 'faq',
        name: 'faq',
        component: FaqView,
        meta: { title: 'FAQ', public: true },
      },
    ],
  },

  /* CONNEXION */
  {
    path: '/login',
    name: 'login',
    component: LoginView,
    meta: { title: 'Connexion', guestOnly: true, public: true },
  },

  /* VÉRIFICATION 2FA */
  {
    path: '/login/mfa',
    name: 'login-mfa',
    component: LoginMFAView,
    meta: { title: 'Vérification 2FA', guestOnly: true, public: true },
  },

  /* INSCRIPTION */
  {
    path: '/register',
    name: 'register',
    component: RegisterView,
    meta: { title: 'Inscription', guestOnly: true, public: true },
  },

  /* VÉRIFICATION OTP */
  {
    path: '/verify-otp',
    name: 'verify-otp',
    component: VerifyOTPView,
    meta: { title: 'Vérification du compte', guestOnly: true, public: true },
  },

  /* MOT DE PASSE OUBLIÉ */
  {
    path: '/forgot-password',
    name: 'forgot-password',
    component: ForgotPasswordView,
    meta: { title: 'Mot de passe oublié', guestOnly: true, public: true },
  },

  /* RÉINITIALISATION MOT DE PASSE */
  {
    path: '/reset-password',
    name: 'reset-password',
    component: ResetPasswordView,
    meta: { title: 'Réinitialiser le mot de passe', guestOnly: true, public: true },
  },

  /* ESPACE CANDIDAT */
  {
    path: '/candidate',
    component: DashboardLayout,
    meta: {
      requiresAuth: true,
      role: 'CANDIDATE',
    },
    children: [
      { path: '', redirect: { name: 'candidate-dashboard' } },
      { path: 'dashboard', name: 'candidate-dashboard', component: CandidateDashboardView, meta: { title: 'Tableau de bord' } },
      { path: 'profile', name: 'candidate-profile', component: CandidateProfileView, meta: { title: 'Mon profil' } },
      { path: 'resume', name: 'candidate-resume', component: CandidateResumeView, meta: { title: 'Mon CV' } },
      { path: 'applications', name: 'candidate-applications', component: CandidateApplicationsView, meta: { title: 'Mes candidatures' } },
      { path: 'favorites', name: 'candidate-favorites', component: CandidateFavoritesView, meta: { title: 'Mes favoris' } },
      { path: 'alerts', name: 'candidate-alerts', component: CandidateAlertsView, meta: { title: 'Alertes emploi' } },
      { path: 'settings', name: 'candidate-settings', component: CandidateSettingsView, meta: { title: 'Paramètres' } },
    ],
  },

  /* ESPACE EMPLOYEUR */
  {
    path: '/employer',
    component: EmployerLayout,
    meta: {
      requiresAuth: true,
      role: 'EMPLOYER',
    },
    children: [
      { path: '', redirect: { name: 'employer-dashboard' } },
      { path: 'dashboard', name: 'employer-dashboard', component: EmployerDashboardView, meta: { title: 'Tableau de bord employeur' } },
      { path: 'company', name: 'employer-company', component: EmployerCompanyView, meta: { title: 'Profil entreprise' } },
      { path: 'jobs/new', name: 'employer-new-job', component: EmployerNewJobView, meta: { title: 'Publier une offre' } },
      { path: 'jobs', name: 'employer-jobs', component: EmployerJobsView, meta: { title: 'Mes offres' } },
      { path: 'applications', name: 'employer-applications', component: EmployerApplicationsView, meta: { title: 'Candidatures reçues' } },
      { path: 'talents', name: 'employer-talents', component: EmployerTalentsView, meta: { title: 'Recherche de talents' } },
      { path: 'settings', name: 'employer-settings', component: EmployerSettingsView, meta: { title: 'Paramètres' } },
    ],
  },

  /* ESPACE ADMINISTRATEUR */
  {
    path: '/admin',
    component: AdminLayout,
    meta: {
      requiresAuth: true,
      role: ['ADMIN', 'SUPERADMIN'],
    },
    children: [
      { path: '', redirect: { name: 'admin-dashboard' } },
      { path: 'dashboard', name: 'admin-dashboard', component: AdminDashboardView, meta: { title: 'Tableau de bord admin' } },
      { path: 'moderation', name: 'admin-moderation', component: AdminModerationView, meta: { title: 'Modération des offres' } },
      { path: 'users', name: 'admin-users', component: AdminUsersView, meta: { title: 'Gestion des utilisateurs' } },
      { path: 'stats', name: 'admin-stats', component: AdminStatsView, meta: { title: 'Statistiques' } },
    ],
  },

  /* PAGE 404 */
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: NotFoundView,
    meta: { title: 'Page introuvable', public: true },
  },
]

/* ============================================================
 * CRÉATION DU ROUTEUR
 * ============================================================ */
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(_to, _from, savedPosition) {
    if (savedPosition) return savedPosition
    return { top: 0, behavior: 'smooth' }
  },
})

/* ============================================================
 * ROUTES DE DESTINATION SELON LE RÔLE
 * ============================================================ */
function getDashboardForRole(role: string | null): { name: string } {
  switch (role) {
    case 'CANDIDATE':
      return { name: 'candidate-dashboard' }
    case 'EMPLOYER':
      return { name: 'employer-dashboard' }
    case 'ADMIN':
    case 'SUPERADMIN':
      return { name: 'admin-dashboard' }
    default:
      return { name: 'home' }
  }
}

/* ============================================================
 * GARDE DE NAVIGATION
 * ============================================================ */
router.beforeEach(async (to) => {
  const authStore = useAuthStore()

  // 1. Charger l'utilisateur si ce n'est pas déjà fait
  if (!authStore.isReady) {
    await authStore.fetchMe()
  }

  // 2. Déterminer si la page est publique (accessible à tous)
  const isPublic = to.meta.public === true

  // 3. Si on n'est PAS connecté et que la page est protégée
  if (!authStore.isAuthenticated && !isPublic) {
    return {
      name: 'login',
      query: { redirect: to.fullPath },
    }
  }

  // 4. Si on est connecté et qu'on essaie d'aller sur une page publique (ex: login, register)
  if (authStore.isAuthenticated && to.meta.guestOnly) {
    return getDashboardForRole(authStore.role)
  }

  // 5. Vérification du rôle (si la page est protégée)
  if (to.meta.requiresAuth && authStore.isAuthenticated) {
    const allowedRoles = Array.isArray(to.meta.role)
      ? to.meta.role
      : [to.meta.role]

    // Si un rôle est requis et que l'utilisateur n'a pas le bon rôle
    if (
      to.meta.role &&
      (!authStore.role || !allowedRoles.includes(authStore.role as UserRole))
    ) {
      return getDashboardForRole(authStore.role)
    }
  }

  return true
})

/* ============================================================
 * TITRE DE PAGE
 * ============================================================ */
router.afterEach((to) => {
  const baseTitle = 'PHOENIX Jobs & Carrières'
  document.title = to.meta.title
    ? `${String(to.meta.title)} | ${baseTitle}`
    : baseTitle
})

export default router