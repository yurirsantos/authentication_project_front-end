import { UserType } from '@/Types/UserType'
import { api } from '../services/api'
import { AlertError, AlertInfo, AlertSuccess } from '@/components/alerts'
import {
  ActiveAccountChangeCodeType,
  PasswordChangeCodeType
} from '@/Types/PasswordChangeCodeType'

const route = '/users'

export const listUsers = async () => {
  return await api
    .get(route)
    .then((response: any) => {
      return response.data
    })
    .catch((error: any) => {
      console.error(error)
    })
}

export const postUser = async (data: UserType) => {
  return await api
    .post(route, data)
    .then((response: any) => {
      AlertSuccess('Usuário(a) Cadastrado(a) com Sucesso!')
      return response.data
    })
    .catch((error: any) => {
      AlertError('Usuário(a) não Cadastrado(a)!')
      console.error(error)
    })
}

export const listUserId = async (userId: string) => {
  return await api
    .get(`${route}/${userId}`)
    .then((response: any) => {
      return response.data
    })
    .catch((error: any) => {
      console.error(error)
    })
}

export const updateUser = async (userId: string, data: UserType) => {
  return await api
    .put(`${route}/update/${userId}`, data)
    .then((response: any) => {
      AlertSuccess('Usuário(a) Atualizado(a) com Sucesso')

      return response.data
    })
    .catch((error: any) => {
      AlertError('Usuário(a) Não Atualizado(a)!')
      console.error(error)
    })
}

export const deleteUser = async (userId: string) => {
  return await api
    .get(`${route}/delete/${userId}`)
    .then((response: any) => {
      return response.data
    })
    .catch((error: any) => {
      console.error(error)
    })
}

export const forgotPasswordSendSMS = async (contactUser: string) => {
  return await api
    .post(`${route}/replacePassword/sendSMS/${contactUser}`)
    .then((response: any) => {
      AlertSuccess('Recuperação de senha enviada com sucesso!')
      return response.data
    })
    .catch((error: any) => {
      AlertError('Recuperação de senha não enviada!')
      console.error(error)
    })
}

export const forgotPasswordSendEmail = async (emailUser: string) => {
  return await api
    .post(`${route}/replacePassword/sendEmail/${emailUser}`)
    .then((response: any) => {
      AlertSuccess('Recuperação de senha enviada com sucesso!')
      return response.data
    })
    .catch((error: any) => {
      AlertError('Recuperação de senha não enviada!')
      console.error(error)
    })
}

export const replacePasswordUser = async (data: PasswordChangeCodeType) => {
  return await api
    .post('changeCodes/replacePassword', data)
    .then((response: any) => {
      AlertSuccess('Senha alterada com sucesso!!')
      return response.data
    })
    .catch((error: any) => {
      AlertError('Senha não alterada!')
      AlertInfo(error.response.data.error)
      console.error(error)
    })
}

export const activeAccountUser = async (data: ActiveAccountChangeCodeType) => {
  return await api
    .post('changeCodes/activeAccount', data)
    .then((response: any) => {
      AlertSuccess('Conta ativada com sucesso!')
      return response.data
    })
    .catch((error: any) => {
      AlertError('Conta não Ativada!')
      AlertInfo(error.response.data.error)
      console.error(error)
    })
}

export const resetSendEmailActiveAccountUser = async (email: string) => {
  return await api
    .post('users/activeAccount/sendEmail/:email', email)
    .then((response: any) => {
      AlertSuccess('E-mail enviado com sucesso!')
      return response.data
    })
    .catch((error: any) => {
      AlertError('E-mail não enviado!')
      AlertInfo(error.response.data.error)
      console.error(error)
    })
}
