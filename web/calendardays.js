// Function to check if a year is a leap year
function isLeapYear(year) {
    if (year % 4 !== 0) return false;
    if (year % 100 !== 0) return true;
    return year % 400 === 0;
}

// Function to get the day of the week for January 1st of a given year
function dayOfWeek(year) {
    let y = year;
    let m = 1; // January
    if (m === 1 || m === 2) {
        m += 12;
        y--;
    }
    const K = y % 100;
    const J = Math.floor(y / 100);
    let h = (1 + Math.floor((13 * (m + 1)) / 5) + K + Math.floor(K / 4) + Math.floor(J / 4) - 2 * J) % 7;
    return (h + 1) % 7; // 0=Sunday, 1=Monday, ..., 6=Saturday
}

// Function to get the number of days in a month
function daysInMonth(month, year) {
    const days = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    if (month === 2 && isLeapYear(year)) return 29;
    return days[month - 1];
}

// Function to generate calendar data for a year
function generateCalendarData(year) {
    const months = ["January", "February", "March", "April", "May", "June",
                    "July", "August", "September", "October", "November", "December"];
    let startDay = dayOfWeek(year);
    const calendar = [];

    for (let month = 1; month <= 12; month++) {
        const monthData = {
            name: months[month - 1],
            days: []
        };

        // Leading empty days
        for (let i = 0; i < startDay; i++) {
            monthData.days.push('');
        }

        // Days of the month
        const numDays = daysInMonth(month, year);
        for (let day = 1; day <= numDays; day++) {
            monthData.days.push(day);
        }

        calendar.push(monthData);

        // Update startDay for next month
        startDay = (startDay + numDays) % 7;
    }

    return calendar;
}
