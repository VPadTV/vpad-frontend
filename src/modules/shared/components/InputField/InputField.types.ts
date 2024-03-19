import type { LinkHTMLAttributes } from 'vue'

export interface InputFieldProps extends LinkHTMLAttributes {
  readonly name?: string
  readonly type?: string
  readonly required?: boolean
  readonly hasLink?: boolean
  readonly linkText?: string
}
