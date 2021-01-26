import { SafeUserVO, UserVO } from './VO'

export * from './VO'
export * from './DTO'
export * from './ErrorStatus'

export const API_PREFIX = '/api'

export type ResponseType<T> = {
  errMsg: string,
  status: number,
  res: T
}

export const response = <T>(res: T, status = 200, errMsg = ''): ResponseType<T> => ({ errMsg, status, res })

export type UserContextData = SafeUserVO & { token: string }

export type JwtPayload = Pick<UserVO, 'username' | 'id'>

export const BEARER = 'Bearer '

export const createBearer = (token: string) => BEARER + token

export const extractToken = (fullToken?: string | null) => {
  if (fullToken && fullToken.length > BEARER.length) {
    return fullToken.substring(BEARER.length)
  }
  return null
}
