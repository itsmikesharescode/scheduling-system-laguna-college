import type { ColumnDef } from '@tanstack/table-core';
import { createRawSnippet } from 'svelte';
import type { UserSchema } from './schema';
import {
  DataTableCheckbox,
  DataTableColumnHeader,
  DataTableRowActions,
  DataTableRowSections,
  DataTableRowSubjects,
  DataTableTitleCell
} from './index';
import { renderComponent, renderSnippet } from '$lib/components/ui/data-table';

export const columns: ColumnDef<UserSchema>[] = [
  {
    accessorKey: 'studentId',
    header: ({ column }) => {
      return renderComponent(DataTableColumnHeader<UserSchema, unknown>, {
        column,
        title: 'Student ID'
      });
    },
    cell: ({ row }) => {
      const idSnippet = createRawSnippet<[string]>((getStudId) => {
        return {
          render: () => `<div class="w-[80px]">${getStudId()}</div>`
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
      return renderComponent(DataTableColumnHeader<UserSchema, unknown>, {
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
      return renderComponent(DataTableColumnHeader<UserSchema, unknown>, {
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
      return renderComponent(DataTableColumnHeader<UserSchema, unknown>, {
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
    accessorKey: 'course',
    header: ({ column }) => {
      return renderComponent(DataTableColumnHeader<UserSchema, unknown>, {
        column,
        title: 'Course'
      });
    },
    cell: ({ row }) => {
      const idSnippet = createRawSnippet<[string]>((getCourse) => {
        return {
          render: () => `<div class="w-full">${getCourse()}</div>`
        };
      });

      return renderSnippet(idSnippet, row.getValue('course'));
    },
    enableSorting: true,
    enableHiding: true
  },
  {
    accessorKey: 'yearLevel',
    header: ({ column }) => {
      return renderComponent(DataTableColumnHeader<UserSchema, unknown>, {
        column,
        title: 'Year Level'
      });
    },
    cell: ({ row }) => {
      const idSnippet = createRawSnippet<[string]>((getYearLevel) => {
        return {
          render: () => `<div class="w-full">${getYearLevel()}</div>`
        };
      });

      return renderSnippet(idSnippet, row.getValue('yearLevel'));
    },
    enableSorting: true,
    enableHiding: true
  },
  {
    accessorKey: 'sections',
    id: 'sections',
    header: ({ column }) => {
      return renderComponent(DataTableColumnHeader<UserSchema, unknown>, {
        column,
        title: 'Sections'
      });
    },
    cell: ({ row }) => renderComponent(DataTableRowSections<UserSchema>, { row }),
    enableSorting: false,
    enableHiding: true
  },
  {
    accessorKey: 'subjects',
    id: 'subjects',
    header: ({ column }) => {
      return renderComponent(DataTableColumnHeader<UserSchema, unknown>, {
        column,
        title: 'Subjects'
      });
    },
    cell: ({ row }) => renderComponent(DataTableRowSubjects<UserSchema>, { row }),
    enableSorting: false,
    enableHiding: true
  },
  {
    accessorKey: 'createdAt',
    header: ({ column }) => {
      return renderComponent(DataTableColumnHeader<UserSchema, unknown>, {
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
  },
  {
    id: 'actions',
    cell: ({ row }) => renderComponent(DataTableRowActions<UserSchema>, { row })
  }
];
