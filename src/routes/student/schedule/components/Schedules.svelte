<script lang="ts">
  import { page } from '$app/stores';
  import { Calendar } from '@fullcalendar/core';
  import dayGridPlugin from '@fullcalendar/daygrid';
  import timeGridPlugin from '@fullcalendar/timegrid';
  import { onMount } from 'svelte';

  let calendarEl: HTMLElement;
  let conflictingSchedules: { subject1: string; subject2: string; day: string; time: string }[] =
    [];

  function checkTimeOverlap(start1: string, end1: string, start2: string, end2: string): boolean {
    const [start1Hours, start1Mins] = convertTo24Hour(start1).split(':').map(Number);
    const [end1Hours, end1Mins] = convertTo24Hour(end1).split(':').map(Number);
    const [start2Hours, start2Mins] = convertTo24Hour(start2).split(':').map(Number);
    const [end2Hours, end2Mins] = convertTo24Hour(end2).split(':').map(Number);

    const start1Time = start1Hours * 60 + start1Mins;
    const end1Time = end1Hours * 60 + end1Mins;
    const start2Time = start2Hours * 60 + start2Mins;
    const end2Time = end2Hours * 60 + end2Mins;

    return start1Time < end2Time && end1Time > start2Time;
  }

  function findConflicts(subjects: any[]) {
    const conflicts = [];

    for (let i = 0; i < subjects.length; i++) {
      for (let j = i + 1; j < subjects.length; j++) {
        const subject1 = subjects[i];
        const subject2 = subjects[j];

        // Check each schedule combination
        for (const schedule1 of subject1.schedules) {
          for (const schedule2 of subject2.schedules) {
            if (schedule1.day === schedule2.day) {
              if (
                checkTimeOverlap(
                  schedule1.startTime,
                  schedule1.endTime,
                  schedule2.startTime,
                  schedule2.endTime
                )
              ) {
                conflicts.push({
                  subject1: subject1.name,
                  subject2: subject2.name,
                  day: schedule1.day,
                  time: `${schedule1.startTime} - ${schedule1.endTime}`
                });
              }
            }
          }
        }
      }
    }

    return conflicts;
  }

  function transformSchedulesToEvents(subjects: any[]) {
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

    conflictingSchedules = findConflicts(subjects);
    const conflictingSubjects = new Set(
      conflictingSchedules.flatMap((conflict) => [conflict.subject1, conflict.subject2])
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
  }

  function convertTo24Hour(timeStr: string) {
    const [time, period] = timeStr.split(' ');
    let [hours, minutes] = time.split(':');
    let hour = parseInt(hours);

    if (period === 'PM' && hour !== 12) {
      hour += 12;
    } else if (period === 'AM' && hour === 12) {
      hour = 0;
    }

    return `${hour.toString().padStart(2, '0')}:${minutes}`;
  }

  function generatePastelColor(seed: string) {
    // Simple hash function to generate consistent colors for the same subject
    let hash = 0;
    for (let i = 0; i < seed.length; i++) {
      hash = seed.charCodeAt(i) + ((hash << 5) - hash);
    }

    const hue = hash % 360;
    return `hsl(${hue}, 70%, 80%)`;
  }

  onMount(() => {
    const calendar = new Calendar(calendarEl, {
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

    calendar.render();

    return () => {
      calendar.destroy();
    };
  });
</script>

{#if conflictingSchedules.length > 0}
  <div class="mt-4 rounded-md border border-red-200 bg-red-50 p-4">
    <h3 class="mb-2 font-semibold text-red-800">Schedule Conflicts Detected:</h3>
    <ul class="list-disc pl-5">
      {#each conflictingSchedules as conflict}
        <li class="text-red-700">
          Conflict between "{conflict.subject1}" and "{conflict.subject2}" on {conflict.day} at {conflict.time}
        </li>
      {/each}
    </ul>
  </div>
{/if}
<div bind:this={calendarEl} class="mt-4"></div>
