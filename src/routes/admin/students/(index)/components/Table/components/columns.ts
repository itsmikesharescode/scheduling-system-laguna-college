import type { ColumnDef } from '@tanstack/table-core';
import { createRawSnippet } from 'svelte';
import type { StudentPageSchema } from '../data/schemas.js';
import {
  TableColumnHeader,
  TableRowActions,
  TableSectionsCell,
  TableSubjectsCell
} from './index.js';
import { renderComponent, renderSnippet } from '$lib/components/ui/data-table/render-helpers.js';

export const columns: ColumnDef<StudentPageSchema>[] = [
  {
    accessorKey: 'studentId',
    header: ({ column }) => {
      return renderComponent(TableColumnHeader<StudentPageSchema, unknown>, {
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
    enableSorting: true,
    enableHiding: false
  },

  {
    accessorKey: 'email',
    header: ({ column }) => {
      return renderComponent(TableColumnHeader<StudentPageSchema, unknown>, {
        column,
        title: 'Email'
      });
    },
    cell: ({ row }) => {
      const emailSnippet = createRawSnippet<[string]>((getEmail) => {
        return {
          render: () => `<div class="w-full">${getEmail()}</div>`
        };
      });

      return renderSnippet(emailSnippet, row.getValue('email'));
    },
    enableSorting: true,
    enableHiding: true
  },

  {
    accessorKey: 'lastName',
    accessorFn: (row) => `${row.lastName}, ${row.firstName} ${row.middleName}`,
    header: ({ column }) => {
      return renderComponent(TableColumnHeader<StudentPageSchema, unknown>, {
        column,
        title: 'Full Name'
      });
    },
    cell: ({ row }) => {
      const fullNameSnippet = createRawSnippet<[string]>((getFullName) => {
        return {
          render: () => `<div class="w-full">${row.getValue('lastName')}</div>`
        };
      });

      return renderSnippet(fullNameSnippet, row.getValue('lastName'));
    },
    enableSorting: true,
    enableHiding: true
  },

  {
    accessorKey: 'gender',
    header: ({ column }) => {
      return renderComponent(TableColumnHeader<StudentPageSchema, unknown>, {
        column,
        title: 'Gender'
      });
    },
    cell: ({ row }) => {
      const genderSnippet = createRawSnippet<[string]>((getGender) => {
        return {
          render: () => `<div class="w-full">${getGender()}</div>`
        };
      });

      return renderSnippet(genderSnippet, row.getValue('gender'));
    },
    enableSorting: true,
    enableHiding: true
  },
  {
    accessorKey: 'yearLevel',
    header: ({ column }) => {
      return renderComponent(TableColumnHeader<StudentPageSchema, unknown>, {
        column,
        title: 'Year Level'
      });
    },
    cell: ({ row }) => {
      const yearLevelSnippet = createRawSnippet<[string]>((getYearLevel) => {
        return {
          render: () => `<div class="w-full">${getYearLevel()}</div>`
        };
      });

      return renderSnippet(yearLevelSnippet, row.getValue('yearLevel'));
    },
    enableSorting: true,
    enableHiding: true
  },

  {
    accessorKey: 'course',
    header: ({ column }) => {
      return renderComponent(TableColumnHeader<StudentPageSchema, unknown>, {
        column,
        title: 'Course'
      });
    },
    cell: ({ row }) => {
      const courseSnippet = createRawSnippet<[string]>((getCourse) => {
        return {
          render: () => `<div class="w-full">${getCourse()}</div>`
        };
      });

      return renderSnippet(courseSnippet, row.getValue('course'));
    },
    enableSorting: true,
    enableHiding: true
  },

  {
    accessorKey: 'sections',
    id: 'sections',
    header: ({ column }) => {
      return renderComponent(TableColumnHeader<StudentPageSchema, unknown>, {
        column,
        title: 'Sections'
      });
    },
    cell: ({ row }) => renderComponent(TableSectionsCell, { row }),
    enableSorting: false,
    enableHiding: true
  },

  {
    accessorKey: 'subjects',
    id: 'subjects',
    header: ({ column }) => {
      return renderComponent(TableColumnHeader<StudentPageSchema, unknown>, {
        column,
        title: 'Subjects'
      });
    },
    cell: ({ row }) => renderComponent(TableSubjectsCell, { row }),
    enableSorting: false,
    enableHiding: true
  },

  {
    accessorKey: 'created_at',
    id: 'created_at',
    header: ({ column }) => {
      return renderComponent(TableColumnHeader<StudentPageSchema, unknown>, {
        column,
        title: 'Created At'
      });
    },
    cell: ({ row }) => {
      const createdAtSnippet = createRawSnippet<[string]>((getCreatedAt) => {
        return {
          render: () =>
            `<div class="w-[180px]">${new Date(getCreatedAt()).toLocaleDateString()} @ ${new Date(getCreatedAt()).toLocaleTimeString()}</div>`
        };
      });

      return renderSnippet(createdAtSnippet, row.getValue('created_at'));
    },
    enableSorting: true,
    enableHiding: true
  },

  {
    id: 'actions',
    cell: ({ row }) => renderComponent(TableRowActions<StudentPageSchema>, { row })
  }
];
