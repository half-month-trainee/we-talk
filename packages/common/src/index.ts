export const API_PREFIX = '/api'

export type ResponseType<T> = {
  errMsg: string,
  status: number,
  res: T
}

export const response = <T>(res: T, status = 200): ResponseType<T> => ({ errMsg: '', status, res })

/**
 * Enums
 */

export enum MessageTypeEnum {
  PlanText = 'PlanText'
}

export enum RelationshipStatusEnum {
  None = 'None',
  Friend = 'Friend',
  Pending = 'Pending',
  Black = 'Black'
}

/**
 * Model Message
 */

export type MessageVO = {
  id: number
  fromUserId: number
  toUserId: number
  type: MessageTypeEnum
  content: string
  createdAt: number
  updatedAt: number
}

/**
 * Model Relationship
 */

export type RelationshipVO = {
  id: number
  fromUserId: number
  toUserId: number
  status: RelationshipStatusEnum
  createdAt: number
  updatedAt: number
}

/**
 * Model User
 */

export type UserVO = {
  id: number
  username: string
  password: string
  avatar: string | null
  nickname: string | null
  intro: string | null
  createdAt: number
  updatedAt: number
}

export type RegisterDTO = Pick<UserVO, 'avatar' | 'username' | 'password' | 'nickname' | 'intro'>
export type LoginDTO = Pick<UserVO, 'username' | 'password'>
export type UpdateUserDTO = Pick<UserVO, 'id' | 'password' | 'avatar' | 'nickname' | 'intro'>
export type SentMessageDTO = Pick<MessageVO, 'fromUserId' | 'toUserId' | 'type' | 'content'>
