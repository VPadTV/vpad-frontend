'use client'
import { useEffect, useState } from 'react'
import { Card, CardBody, CardHeader } from "@nextui-org/react"
import { BanModal } from '@/components/admin/BanModal'
import { UsersTable } from '@/components/admin/UsersTable'
import toast, { Toaster } from 'react-hot-toast'
import { User } from '@/types/admin'
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { 
  fetchAdminUsers, 
  updateUserAdmin, 
  updateUserBan, 
  setAdminPage,
} from '@/redux/features/adminSlice'

export default function AdminDashboard() {
  const dispatch = useAppDispatch()
  const { users, pagination } = useAppSelector(state => state.admin)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)

  useEffect(() => {

    loadUsers()
  }, [dispatch])

  useEffect(() => {
    loadUsers()
  }, [pagination.page])

  const loadUsers = () => {
    dispatch(fetchAdminUsers())
  }

  const handleToggleAdmin = async (userId: string, isAdmin: boolean) => {
    try {
      // Since we're only removing admin status, always set admin to false
      await dispatch(updateUserAdmin({ 
        id: userId, 
        admin: false 
      })).unwrap()
      
      toast.success('Admin status removed successfully')
    } catch (error) {
      toast.error('Failed to update admin status')
      console.error(error)
    }
  }

  const handleBanConfirm = async (duration: string | null) => {
    if (!selectedUser) return

    try {
      await dispatch(updateUserBan({
        id: selectedUser.id,
        banned: duration !== null,
        banTimeout: duration
      })).unwrap()
      
      setSelectedUser(null)
      toast.success(duration === null ? 'Ban removed successfully' : 'User banned successfully')
    } catch (error) {
      toast.error('Failed to update ban status')
      console.error(error)
    }
  }

  const handlePageChange = (page: number) => {
    dispatch(setAdminPage(page))
  }

  return (
    <div className="pt-[80px] min-h-screen bg-background">
      <div className="p-8 max-w-7xl mx-auto space-y-6">
        <Toaster position="top-right" />
        
        <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
        
        <Card className="bg-content1">
          <CardHeader className="flex flex-col sm:flex-row gap-4 justify-between items-center px-6 py-5">
            <div className="flex flex-col gap-1">
              <h4 className="text-xl font-bold">Admin Management</h4>
              <p className="text-sm text-default-500">Manage Admin roles and duration</p>
            </div>
          </CardHeader>
          <CardBody className="px-3">
            <UsersTable
              users={users}
              page={pagination.page}
              pages={pagination.pages}
              onPageChange={handlePageChange}
              onToggleAdmin={handleToggleAdmin}
              onBanUser={setSelectedUser}
            />
          </CardBody>
        </Card>

        <BanModal
          isOpen={!!selectedUser}
          onClose={() => setSelectedUser(null)}
          onConfirm={handleBanConfirm}
          user={selectedUser || { id: '', nickname: '' }}
        />
      </div>
    </div>
  )
}

