import { API_PREFIX, ResponseType, SafeUserVO } from '@we-talk/common'
import { request } from '../config/axios.config'

export const fetchCurrentUser = () =>
  request.get<ResponseType<SafeUserVO>>(`${API_PREFIX}/current`)
