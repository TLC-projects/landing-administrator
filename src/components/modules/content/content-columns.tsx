'use client';

import { ArrowUpDown, Eye, EyeOff } from 'lucide-react';
import { Content } from '@core/domain/entities/content';
import { ColumnDef } from '@tanstack/react-table';

import { Badge, Button } from '@/src/components/ui';

import { ContentTableActions } from './content-table-actions';

export const ContentTableColumns = (): ColumnDef<Content>[] => [
  {
    accessorKey: 'id',
    header: ({ column }) => {
      return (
        <Button variant={'ghost'} onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          ID
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div className="px-4">{row.getValue('id')}</div>
  },
  {
    accessorKey: 'title',
    header: 'Nombre del contenido',
    cell: ({ row }) => <div className="capitalize">{row.getValue('title')}</div>
  },
  {
    accessorKey: 'blocked',
    header: 'Estado',
    cell: ({ row }) => {
      const content = row.original;
      const blocked = content.blocked ? 'Oculto' : 'Visible';
      const backgroundColor = content.blocked ? '#DDDDDD' : '#DBFCE7';
      const color = content.blocked ? '#121212' : 'green';
      return (
        <Badge className={`capitalize border-0`} style={{ backgroundColor: backgroundColor, color: color }}>
          <span>{content.blocked ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}</span>
          {blocked}
        </Badge>
      );
    }
  },
  {
    id: 'actions',
    header: 'Acciones',
    cell: ({ row }) => {
      const content = row.original;
      return <ContentTableActions content={content} />;
    }
  }
];
