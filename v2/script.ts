renderCalendar();
const _eventC = getEventCFromLocalStorage();

if (_eventC) {
  eventC.push(..._eventC);
}

renderEventC(eventC);
