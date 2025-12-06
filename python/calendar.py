import pygame
import sys

# Initialize Pygame
pygame.init()

# Colors
WHITE = (255, 255, 255)
BLACK = (0, 0, 0)
GRAY = (200, 200, 200)

# Font
font = pygame.font.SysFont(None, 24)
small_font = pygame.font.SysFont(None, 18)

# Function to check if a year is a leap year
def is_leap_year(year):
    if year % 4 != 0:
        return False
    if year % 100 != 0:
        return True
    return year % 400 == 0

# Function to get the day of the week for January 1st of a given year
def day_of_week(year):
    y = year
    m = 1  # January
    if m == 1 or m == 2:
        m += 12
        y -= 1
    K = y % 100
    J = y // 100
    h = (1 + (13 * (m + 1)) // 5 + K + K // 4 + J // 4 - 2 * J) % 7
    return (h + 1) % 7  # 0=Sunday, 1=Monday, ..., 6=Saturday

# Function to get the number of days in a month
def days_in_month(month, year):
    days = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
    if month == 2 and is_leap_year(year):
        return 29
    return days[month - 1]

# Function to draw the calendar for a month
def draw_month(screen, month, year, start_day, x, y):
    months = ["January", "February", "March", "April", "May", "June",
              "July", "August", "September", "October", "November", "December"]
    days = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"]

    # Month title
    title = font.render(f"{months[month-1]} {year}", True, BLACK)
    screen.blit(title, (x, y))

    y += 30

    # Days of week
    for i, day in enumerate(days):
        day_text = small_font.render(day, True, BLACK)
        screen.blit(day_text, (x + i * 40, y))

    y += 20

    # Days
    day = 1
    current_day = start_day
    row = 0
    while day <= days_in_month(month, year):
        for col in range(7):
            if row == 0 and col < current_day:
                pass  # Leading spaces
            elif day <= days_in_month(month, year):
                day_text = small_font.render(str(day), True, BLACK)
                screen.blit(day_text, (x + col * 40, y + row * 20))
                day += 1
            else:
                break
        row += 1

def main():
    year = int(input("Enter year (0-3000): "))
    if year < 0 or year > 3000:
        print("Invalid year.")
        return

    screen = pygame.display.set_mode((800, 600))
    pygame.display.set_caption(f"Calendar {year}")

    start_day = day_of_week(year)

    running = True
    while running:
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                running = False

        screen.fill(WHITE)

        # Draw 12 months in a grid
        for month in range(1, 13):
            col = (month - 1) % 4
            row = (month - 1) // 4
            x = col * 200
            y = row * 150 + 50
            draw_month(screen, month, year, start_day, x, y)
            # Update start_day for next month
            start_day = (start_day + days_in_month(month, year)) % 7

        pygame.display.flip()

    pygame.quit()
    sys.exit()

if __name__ == "__main__":
    main()
