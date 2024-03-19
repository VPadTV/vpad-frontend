import type { User } from '@/types/entities'
import { reactive } from 'vue'

export const store = reactive<{
  user?: User
}>({})
