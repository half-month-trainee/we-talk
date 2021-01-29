import { ResponseType, API_PREFIX, SentMessageDTO, LoginDTO, UserContextData, MessageVO } from '@we-talk/common'
import { request } from '../config/axios.config'

export const initMessage = () =>
  request.get<ResponseType<MessageVO[]>>(`${API_PREFIX}/current/init-message`)

// export const fetchMessage = () =>
// request.post<ResponseType<UserContextData>>(`${API_PREFIX}/login`, data)
