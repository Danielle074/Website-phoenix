import { createRouter, createWebHistory } from 'vue-router'

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
 * ROUTES
 * ============================================================ */
const routes = [
  /* -------------------- SITE PUBLIC -------------------- */
  {
    path: '/',
    component: PublicLayout,
    children: [
      { path: '', name: 'home', component: HomeView, meta: { title: 'Accueil' } },
      { path: 'jobs', name: 'jobs', component: JobsView, meta: { title: "Offres d'emploi" } },
      { path: 'jobs/:id', name: 'job-detail', component: JobDetailsView, meta: { title: "Détail de l'offre" } },
      { path: 'about', name: 'about', component: AboutView, meta: { title: 'À propos' } },
      { path: 'contact', name: 'contact', component: ContactView, meta: { title: 'Contact' } },
      { path: 'faq', name: 'faq', component: FaqView, meta: { title: 'FAQ' } },
    ],
  },

  /* -------------------- CONNEXION -------------------- */
  {
    path: '/login',
    name: 'login',
    component: LoginView,
    meta: { title: 'Connexion', guestOnly: true },
  },

  /* -------------------- VÉRIFICATION 2FA -------------------- */
  {
    path: '/login/mfa',
    name: 'login-mfa',
    component: LoginMFAView,
    meta: { title: 'Vérification 2FA', guestOnly: true },
  },

  /* -------------------- INSCRIPTION -------------------- */
  {
    path: '/register',
    name: 'register',
    component: RegisterView,
    meta: { title: 'Inscription', guestOnly: true },
  },

  /* -------------------- VÉRIFICATION OTP -------------------- */
  {
    path: '/verify-otp',
    name: 'verify-otp',
    component: VerifyOTPView,
    meta: { title: 'Vérification du compte', guestOnly: true },
  },

  /* -------------------- MOT DE PASSE OUBLIÉ -------------------- */
  {
    path: '/forgot-password',
    name: 'forgot-password',
    component: ForgotPasswordView,
    meta: { title: 'Mot de passe oublié', guestOnly: true },
  },

  /* -------------------- RÉINITIALISATION MOT DE PASSE -------------------- */
  {
    path: '/reset-password',
    name: 'reset-password',
    component: ResetPasswordView,
    meta: { title: 'Réinitialiser le mot de passe', guestOnly: true },
  },

  /* -------------------- ESPACE CANDIDAT -------------------- */
  {
    path: '/candidate',
    component: DashboardLayout,
    meta: { requiresAuth: true, role: 'CANDIDATE' },
    children: [
      { path: '', redirect: '/candidate/dashboard' },
      { path: 'dashboard', name: 'candidate-dashboard', component: CandidateDashboardView, meta: { title: 'Tableau de bord' } },
      { path: 'profile', name: 'candidate-profile', component: CandidateProfileView, meta: { title: 'Mon profil' } },
      { path: 'resume', name: 'candidate-resume', component: CandidateResumeView, meta: { title: 'Mon CV' } },
      { path: 'applications', name: 'candidate-applications', component: CandidateApplicationsView, meta: { title: 'Mes candidatures' } },
      { path: 'favorites', name: 'candidate-favorites', component: CandidateFavoritesView, meta: { title: 'Mes favoris' } },
      { path: 'alerts', name: 'candidate-alerts', component: CandidateAlertsView, meta: { title: 'Alertes emploi' } },
      { path: 'settings', name: 'candidate-settings', component: CandidateSettingsView, meta: { title: 'Paramètres' } },
    ],
  },

  /* -------------------- ESPACE EMPLOYEUR -------------------- */
  {
    path: '/employer',
    component: EmployerLayout,
    meta: { requiresAuth: true, role: 'EMPLOYER' },
    children: [
      { path: '', redirect: '/employer/dashboard' },
      { path: 'dashboard', name: 'employer-dashboard', component: EmployerDashboardView, meta: { title: 'Tableau de bord employeur' } },
      { path: 'company', name: 'employer-company', component: EmployerCompanyView, meta: { title: 'Profil entreprise' } },
      { path: 'jobs/new', name: 'employer-new-job', component: EmployerNewJobView, meta: { title: 'Publier une offre' } },
      { path: 'jobs', name: 'employer-jobs', component: EmployerJobsView, meta: { title: 'Mes offres' } },
      { path: 'applications', name: 'employer-applications', component: EmployerApplicationsView, meta: { title: 'Candidatures reçues' } },
      { path: 'talents', name: 'employer-talents', component: EmployerTalentsView, meta: { title: 'Recherche de talents' } },
      { path: 'settings', name: 'employer-settings', component: EmployerSettingsView, meta: { title: 'Paramètres' } },
    ],
  },

  /* -------------------- ESPACE ADMINISTRATEUR -------------------- */
  {
    path: '/admin',
    component: AdminLayout,
    meta: { requiresAuth: true, role: ['ADMIN', 'SUPERADMIN'] },
    children: [
      { path: '', redirect: '/admin/dashboard' },
      { path: 'dashboard', name: 'admin-dashboard', component: AdminDashboardView, meta: { title: 'Tableau de bord admin' } },
      { path: 'moderation', name: 'admin-moderation', component: AdminModerationView, meta: { title: 'Modération des offres' } },
      { path: 'users', name: 'admin-users', component: AdminUsersView, meta: { title: 'Gestion des utilisateurs' } },
      { path: 'stats', name: 'admin-stats', component: AdminStatsView, meta: { title: 'Statistiques' } },
    ],
  },

  /* -------------------- PAGE 404 -------------------- */
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: NotFoundView,
    meta: { title: 'Page introuvable' },
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
 * GUARD UNIFIÉ : TITRE + AUTH + RÔLE
 * ============================================================ */
router.beforeEach(async (to) => {
  const authStore = useAuthStore()

  // 1. Attendre que l'auth soit prête (surtout à F5 sur une URL protégée)
  if (!authStore.isReady) {
    await authStore.fetchMe()
  }

  // 2. Route protégée mais non connecté → /login
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    return { name: 'login', query: { redirect: to.fullPath } }
  }

  // 3. Route invité (login, register...) mais déjà connecté → dashboard selon rôle
  if (to.meta.guestOnly && authStore.isAuthenticated) {
    return { name: getDashboardForRole(authStore.role) }
  }

  // 4. Vérification du rôle (peut être un string OU un tableau de strings)
  if (to.meta.role && authStore.isAuthenticated) {
    const allowed = Array.isArray(to.meta.role) ? to.meta.role : [to.meta.role]
    if (!allowed.includes(authStore.role as string)) {
      return { name: getDashboardForRole(authStore.role) }
    }
  }

  // 5. Titre de la page (fait ici, à la fin, pour ne pas bloquer sur les redirections)
  const baseTitle = 'PHOENIX Jobs & Carrières'
  document.title = to.meta.title
    ? `${String(to.meta.title)} | ${baseTitle}`
    : baseTitle

  return true
})

/* ============================================================
 * HELPER : dashboard selon le rôle
 * ============================================================ */
function getDashboardForRole(role: string | null): string {
  switch (role) {
    case 'CANDIDATE':
      return 'candidate-dashboard'
    case 'EMPLOYER':
      return 'employer-dashboard'
    case 'ADMIN':
    case 'SUPERADMIN':
      return 'admin-dashboard'
    default:
      return 'home'
  }
}

export default router