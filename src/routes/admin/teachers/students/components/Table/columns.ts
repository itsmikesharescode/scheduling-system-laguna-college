import type { ColumnDef } from '@tanstack/table-core';
import { createRawSnippet } from 'svelte';
import type { TableSchema } from './schema';
import {
  DataTableCheckbox,
  DataTableColumnHeader,
  DataTableRowActions,
  DataTableRowSections,
  DataTableRowSubjects,
  DataTableTitleCell
} from './index';
import { renderComponent, renderSnippet } from '$lib/components/ui/data-table';

export const columns: ColumnDef<TableSchema>[] = [
  {
    id: 'actions',
    cell: ({ row }) => renderComponent(DataTableRowActions<TableSchema>, { row })
  },
  {
    accessorKey: 'studentId',
    header: ({ column }) => {
      return renderComponent(DataTableColumnHeader<TableSchema, unknown>, {
        column,
        title: 'Student ID'
      });
    },
    cell: ({ row }) => {
      const idSnippet = createRawSnippet<[string]>((getStudentId) => {
        return {
          render: () => `<div class="w-[80px]">${getStudentId()}</div>`
        };
      });

      return renderSnippet(idSnippet, row.getValue('studentId'));
    },
    enableSorting: false,
    enableHiding: false
  },

  {
    accessorKey: 'fullname',
    header: ({ column }) => {
      return renderComponent(DataTableColumnHeader<TableSchema, unknown>, {
        column,
        title: 'Full Name'
      });
    },
    cell: ({ row }) => {
      const idSnippet = createRawSnippet<[string]>((getFullName) => {
        return {
          render: () => `<div class="w-full line-clamp-2">${getFullName()}</div>`
        };
      });

      return renderSnippet(idSnippet, row.getValue('fullname'));
    },
    enableSorting: true,
    enableHiding: true
  },
  {
    accessorKey: 'gender',
    header: ({ column }) => {
      return renderComponent(DataTableColumnHeader<TableSchema, unknown>, {
        column,
        title: 'Gender'
      });
    },
    cell: ({ row }) => {
      const idSnippet = createRawSnippet<[string]>((getGender) => {
        return {
          render: () => `<div class="w-full">${getGender()}</div>`
        };
      });

      return renderSnippet(idSnippet, row.getValue('gender'));
    },
    enableSorting: true,
    enableHiding: true
  },
  {
    accessorKey: 'email',
    header: ({ column }) => {
      return renderComponent(DataTableColumnHeader<TableSchema, unknown>, {
        column,
        title: 'Email'
      });
    },
    cell: ({ row }) => {
      const idSnippet = createRawSnippet<[string]>((getEmail) => {
        return {
          render: () => `<div class="w-full">${getEmail()}</div>`
        };
      });

      return renderSnippet(idSnippet, row.getValue('email'));
    },
    enableSorting: true,
    enableHiding: true
  },

  {
    accessorKey: 'sections',
    id: 'sections',
    header: ({ column }) => {
      return renderComponent(DataTableColumnHeader<TableSchema, unknown>, {
        column,
        title: 'Sections'
      });
    },
    cell: ({ row }) => renderComponent(DataTableRowSections<TableSchema>, { row }),
    enableSorting: false,
    enableHiding: true
  },
  {
    accessorKey: 'subjects',
    id: 'subjects',
    header: ({ column }) => {
      return renderComponent(DataTableColumnHeader<TableSchema, unknown>, {
        column,
        title: 'Subjects'
      });
    },
    cell: ({ row }) => renderComponent(DataTableRowSubjects<TableSchema>, { row }),
    enableSorting: false,
    enableHiding: true
  },
  {
    accessorKey: 'createdAt',
    header: ({ column }) => {
      return renderComponent(DataTableColumnHeader<TableSchema, unknown>, {
        column,
        title: 'Created At'
      });
    },
    cell: ({ row }) => {
      const idSnippet = createRawSnippet<[string]>((getCreatedAt) => {
        return {
          render: () => `<div class="w-full">${getCreatedAt()}</div>`
        };
      });

      return renderSnippet(idSnippet, row.getValue('createdAt'));
    },
    enableSorting: true,
    enableHiding: true
  }
];
