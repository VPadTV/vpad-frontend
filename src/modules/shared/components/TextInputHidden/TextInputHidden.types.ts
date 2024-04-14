export interface Emits {
  (e: string): void
}

export interface TextInputHiddenProps {
  readonly name?: string
  readonly type?: string
  readonly required?: boolean
}
