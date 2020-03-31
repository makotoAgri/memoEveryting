function creat5minEventNow(p, title, description){
  if (!title) {
    const title = 'None';
  };
  if (!description) {
    const description = '';
  };
  const date = new Date();
  const timestamp = Utilities.formatDate(date,'JST','yyyy年MM月dd日 HH:mm:ss');
  const endDate = new Date(Date.parse(date) + (5 * 60 * 1000));
  const calendar = CalendarApp.getCalendarById(p.CALENDAR_ID);
  const event = calendar.createEvent(title, date, endDate);
  event.setDescription(description);
  return {event:event, calendar:calendar};
}