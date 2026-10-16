import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export interface CandidateUser {
  id: string
  fullName: string
  email: string
  phone: string
  title: string
  bio: string
  location: string
  avatar: string
  profileCompletion: number
  joinedAt: string
}

export interface Application {
  id: number
  jobId: number
  jobTitle: string
  company: string
  companyLogo: string
  location: string
  contract: string
  salary: string
  status: 'pending' | 'reviewing' | 'interview' | 'accepted' | 'rejected'
  appliedAt: string
}

export interface Favorite {
  id: number
  jobId: number
  jobTitle: string
  company: string
  companyLogo: string
  location: string
  contract: string
  salary: string
  addedAt: string
}

export interface JobAlert {
  id: number
  keywords: string
  location: string
  category: string
  frequency: 'daily' | 'weekly' | 'instant'
  active: boolean
  createdAt: string
}

// ⚠️ MOCK — à remplacer par des appels API
import userAvatar from '@/assets/images/avatar.jpg'
import orangeLogo from '@/assets/images/orange.png'
import mtnLogo from '@/assets/images/mtn.png'
import sanlamLogo from '@/assets/images/sanlam.jpg'

export const useCandidateStore = defineStore('candidate', () => {
  const user = ref<CandidateUser>({
    id: 'u_001',
    fullName: 'Kouassi Yao',
    email: 'kouassi.yao@example.com',
    phone: '+225 07 00 00 00 00',
    title: 'Développeur Full Stack',
    bio: "Passionné par le développement web moderne, je recherche des opportunités stimulantes en Côte d'Ivoire.",
    location: 'Abidjan, Côte d’Ivoire',
    avatar: userAvatar,
    profileCompletion: 72,
    joinedAt: 'Membre depuis Janvier 2025',
  })

  const applications = ref<Application[]>([
    {
      id: 1,
      jobId: 1,
      jobTitle: 'Développeur Full Stack',
      company: "Orange Côte d'Ivoire",
      companyLogo: orangeLogo,
      location: 'Abidjan',
      contract: 'CDI',
      salary: '500 000 - 1 000 000 FCFA',
      status: 'interview',
      appliedAt: 'Il y a 3 jours',
    },
    {
      id: 2,
      jobId: 5,
      jobTitle: 'Chef de Projet Digital',
      company: "MTN Côte d'Ivoire",
      companyLogo: mtnLogo,
      location: 'Abidjan',
      contract: 'CDD',
      salary: '700 000 - 1 300 000 FCFA',
      status: 'reviewing',
      appliedAt: 'Il y a 5 jours',
    },
    {
      id: 3,
      jobId: 6,
      jobTitle: 'Analyste Financier',
      company: 'Ecobank CI',
      companyLogo: sanlamLogo,
      location: 'Abidjan',
      contract: 'CDI',
      salary: '500 000 - 900 000 FCFA',
      status: 'pending',
      appliedAt: 'Il y a 1 semaine',
    },
    {
      id: 4,
      jobId: 2,
      jobTitle: 'Conseiller Commercial',
      company: 'Sanlam Vie CI',
      companyLogo: sanlamLogo,
      location: 'Abidjan',
      contract: 'CDI',
      salary: '300 000 - 600 000 FCFA',
      status: 'rejected',
      appliedAt: 'Il y a 2 semaines',
    },
  ])

  const favorites = ref<Favorite[]>([
    {
      id: 1,
      jobId: 7,
      jobTitle: 'Data Analyst',
      company: "MTN Côte d'Ivoire",
      companyLogo: mtnLogo,
      location: 'Abidjan',
      contract: 'CDI',
      salary: '600 000 - 1 100 000 FCFA',
      addedAt: 'Il y a 2 jours',
    },
    {
      id: 2,
      jobId: 3,
      jobTitle: 'Responsable Qualité',
      company: "Nestlé Côte d'Ivoire",
      companyLogo: sanlamLogo,
      location: 'Yopougon',
      contract: 'CDI',
      salary: '400 000 - 800 000 FCFA',
      addedAt: 'Il y a 4 jours',
    },
  ])

  const alerts = ref<JobAlert[]>([
    {
      id: 1,
      keywords: 'Développeur Vue.js',
      location: 'Abidjan',
      category: 'Informatique & Télécoms',
      frequency: 'daily',
      active: true,
      createdAt: 'Créée il y a 1 semaine',
    },
    {
      id: 2,
      keywords: 'Product Manager',
      location: 'Toute la Côte d’Ivoire',
      category: 'Services & Conseil',
      frequency: 'weekly',
      active: false,
      createdAt: 'Créée il y a 3 semaines',
    },
  ])

  const applicationsCount = computed(
    () => applications.value.filter((a) => a.status !== 'rejected').length,
  )
  const favoritesCount = computed(() => favorites.value.length)
  const alertsCount = computed(() => alerts.value.filter((a) => a.active).length)

  const stats = computed(() => ({
    applications: applications.value.length,
    pending: applications.value.filter((a) => a.status === 'pending').length,
    interview: applications.value.filter((a) => a.status === 'interview').length,
    favorites: favorites.value.length,
    activeAlerts: alerts.value.filter((a) => a.active).length,
    views: 47,
  }))

  const logout = () => {
    user.value = null as any
    applications.value = []
    favorites.value = []
    alerts.value = []
  }

  return {
    user,
    applications,
    favorites,
    alerts,
    applicationsCount,
    favoritesCount,
    alertsCount,
    stats,
    logout,
  }
})