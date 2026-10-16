import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export interface EmployerCompany {
  id: string
  name: string
  logo: string
  industry: string
  size: string
  location: string
  website: string
  description: string
  verified: boolean
  profileCompletion: number
}

export interface EmployerUser {
  id: string
  fullName: string
  email: string
  phone: string
  role: string
  avatar: string
}

export interface EmployerJob {
  id: number
  title: string
  location: string
  contract: 'CDI' | 'CDD' | 'Stage' | 'Freelance' | 'Alternance'
  category: string
  salary: string
  status: 'active' | 'paused' | 'closed' | 'draft'
  applicants: number
  views: number
  postedAt: string
  expiresAt: string
}

export interface CandidateApplication {
  id: number
  candidateId: number
  candidateName: string
  candidateTitle: string
  candidateAvatar: string
  candidateLocation: string
  jobId: number
  jobTitle: string
  status: 'pending' | 'reviewing' | 'interview' | 'accepted' | 'rejected'
  appliedAt: string
  matchScore: number
}

// ⚠️ MOCK
import companyLogo from '@/assets/images/orange.png'
import userAvatar from '@/assets/images/avatar.jpg'
import candidate1 from '@/assets/images/feature-1.jpg'
import candidate2 from '@/assets/images/feature-2.jpg'
import candidate3 from '@/assets/images/feature-3.jpg'

export const useEmployerStore = defineStore('employer', () => {
  const user = ref<EmployerUser>({
    id: 'e_001',
    fullName: 'Mariam Konaté',
    email: 'mariam.konate@orange.ci',
    phone: '+225 27 22 44 55 66',
    role: 'Talent Acquisition Manager',
    avatar: userAvatar,
  })

  const company = ref<EmployerCompany>({
    id: 'c_001',
    name: "Orange Côte d'Ivoire",
    logo: companyLogo,
    industry: 'Télécommunications',
    size: '1 000+ employés',
    location: 'Abidjan, Côte d’Ivoire',
    website: 'https://orange.ci',
    description:
      "Orange Côte d'Ivoire est un opérateur de télécommunications majeur, engagé dans le développement du numérique et de l'innovation en Afrique de l'Ouest.",
    verified: true,
    profileCompletion: 85,
  })

  const jobs = ref<EmployerJob[]>([
    {
      id: 1,
      title: 'Développeur Full Stack',
      location: 'Abidjan',
      contract: 'CDI',
      category: 'Informatique & Télécoms',
      salary: '500 000 - 1 000 000 FCFA',
      status: 'active',
      applicants: 47,
      views: 1250,
      postedAt: 'Il y a 2 jours',
      expiresAt: 'Dans 28 jours',
    },
    {
      id: 2,
      title: 'Chef de Projet Digital',
      location: 'Abidjan',
      contract: 'CDD',
      category: 'Informatique & Télécoms',
      salary: '700 000 - 1 300 000 FCFA',
      status: 'active',
      applicants: 23,
      views: 890,
      postedAt: 'Il y a 1 semaine',
      expiresAt: 'Dans 21 jours',
    },
    {
      id: 3,
      title: 'Data Analyst',
      location: 'Abidjan',
      contract: 'CDI',
      category: 'Informatique & Télécoms',
      salary: '600 000 - 1 100 000 FCFA',
      status: 'paused',
      applicants: 18,
      views: 520,
      postedAt: 'Il y a 2 semaines',
      expiresAt: 'Dans 14 jours',
    },
    {
      id: 4,
      title: 'Stage Marketing Digital',
      location: 'Abidjan',
      contract: 'Stage',
      category: 'Commerce & Vente',
      salary: '150 000 - 250 000 FCFA',
      status: 'closed',
      applicants: 62,
      views: 2100,
      postedAt: 'Il y a 2 mois',
      expiresAt: 'Expirée',
    },
  ])

  const applications = ref<CandidateApplication[]>([
    {
      id: 1,
      candidateId: 101,
      candidateName: 'Kouassi Yao',
      candidateTitle: 'Développeur Full Stack',
      candidateAvatar: candidate1,
      candidateLocation: 'Abidjan',
      jobId: 1,
      jobTitle: 'Développeur Full Stack',
      status: 'interview',
      appliedAt: 'Il y a 3 jours',
      matchScore: 92,
    },
    {
      id: 2,
      candidateId: 102,
      candidateName: 'Aïcha Traoré',
      candidateTitle: 'Data Analyst Senior',
      candidateAvatar: candidate2,
      candidateLocation: 'Abidjan',
      jobId: 3,
      jobTitle: 'Data Analyst',
      status: 'reviewing',
      appliedAt: 'Il y a 5 jours',
      matchScore: 85,
    },
    {
      id: 3,
      candidateId: 103,
      candidateName: 'Jean-Marc Diabaté',
      candidateTitle: 'Chef de Projet',
      candidateAvatar: candidate3,
      candidateLocation: 'Abidjan',
      jobId: 2,
      jobTitle: 'Chef de Projet Digital',
      status: 'pending',
      appliedAt: 'Il y a 1 semaine',
      matchScore: 78,
    },
    {
      id: 4,
      candidateId: 104,
      candidateName: 'Fatou Bamba',
      candidateTitle: 'Développeuse Front-End',
      candidateAvatar: candidate1,
      candidateLocation: 'Yopougon',
      jobId: 1,
      jobTitle: 'Développeur Full Stack',
      status: 'pending',
      appliedAt: 'Il y a 1 jour',
      matchScore: 88,
    },
  ])

  const stats = computed(() => ({
    activeJobs: jobs.value.filter((j) => j.status === 'active').length,
    totalJobs: jobs.value.length,
    totalApplications: applications.value.length,
    pendingApplications: applications.value.filter((a) => a.status === 'pending').length,
    totalViews: jobs.value.reduce((sum, j) => sum + j.views, 0),
    hires: 5,
  }))

  const activeJobsCount = computed(() => jobs.value.filter((j) => j.status === 'active').length)
  const applicationsCount = computed(() => applications.value.length)

  const logout = () => {
    jobs.value = []
    applications.value = []
  }

  return {
    user,
    company,
    jobs,
    applications,
    stats,
    activeJobsCount,
    applicationsCount,
    logout,
  }
})