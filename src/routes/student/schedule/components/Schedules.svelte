<script lang="ts">
  import { browser } from '$app/environment';
  import { page } from '$app/stores';
  import { convertTo24Hour, findConflicts } from '$lib';
  import { Calendar } from '@fullcalendar/core';
  import dayGridPlugin from '@fullcalendar/daygrid';
  import timeGridPlugin from '@fullcalendar/timegrid';

  let calendar: Calendar;
  let calendarEl: HTMLElement;

  const transformSchedulesToEvents = (subjects: any[]) => {
    const events = [];
    const daysMap: Record<string, number> = {
      Sunday: 0,
      Monday: 1,
      Tuesday: 2,
      Wednesday: 3,
      Thursday: 4,
      Friday: 5,
      Saturday: 6
    };

    const conflictingSubjects = new Set(
      conflicts.flatMap((conflict) => [conflict.subject1, conflict.subject2])
    );

    for (const subject of subjects) {
      for (const schedule of subject.schedules) {
        const date = new Date();
        const targetDay = daysMap[schedule.day];
        const currentDay = date.getDay();
        date.setDate(date.getDate() + ((targetDay + 7 - currentDay) % 7));

        const isConflicting = conflictingSubjects.has(subject.name);

        events.push({
          title: subject.name,
          startTime: convertTo24Hour(schedule.startTime),
          endTime: convertTo24Hour(schedule.endTime),
          daysOfWeek: [targetDay],
          backgroundColor: isConflicting ? '#FFE5E5' : generatePastelColor(subject.id),
          borderColor: isConflicting ? '#FF0000' : generatePastelColor(subject.id),
          textColor: isConflicting ? '#FF0000' : '#000000',
          extendedProps: {
            department: subject.name.split('-')[0].trim(),
            isConflicting
          }
        });
      }
    }
    return events;
  };

  const generatePastelColor = (seed: string) => {
    // Simple hash function to generate consistent colors for the same subject
    let hash = 0;
    for (let i = 0; i < seed.length; i++) {
      hash = seed.charCodeAt(i) + ((hash << 5) - hash);
    }

    const hue = hash % 360;
    return `hsl(${hue}, 70%, 80%)`;
  };

  const renderCalendar = () => {
    calendar = new Calendar(calendarEl, {
      plugins: [dayGridPlugin, timeGridPlugin],
      initialView: 'timeGridWeek',
      headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'timeGridWeek,timeGridDay'
      },
      initialDate: new Date(),
      nowIndicator: true,
      slotMinTime: '06:00:00',
      slotMaxTime: '22:00:00',
      events: transformSchedulesToEvents($page.data.user?.user_metadata.subjects || []),
      height: 'auto',
      allDayText: '',
      slotDuration: '00:15:00',
      slotLabelInterval: '00:15:00',
      slotLabelFormat: {
        hour: 'numeric',
        minute: '2-digit',
        meridiem: 'short',
        hour12: true
      },
      eventTimeFormat: {
        hour: 'numeric',
        minute: '2-digit',
        meridiem: 'short'
      },
      eventDidMount: (info) => {
        if (info.event.extendedProps.isConflicting) {
          const element = info.el;
          element.style.border = '2px solid red';
        }
      }
    });
  };

  $effect(() => {
    if (browser) {
      renderCalendar();
      calendar.render();
    }

    return () => {
      calendar.destroy();
    };
  });

  const conflicts = $derived(findConflicts($page.data.user?.user_metadata.subjects || []));
</script>

{#if conflicts.length > 0}
  <div class="mt-4 rounded-md border border-red-200 bg-red-50 p-4">
    <h3 class="mb-2 text-sm font-semibold text-red-800">Schedule Conflicts Detected:</h3>
    <ul class="list-disc pl-5">
      {#each conflicts as conflict}
        <li class="text-sm text-red-700">
          Conflict between "{conflict.subject1}" and "{conflict.subject2}" on {conflict.day} at {conflict.time}
        </li>
      {/each}
    </ul>
  </div>
{/if}
<div bind:this={calendarEl} class="mt-4"></div>
