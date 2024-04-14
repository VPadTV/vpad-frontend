import type { EMediaType } from '@domain/constants/MediaType'
export interface ViewImageProps {
  post: {
    readonly mediaType: EMediaType
    readonly mediaUrl: string
  }
}
