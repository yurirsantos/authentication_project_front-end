import { validTokenUser } from '@/store/User'
import { api } from './api'
import { AlertInfo } from '@/components/alerts'

export async function AuthUser() {
  const token = await localStorage.getItem('@tokenUserAccess')

  api.defaults.headers.common['Authorization'] = 'Bearer ' + token

  const validTokenReturn = await validTokenUser()
}

export function RemoveAuthUser() {
  api.defaults.headers.common['Authorization'] = 'Bearer ' + null
  localStorage.clear()
  AlertInfo('Você Está Saindo do Sistema. Até logo!')

  setTimeout(() => {
    window.location.replace('/')
  }, 250)
}
