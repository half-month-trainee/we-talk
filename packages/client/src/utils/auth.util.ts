import { history } from '../config/router.config'

enum StorageKey {
  JWT_TOKEN= 'JWT_TOKEN'
}

export const getToken = () => localStorage.getItem(StorageKey.JWT_TOKEN)

export const checkLogin = () => (getToken()?.length ?? 0) > 0

export const saveToken = (token?: string | null) => {
  if (token && token.length > 0) {
    localStorage.setItem(StorageKey.JWT_TOKEN, token)
  }
}

export const deleteToken = () => {
  localStorage.removeItem(StorageKey.JWT_TOKEN)
}

export const jumpToLogin = () => history.push('/auth/login')
