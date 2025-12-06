function generateCalendar() {
    const year = parseInt(document.getElementById('yearInput').value);
    if (isNaN(year) || year < 0 || year > 3000) {
        alert('Please enter a valid year between 0 and 3000.');
        return;
    }

    const calendarData = generateCalendarData(year);
    const calendarDiv = document.getElementById('calendar');
    calendarDiv.innerHTML = '';

    calendarData.forEach(month => {
        const monthDiv = document.createElement('div');
        monthDiv.className = 'month';

        const title = document.createElement('h3');
        title.textContent = `${month.name} ${year}`;
        monthDiv.appendChild(title);

        const daysDiv = document.createElement('div');
        daysDiv.className = 'days';

        // Days of week headers
        const daysOfWeek = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
        daysOfWeek.forEach(day => {
            const dayHeader = document.createElement('div');
            dayHeader.className = 'day day-header';
            dayHeader.textContent = day;
            daysDiv.appendChild(dayHeader);
        });

        // Days
        month.days.forEach(day => {
            const dayDiv = document.createElement('div');
            dayDiv.className = 'day';
            dayDiv.textContent = day;
            daysDiv.appendChild(dayDiv);
        });

        monthDiv.appendChild(daysDiv);
        calendarDiv.appendChild(monthDiv);
    });
}
