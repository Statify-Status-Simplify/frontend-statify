# Tech Stack & UI/UX Guidelines

## Tech Stack
- **Framework:** React 18+ (Initialized via Vite)
- **Styling:** Tailwind CSS (Strictly required; do not use raw CSS or SCSS).
- **Icons:** Lucide React or Heroicons.
- **Data Fetching:** Axios combined with React Query (`@tanstack/react-query`) for caching and automatic refetching.
- **Routing:** React Router v6.
- **Charts (Future scope):** Recharts or Chart.js.

## Directory Structure
- `src/components`: Shared components (Button, Input, Card, Modal, Toast).
- `src/pages`: Main views (Dashboard, CreateMonitor, Settings).
- `src/services`: Axios functions for communicating with the Spring Boot API.
- `src/hooks`: Custom React hooks (e.g., `useMonitors()`).
- `src/utils`: Utility functions (date formatting, calculation helpers).

## Layout Requirements
- The layout should consist of a Sidebar (for navigation) and a Main Content area.
- The Dashboard should display a list of Monitors in a Grid (Card view) or Table format.
- Use clear color coding to indicate status (Green = UP, Red = DOWN, Gray = PAUSED).