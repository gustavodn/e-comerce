import { describe, it, expect, beforeEach, vi } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useAuthStore } from '@/stores/auth'
import api from '@/core/api'

vi.mock('@/core/api')

describe('Auth Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    vi.clearAllMocks()
    localStorage.clear()
  })

  it('initializes with default state', () => {
    const store = useAuthStore()
    expect(store.isAuthenticated).toBe(false)
    expect(store.user).toBeNull()
    expect(store.loading).toBe(false)
    expect(store.error).toBeNull()
  })

  it('handles successful login', async () => {
    const mockResponse = { data: { data: { token: 'test-token' } } }
    vi.mocked(api.post).mockResolvedValue(mockResponse)

    const store = useAuthStore()
    const result = await store.login('test@example.com', 'password')

    expect(result).toBe(true)
    expect(store.isAuthenticated).toBe(true)
    expect(store.token).toBe('test-token')
    expect(localStorage.getItem('auth_token')).toBe('test-token')
  })

  it('handles login error', async () => {
    const error = { response: { data: { message: 'Invalid credentials' } } }
    vi.mocked(api.post).mockRejectedValue(error)

    const store = useAuthStore()
    const result = await store.login('test@example.com', 'wrong-password')

    expect(result).toBe(false)
    expect(store.isAuthenticated).toBe(false)
    expect(store.error).toBe('Invalid credentials')
  })

  it('handles successful registration', async () => {
    const mockResponse = { data: {} }
    vi.mocked(api.post).mockResolvedValue(mockResponse)

    const store = useAuthStore()
    const result = await store.register({
      name: 'John Doe',
      email: 'new@example.com',
      password: 'password',
      password_confirmation: 'password'
    })

    expect(result).toBe(true)
    expect(store.error).toBeNull()
  })

  it('handles registration error', async () => {
    const error = { response: { data: { message: 'Email already taken' } } }
    vi.mocked(api.post).mockRejectedValue(error)

    const store = useAuthStore()
    const result = await store.register({
      name: 'John Doe',
      email: 'existing@example.com',
      password: 'password',
      password_confirmation: 'password'
    })

    expect(result).toBe(false)
    expect(store.error).toBe('Email already taken')
  })

  it('handles logout', () => {
    const store = useAuthStore()
    store.token = 'test-token'
    localStorage.setItem('auth_token', 'test-token')
    
    store.logout()

    expect(store.isAuthenticated).toBe(false)
    expect(store.token).toBeNull()
    expect(store.user).toBeNull()
    expect(localStorage.getItem('auth_token')).toBeNull()
  })
}) 