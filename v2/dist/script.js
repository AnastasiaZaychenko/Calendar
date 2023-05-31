renderCalendar();
var _eventC = getEventCFromLocalStorage();
if (_eventC) {
    eventC.push.apply(eventC, _eventC);
}
renderEventC(eventC);
