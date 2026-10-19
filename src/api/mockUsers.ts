export interface MockUser {
  id: string
  email: string
  phone_number: string
  password: string
  role: 'CANDIDATE' | 'EMPLOYER' | 'ADMIN' | 'SUPERADMIN'
  first_name: string
  last_name: string
}

export const MOCK_USERS: MockUser[] = [
  {
    id: '00000000-0000-0000-0000-000000000001',
    email: 'candidat@phoenix.test',
    phone_number: '+2250700000001',
    password: 'Candidat123!',
    role: 'CANDIDATE',
    first_name: 'Kouassi',
    last_name: 'Yao',
  },
  {
    id: '00000000-0000-0000-0000-000000000002',
    email: 'employeur@phoenix.test',
    phone_number: '+2250700000002',
    password: 'Employeur123!',
    role: 'EMPLOYER',
    first_name: 'Mariam',
    last_name: 'Konaté',
  },
  {
    id: '00000000-0000-0000-0000-000000000003',
    email: 'admin@phoenix.test',
    phone_number: '+2250700000003',
    password: 'Admin123!',
    role: 'ADMIN',
    first_name: 'Admin',
    last_name: 'PHOENIX',
  },
]

export const findMockUser = (identifier: string, password: string) =>
  MOCK_USERS.find(
    (u) =>
      (u.email === identifier || u.phone_number === identifier) &&
      u.password === password,
  )

export const findMockUserById = (id: string) =>
  MOCK_USERS.find((u) => u.id === id)