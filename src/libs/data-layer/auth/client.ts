'use client'

import { api } from '@/libs/api/client'

import type { LoginPayload, LoginResponse, ProfileResponse, RegisterPayload, RegisterResponse } from './types'

export const login = (payload: LoginPayload) => api.post('accounts/auth/login', { json: payload }).json<LoginResponse>()

export const register = (payload: RegisterPayload) =>
  api.post('accounts/auth/register', { json: payload }).json<RegisterResponse>()

export const logout = () => api.post('accounts/auth/logout').json()

export const getProfile = () => api.get('accounts/profile/private').json<ProfileResponse>()
