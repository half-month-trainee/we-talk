import { ResponseType, API_PREFIX, RegisterDTO, LoginDTO } from '@we-talk/common'
import axios from 'axios'

export const register = (data: RegisterDTO) =>
  axios.post<ResponseType<{}>>(`${API_PREFIX}`, data)

export const login = (data: LoginDTO) =>
  axios.post<ResponseType<LoginDTO>>(`${API_PREFIX}`, data)
