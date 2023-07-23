import { api } from '../services/api'
import { LoginType } from '@/Types/LoginType'

const route = '/auth'

export const authenticationUser = async (data: LoginType) => {
  return await api
    .post(route, data)
    .then((response: any) => {
      return response.data
    })
    .catch((error: any) => {
      console.error(error)
    })
}
