import type { User } from '@/domain/entities/User'
import { reactive } from 'vue'

export const store = reactive<{
    user?: User
}>({})
