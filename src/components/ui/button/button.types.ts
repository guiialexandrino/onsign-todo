export type Button = {
  color?: string
  height?: number
}

export type ButtonEmits = {
  (e: 'onClick'): void
}
