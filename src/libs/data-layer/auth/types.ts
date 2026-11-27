export interface LoginPayload {
  email: string
  password: string
}

export interface LoginResponse {
  message: string
  user: { id: number; email: string }
  token: string
}

export interface RegisterPayload {
  email: string
  password: string
  password_confirmation: string
  username: string
  full_name: string
}

export interface RegisterResponse {
  message: string
  user: { id: number; email: string; email_verified_at: string | null }
  token: string
}

export interface ProfileResponse {
  id: number
  username: string
  full_name: string
  bio: string
  avatar: string
  created_at: Date
  updated_at: Date
  deleted_at: Date
}
