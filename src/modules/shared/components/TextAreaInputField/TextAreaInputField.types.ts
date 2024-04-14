import type { EResize } from '@modules/shared/constants'

export interface TextAreaInputField {
  readonly required?: boolean
  readonly minWidth?: string
  readonly maxWidth?: string
  readonly resize?: EResize
}
