import { 
  Table, 
  TableHeader, 
  TableBody, 
  TableColumn, 
  TableRow, 
  TableCell,
  Pagination,
  Chip,
} from "@nextui-org/react"
import { Button } from '@/components/ui/Button'
import { User } from "@/types/admin"

interface UsersTableProps {
  users: User[]
  page: number
  pages: number
  onPageChange: (page: number) => void
  onToggleAdmin: (userId: string, isAdmin: boolean) => void
  onBanUser: (user: User) => void
}

export function UsersTable({ 
  users, 
  page, 
  pages, 
  onPageChange, 
  onToggleAdmin, 
  onBanUser 
}: UsersTableProps) {
  return (
    <>
      <Table aria-label="Users table">
        <TableHeader>
          <TableColumn>USERNAME</TableColumn>
          <TableColumn>NICKNAME</TableColumn>
          <TableColumn>EMAIL</TableColumn>
          <TableColumn>STATUS</TableColumn>
          <TableColumn>ACTIONS</TableColumn>
        </TableHeader>
        <TableBody>
          {users?.map((user) => (
            <TableRow key={user.id}>
              <TableCell>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    {user.nickname.charAt(0).toUpperCase()}
                  </div>
                  {user.nickname}
                </div>
              </TableCell>
              <TableCell>{user.nickname}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>
                <div className="flex flex-wrap gap-2">
                  {user.admin && <Chip color="primary" size="sm">Admin</Chip>}
                  {user.banned && (
                    <Chip color="danger" size="sm">
                      Banned {user.banTimeout && `until ${new Date(user.banTimeout).toLocaleDateString()}`}
                    </Chip>
                  )}
                </div>
              </TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => onToggleAdmin(user.id, user.admin)}
                  >
                    Remove Admin
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => onBanUser(user)}
                  >
                    {user.banned ? 'Update Ban' : 'Ban User'}
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      
      <div className="flex justify-center py-4">
        <Pagination
          total={pages}
          page={page}
          onChange={onPageChange}
          showControls
          classNames={{
            wrapper: "gap-2",
          }}
        />
      </div>
    </>
  )
}
