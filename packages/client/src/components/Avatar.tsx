import styled from 'styled-components'
import tw from 'twin.macro'

export enum AvatarSize {
  Small,
  Medium,
  Large
}

export interface AvatarProps {
  size?: AvatarSize
}

export const Avatar = styled.img(({ size = AvatarSize.Medium }: AvatarProps) => [
  tw`rounded bg-gray-200 block overflow-hidden`,
  size === AvatarSize.Small && tw`w-10 h-10`,
  size === AvatarSize.Medium && tw`w-14 h-14`,
  size === AvatarSize.Large && tw`w-16 h-16`
])