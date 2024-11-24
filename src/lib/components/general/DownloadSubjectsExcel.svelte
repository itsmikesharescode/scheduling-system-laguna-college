<script lang="ts">
  import Button from '$lib/components/ui/button/button.svelte';
  import type { Subject } from '$lib/types/database/aux.types';
  import * as XLSX from 'xlsx';
  import FileDown from 'lucide-svelte/icons/file-down';

  interface Props {
    subjects: Subject[];
  }

  const { subjects }: Props = $props();

  const downloadExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(
      subjects.map((subject) => {
        return {
          'Subject Code': subject.name.split(' - ')[0],
          Schedules: subject.schedules
            .map((schedule) => `${schedule.day} ${schedule.startTime}-${schedule.endTime}  `)
            .join('\n')
        };
      })
    );

    // Adjust column widths for better readability
    const cols = [
      { wch: 30 }, // Subject Name
      { wch: 15 }, // Subject ID
      { wch: 40 } // Schedules
    ];
    worksheet['!cols'] = cols;

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Subjects');
    XLSX.writeFile(workbook, 'subject_schedules.xlsx');
  };
</script>

<Button onclick={downloadExcel}>Download Excel <FileDown /></Button>
