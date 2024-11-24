import type { ColumnDef } from '@tanstack/table-core';
import { createRawSnippet } from 'svelte';
import type { ReportPageSchema } from '../data/schemas.js';
import { TableColumnHeader, TablePendingRow, TableRowActions, TableCheckbox } from './index.js';
import { renderComponent, renderSnippet } from '$lib/components/ui/data-table/render-helpers.js';

export const columns: ColumnDef<ReportPageSchema>[] = [
  {
    id: 'select',
    header: ({ table }) =>
      renderComponent(TableCheckbox, {
        checked: table.getIsAllPageRowsSelected(),
        onCheckedChange: (value) => table.toggleAllPageRowsSelected(!!value),
        'aria-label': 'Select all',
        class: 'translate-y-[2px]'
      }),
    cell: ({ row }) =>
      renderComponent(TableCheckbox, {
        checked: row.getIsSelected(),
        onCheckedChange: (value) => row.toggleSelected(!!value),
        'aria-label': 'Select row',
        class: 'translate-y-[2px]'
      }),
    enableSorting: false,
    enableHiding: false
  },
  {
    accessorKey: 'reference_id',
    header: ({ column }) => {
      return renderComponent(TableColumnHeader<ReportPageSchema, unknown>, {
        column,
        title: 'Reference ID'
      });
    },
    cell: ({ row }) => {
      const idSnippet = createRawSnippet<[string]>((getReferenceId) => {
        return {
          render: () => `<div class="">${getReferenceId()}</div>`
        };
      });

      return renderSnippet(idSnippet, row.getValue('reference_id'));
    },
    enableSorting: true,
    enableHiding: true
  },

  {
    accessorKey: 'status',
    header: ({ column }) => {
      return renderComponent(TableColumnHeader<ReportPageSchema, unknown>, {
        column,
        title: 'Status'
      });
    },
    cell: ({ row }) => renderComponent(TablePendingRow, { row }),
    enableSorting: true,
    enableHiding: true
  },

  {
    accessorKey: 'created_at',
    id: 'created_at',
    header: ({ column }) => {
      return renderComponent(TableColumnHeader<ReportPageSchema, unknown>, {
        column,
        title: 'Created At',
        class: 'flex justify-start'
      });
    },
    cell: ({ row }) => {
      const createdAtSnippet = createRawSnippet<[string]>((getCreatedAt) => {
        return {
          render: () =>
            `<div class="w-full">${new Date(getCreatedAt()).toLocaleDateString()} @ ${new Date(getCreatedAt()).toLocaleTimeString()}</div>`
        };
      });

      return renderSnippet(createdAtSnippet, row.getValue('created_at'));
    },
    enableSorting: true,
    enableHiding: true
  },

  {
    id: 'actions',
    cell: ({ row }) => renderComponent(TableRowActions<ReportPageSchema>, { row })
  }
];
