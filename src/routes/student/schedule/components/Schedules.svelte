<script lang="ts">
  import { Calendar } from '@fullcalendar/core';
  import timeGridPlugin from '@fullcalendar/timegrid';
  import { page } from '$app/stores';

  interface Schedule {
    day: string;
    endTime: string;
    id: string;
    startTime: string;
  }

  interface Subject {
    id: string;
    name: string;
    schedules: Schedule[];
  }

  let calendarEl: HTMLElement;
  let calendar: Calendar;

  // Function to convert day string to number (0 = Sunday, 1 = Monday, etc.)
  const getDayNumber = (day: string): number => {
    const days = {
      Sunday: 0,
      Monday: 1,
      Tuesday: 2,
      Wednesday: 3,
      Thursday: 4,
      Friday: 5,
      Saturday: 6
    };
    return days[day as keyof typeof days];
  };

  // Function to check if two time ranges overlap
  const isOverlapping = (start1: string, end1: string, start2: string, end2: string): boolean => {
    const start1Time = new Date(start1).getTime();
    const end1Time = new Date(end1).getTime();
    const start2Time = new Date(start2).getTime();
    const end2Time = new Date(end2).getTime();

    return start1Time < end2Time && end1Time > start2Time;
  };

  // Function to create calendar events from subjects
  const createEvents = (subjects: Subject[]) => {
    const events = [];
    const currentDate = new Date();
    const currentDay = currentDate.getDay();

    // First, create all events
    for (const subject of subjects) {
      for (const schedule of subject.schedules) {
        const scheduleDay = getDayNumber(schedule.day);
        const daysToAdd = scheduleDay - currentDay;
        const eventDate = new Date(currentDate);
        eventDate.setDate(eventDate.getDate() + daysToAdd);

        const startDateTime = `${eventDate.toISOString().split('T')[0]}T${convertTo24Hour(schedule.startTime)}`;
        const endDateTime = `${eventDate.toISOString().split('T')[0]}T${convertTo24Hour(schedule.endTime)}`;

        events.push({
          id: schedule.id,
          title: subject.name,
          start: startDateTime,
          end: endDateTime,
          scheduleDay, // Store the day for overlap checking
          backgroundColor: `hsl(var(--primary))`,
          borderColor: `hsl(var(--primary))`
        });
      }
    }

    // Check for overlaps and update colors
    for (let i = 0; i < events.length; i++) {
      for (let j = i + 1; j < events.length; j++) {
        if (
          events[i].scheduleDay === events[j].scheduleDay && // Same day
          isOverlapping(events[i].start, events[i].end, events[j].start, events[j].end)
        ) {
          // Mark both events as overlapping
          events[i].backgroundColor = 'hsl(var(--destructive))';
          events[i].borderColor = 'hsl(var(--destructive))';
          events[j].backgroundColor = 'hsl(var(--destructive))';
          events[j].borderColor = 'hsl(var(--destructive))';
        }
      }
    }

    return events;
  };

  // Helper function to convert 12-hour format to 24-hour format
  const convertTo24Hour = (time12h: string): string => {
    const [time, modifier] = time12h.split(' ');
    let [hours, minutes] = time.split(':');

    if (hours === '12') {
      hours = '00';
    }

    if (modifier === 'PM') {
      hours = String(parseInt(hours, 10) + 12);
    }

    return `${hours.padStart(2, '0')}:${minutes}:00`;
  };

  const mountCalendar = () => {
    const subjects = $page.data.user?.user_metadata.subjects || [];

    calendar = new Calendar(calendarEl, {
      plugins: [timeGridPlugin],
      initialView: 'timeGridWeek',
      headerToolbar: {
        left: '',
        center: 'title',
        right: ''
      },
      allDayText: '',
      slotMinTime: '07:00:00',
      slotMaxTime: '21:00:00',
      slotDuration: '00:30:00',
      slotLabelInterval: '00:30',
      slotLabelFormat: {
        hour: 'numeric',
        minute: '2-digit',
        meridiem: 'short'
      },
      events: createEvents(subjects),
      height: 'auto',
      nowIndicator: true,
      eventContent: (arg) => {
        const formatTime = (date: Date) => {
          return date.toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
          });
        };

        return {
          html: `
            <div class="flex flex-col gap-0.5 p-1">
              <div class="font-medium text-xs">${arg.event.title.split(' - ')[0]}</div>
              <div class="text-[15px] opacity-75">${formatTime(arg.event.start as Date)} - ${formatTime(arg.event.end as Date)}</div>
            </div>
          `
        };
      }
    });

    calendar.render();
  };

  $effect(() => {
    mountCalendar();
    return () => {
      calendar.destroy();
    };
  });
</script>

<div class="rounded-lg border bg-background">
  <style>
    :global(.fc) {
      --fc-border-color: hsl(var(--border));
      --fc-page-bg-color: transparent;
      --fc-neutral-bg-color: transparent;
      --fc-today-bg-color: hsl(var(--muted) / 0.3);
      --fc-now-indicator-color: hsl(var(--primary));
    }

    :global(.fc .fc-button) {
      @apply rounded-md border px-3 py-1.5 text-xs font-medium shadow-none;
      @apply bg-background transition-colors hover:bg-muted;
      @apply disabled:opacity-50;
    }

    :global(.fc .fc-toolbar-title) {
      @apply text-lg font-semibold;
    }

    :global(.fc .fc-toolbar.fc-header-toolbar) {
      @apply mb-4 px-4 pt-4;
    }

    :global(.fc th) {
      @apply border-border bg-muted/30 px-3 py-2 text-xs font-medium;
    }

    :global(.fc td) {
      @apply border-border;
    }

    :global(.fc-timegrid-slot) {
      @apply h-8;
    }

    :global(.fc-timegrid-slot-label) {
      @apply text-xs text-muted-foreground;
    }

    :global(.fc-timegrid-slot.fc-timegrid-slot-minor) {
      @apply border-border/30;
    }

    :global(.fc-event) {
      @apply rounded-sm border-none bg-primary text-primary-foreground !important;
    }

    :global(.fc-timegrid-now-indicator-line) {
      @apply border-primary;
    }

    :global(.fc-timegrid-now-indicator-arrow) {
      @apply border-primary;
    }
  </style>

  <div bind:this={calendarEl} class="min-h-[600px] w-full"></div>
</div>
