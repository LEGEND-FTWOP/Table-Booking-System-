# The Royal Courtyard — Restaurant Table & Reservation Management System

A web-based table reservation and floor management system built for **The Royal Courtyard**, a fine Indian dining restaurant. 

I developed this application as part of my web development internship project. The goal was to build a complete, responsive front-of-house management tool using **pure HTML, CSS, and JavaScript**, without relying on external libraries or frameworks like React, Bootstrap, or Tailwind.

---

## Quick Start (How to Run)

No installations or build steps are needed.

1. Clone or download this folder.
2. Double-click `index.html` to open it directly in any browser (Chrome, Edge, Firefox, etc.).
   - Alternatively, if you use VS Code, right-click `index.html` and choose **"Open with Live Server"**.
3. Sign in using any of the demo accounts listed below.

---

## Demo Accounts & Logins

The application includes role-based access control (RBAC). Each role has its own workspace and permissions:

| Role | Username / Email | Password | Logged In User | What They Can Do |
| :--- | :--- | :--- | :--- | :--- |
| **Admin** | `admin` *(or `admin@courtyard.in`)* | `admin` | Aarav Choudhury | Full system access: view revenue, manage tables, access all reports and customer data. |
| **Manager** | `manager` *(or `manager@courtyard.in`)* | `manager` | Sunil Rao | Operations focus: manage reservations, handle the waitlist, view shift reports and guest history. |
| **Staff** | `staff` *(or `staff@courtyard.in`)* | `staff` | Deepika Nair | Floor host focus: live floor plan, seating guests, managing the walk-in waitlist queue. Financial pages are locked. |

*You can also use the **"Register New Account"** tab on the login screen to create a new user.*

---

## What the System Does

### 1. Role-Based Login & Dashboards
- Separate dashboards and greetings for Admin, Manager, and Staff.
- When an employee logs in, the system displays their personalized role banner (e.g., *"Welcome to Manager Dashboard"*) and applies permissions automatically.
- Staff members cannot access financial numbers or modify table architecture (they see a clear access-restricted notice instead).

### 2. Live Floor Plan & Table Layout
- Visual representation of the restaurant across 4 dining areas:
  - **Main Dining** (booths and standard tables)
  - **Outdoor Patio** (outdoor seating)
  - **VIP Lounge** (royal booths)
  - **Rooftop Terrace** (skyline view tables)
- Tables are color-coded in real time:
  - **Green (Available):** Ready for walk-in or new booking.
  - **Yellow (Reserved):** Booked for an upcoming slot.
  - **Red (Occupied):** Guests currently dining.
  - **Grey (Out of Service):** Temporarily unavailable.
- Clicking any table opens an inspector with details about the current guests, server notes, and quick action buttons to change status.

### 3. Reservation Management
- Create, view, edit, and track reservations.
- Status workflow: `Pending` → `Confirmed` → `Seated` → `Completed` / `Cancelled`.
- Filter bookings by date, dining area, or status, or search directly by guest name or phone number.
- Generates a digital confirmation slip that can be printed or viewed like a booking receipt.

### 4. Real-Time Table Availability Engine
- Check table availability for any date, time slot (12:00 PM to 10:30 PM), and party size before confirming a booking.

### 5. Walk-In Waitlist & Quick Seating
- Add walk-in parties to a waiting queue with party size, estimated wait time, and seating preferences.
- When a table frees up, click **"Seat Party"** to instantly assign the table, create a booking record, and mark the table as Occupied.

### 6. Customer CRM & VIP Directory
- Keeps a record of returning guests, visit counts, total spending in Indian Rupees (₹), and dietary preferences (Pure Veg, Jain, Halal, Gluten-Free, Allergies).
- High-frequency guests get an automatic **Royal VIP** badge.

### 7. Reports & Analytics (Admin & Manager)
- Live calculations of today's total reservations, current occupancy rate, and projected revenue in ₹ (INR).
- Breakdown of table occupancy across sections.

### 8. Dark / Light Mode
- Includes a toggle in the top navigation bar to switch between Light theme and a royal Dark Purple theme.

---

## Tech Stack & Architecture

- **HTML5:** Semantic markup, modal overlays, accessible form controls.
- **CSS3:** Built using CSS variables (custom properties), flexbox, CSS grid, glassmorphism effects, and responsive breakpoints for mobile/tablet/desktop.
- **JavaScript (ES6+):** 
  - Written in modular vanilla JS without any external libraries.
  - Uses an internal reactive store pattern (`Store`) that notifies UI components whenever state changes (e.g. when a table is seated or a booking is cancelled).
  - All data is saved to browser `localStorage`, so your bookings, waitlist changes, and active login state persist even after refreshing the page.

---

## Project Structure

```text
internship/
├── index.html          # Main HTML structure and UI modals
├── style.css           # Custom styling, color system, and layout rules
├── script.js           # App logic, state management, and event handlers
├── README.md           # Project documentation and submission guide
└── assets/             # Local images used in the project
    ├── avatar-aarav.jpg        # Admin profile image (Aarav)
    ├── avatar-sunil.jpg        # Manager profile image (Sunil)
    ├── avatar-deepika.jpg      # Staff profile image (Deepika)
    └── avatar-deepika-full.jpg # Source image backup
```

---

## Author

- **Project:** Capstone Restaurant Table Reservation & Floor Management System
- **Role:** Web Development Intern
- **Submission Date:** October 2026
