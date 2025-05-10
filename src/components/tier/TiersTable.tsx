import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Button } from "@nextui-org/react";
import { FaEdit, FaTrash } from "react-icons/fa";

interface Tier {
  id: string;
  name: string;
  price: number;
}

interface TiersTableProps {
  tiers: Tier[];
  loading: boolean;
  onEdit: (tier: { id: string; name: string }) => void;
  onDelete: (tier: { id: string; name: string }) => void;
  onCreate: () => void;
}

export default function TiersTable({ tiers, loading, onEdit, onDelete, onCreate }: TiersTableProps) {
  if (loading && tiers.length === 0) {
    return (
      <div className="flex justify-center py-6">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (tiers.length === 0) {
    return (
      <div className="text-center py-6">
        <p className="text-lg mb-4">You don't have any subscription tiers yet</p>
        <Button color="primary" onClick={onCreate}>
          Create Your First Tier
        </Button>
      </div>
    );
  }

  return (
    <Table aria-label="Subscription tiers table">
      <TableHeader>
        <TableColumn>NAME</TableColumn>
        <TableColumn>PRICE (USD)</TableColumn>
        <TableColumn width={150}>ACTIONS</TableColumn>
      </TableHeader>
      <TableBody>
        {tiers.map((tier) => (
          <TableRow key={tier.id}>
            <TableCell>{tier.name}</TableCell>
            <TableCell>${tier.price.toFixed(2)}/month</TableCell>
            <TableCell>
              <div className="flex gap-2">
                <Button
                  isIconOnly
                  size="sm"
                  variant="light"
                  onClick={() => onEdit(tier)}
                >
                  <FaEdit className="text-primary" />
                </Button>
                <Button
                  isIconOnly
                  size="sm"
                  variant="light"
                  onClick={() => onDelete(tier)}
                >
                  <FaTrash className="text-danger" />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
