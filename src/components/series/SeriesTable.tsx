'use client'

import { 
  Card, 
  Button, 
  Table, 
  TableHeader, 
  TableColumn, 
  TableBody, 
  TableRow, 
  TableCell 
} from '@nextui-org/react';
import { FaEdit, FaTrash } from 'react-icons/fa';

interface Series {
  id: string;
  name: string;
}

interface SeriesTableProps {
  seriesList: Series[];
  loading: boolean;
  onEdit: (series: Series) => void;
  onDelete: (seriesId: string) => void;
}

export default function SeriesTable({ 
  seriesList, 
  loading, 
  onEdit, 
  onDelete 
}: SeriesTableProps) {
  return (
    <Card>
      <Table aria-label="Series Management Table">
        <TableHeader>
          <TableColumn>NAME</TableColumn>
          <TableColumn>ACTIONS</TableColumn>
        </TableHeader>
        <TableBody 
          emptyContent={"No series found. Create your first series!"}
          isLoading={loading}
        >
          {seriesList && seriesList.map((series) => (
            <TableRow key={series.id}>
              <TableCell>{series.name}</TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Button 
                    isIconOnly 
                    size="sm" 
                    color="primary"
                    onClick={() => onEdit(series)}
                  >
                    <FaEdit />
                  </Button>
                  <Button 
                    isIconOnly 
                    size="sm" 
                    color="danger"
                    onClick={() => onDelete(series.id)}
                  >
                    <FaTrash />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
}
