import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export interface AdminUser {
  id: string
  fullName: string
  email: string
  avatar: string
  role: 'super-admin' | 'moderator'
}

export interface PendingJob {
  id: number
  title: string
  company: string
  companyLogo: string
  location: string
  contract: string
  category: string
  salary: string
  submittedBy: string
  submittedAt: string
  status: 'pending' | 'approved' | 'rejected'
  flagged: boolean
  reason?: string
}

export interface PlatformUser {
  id: number
  fullName: string
  email: string
  avatar: string
  role: 'candidate' | 'employer' | 'admin'
  status: 'active' | 'suspended' | 'banned'
  location: string
  joinedAt: string
  lastActive: string
  jobsPosted?: number
  applicationsSent?: number
}

export interface StatPoint {
  label: string
  value: number
  change: number
}

// ⚠️ MOCK
import adminAvatar from '@/assets/images/avatar.jpg'
import orangeLogo from '@/assets/images/orange.png'
import sanlamLogo from '@/assets/images/sanlam.jpg'
import nestleLogo from '@/assets/images/nestle.png'
import mtnLogo from '@/assets/images/mtn.png'
import sodeciLogo from '@/assets/images/sodeci.png'
import ecobankLogo from '@/assets/images/ecobank.jpg'
import candidate1 from '@/assets/images/feature-1.jpg'
import candidate2 from '@/assets/images/feature-2.jpg'
import candidate3 from '@/assets/images/feature-3.jpg'

export const useAdminStore = defineStore('admin', () => {
  const user = ref<AdminUser>({
    id: 'a_001',
    fullName: 'Administrateur PHOENIX',
    email: 'admin@phoenixjobs.ci',
    avatar: adminAvatar,
    role: 'super-admin',
  })

  const pendingJobs = ref<PendingJob[]>([
    {
      id: 101,
      title: 'Développeur Mobile Flutter',
      company: 'Tech Startup CI',
      companyLogo: orangeLogo,
      location: 'Abidjan',
      contract: 'CDI',
      category: 'Informatique & Télécoms',
      salary: '450 000 - 900 000 FCFA',
      submittedBy: 'recrutement@techstartup.ci',
      submittedAt: 'Il y a 2 heures',
      status: 'pending',
      flagged: false,
    },
    {
      id: 102,
      title: 'Agent Commercial Terrain',
      company: 'FastMoney SARL',
      companyLogo: sanlamLogo,
      location: 'Bouaké',
      contract: 'CDD',
      category: 'Commerce & Vente',
      salary: '200 000 - 400 000 FCFA',
      submittedBy: 'contact@fastmoney.ci',
      submittedAt: 'Il y a 5 heures',
      status: 'pending',
      flagged: true,
      reason: 'Contenu potentiellement frauduleux',
    },
    {
      id: 103,
      title: 'Responsable Marketing',
      company: 'Nestlé CI',
      companyLogo: nestleLogo,
      location: 'Abidjan',
      contract: 'CDI',
      category: 'Commerce & Vente',
      salary: '600 000 - 1 200 000 FCFA',
      submittedBy: 'rh@nestle.ci',
      submittedAt: 'Il y a 1 jour',
      status: 'pending',
      flagged: false,
    },
    {
      id: 104,
      title: 'Ingénieur DevOps',
      company: 'MTN CI',
      companyLogo: mtnLogo,
      location: 'Abidjan',
      contract: 'CDI',
      category: 'Informatique & Télécoms',
      salary: '800 000 - 1 500 000 FCFA',
      submittedBy: 'talent@mtn.ci',
      submittedAt: 'Il y a 1 jour',
      status: 'pending',
      flagged: false,
    },
    {
      id: 105,
      title: 'Technicien Réseau',
      company: 'SODECI',
      companyLogo: sodeciLogo,
      location: 'Yamoussoukro',
      contract: 'CDI',
      category: 'Industrie & Production',
      salary: '300 000 - 500 000 FCFA',
      submittedBy: 'recrutement@sodeci.ci',
      submittedAt: 'Il y a 2 jours',
      status: 'pending',
      flagged: false,
    },
  ])

  const users = ref<PlatformUser[]>([
    {
      id: 1,
      fullName: 'Kouassi Yao',
      email: 'kouassi.yao@example.com',
      avatar: candidate1,
      role: 'candidate',
      status: 'active',
      location: 'Abidjan',
      joinedAt: 'Il y a 3 mois',
      lastActive: 'Il y a 2 heures',
      applicationsSent: 12,
    },
    {
      id: 2,
      fullName: 'Aïcha Traoré',
      email: 'aicha.traore@example.com',
      avatar: candidate2,
      role: 'candidate',
      status: 'active',
      location: 'Abidjan',
      joinedAt: 'Il y a 5 mois',
      lastActive: 'Il y a 1 jour',
      applicationsSent: 28,
    },
    {
      id: 3,
      fullName: "Orange Côte d'Ivoire",
      email: 'rh@orange.ci',
      avatar: orangeLogo,
      role: 'employer',
      status: 'active',
      location: 'Abidjan',
      joinedAt: 'Il y a 8 mois',
      lastActive: 'Il y a 3 heures',
      jobsPosted: 24,
    },
    {
      id: 4,
      fullName: 'FastMoney SARL',
      email: 'contact@fastmoney.ci',
      avatar: sanlamLogo,
      role: 'employer',
      status: 'suspended',
      location: 'Bouaké',
      joinedAt: 'Il y a 2 semaines',
      lastActive: 'Il y a 4 jours',
      jobsPosted: 3,
    },
    {
      id: 5,
      fullName: 'Jean-Marc Diabaté',
      email: 'jm.diabate@example.com',
      avatar: candidate3,
      role: 'candidate',
      status: 'active',
      location: 'Yopougon',
      joinedAt: 'Il y a 1 mois',
      lastActive: "Aujourd'hui",
      applicationsSent: 8,
    },
    {
      id: 6,
      fullName: 'Ecobank CI',
      email: 'talent@ecobank.ci',
      avatar: ecobankLogo,
      role: 'employer',
      status: 'active',
      location: 'Abidjan',
      joinedAt: 'Il y a 6 mois',
      lastActive: 'Il y a 5 heures',
      jobsPosted: 15,
    },
  ])

  const trafficData = ref<StatPoint[]>([
    { label: 'Lun', value: 3200, change: 5.2 },
    { label: 'Mar', value: 4100, change: 8.1 },
    { label: 'Mer', value: 3800, change: -2.3 },
    { label: 'Jeu', value: 5200, change: 12.4 },
    { label: 'Ven', value: 6100, change: 15.8 },
    { label: 'Sam', value: 2900, change: -18.2 },
    { label: 'Dim', value: 2200, change: -8.5 },
  ])

  const stats = computed(() => ({
    totalUsers: 12847,
    totalCandidates: 12034,
    totalEmployers: 813,
    totalJobs: 5402,
    activeJobs: 3847,
    pendingModeration: pendingJobs.value.filter((j) => j.status === 'pending').length,
    totalApplications: 48921,
    monthlyGrowth: 12.4,
  }))

  const flaggedJobsCount = computed(
    () => pendingJobs.value.filter((j) => j.flagged).length,
  )
  const pendingCount = computed(
    () => pendingJobs.value.filter((j) => j.status === 'pending').length,
  )
  const usersCount = computed(() => users.value.length)

  const logout = () => {
    pendingJobs.value = []
    users.value = []
  }

  return {
    user,
    pendingJobs,
    users,
    trafficData,
    stats,
    flaggedJobsCount,
    pendingCount,
    usersCount,
    logout,
  }
})