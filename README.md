# Beacon Boys Event Operations

A responsive event registration, QR pass and check-in operations interface for the Beacon Boys mentorship programme.

## What is included

- Live event dashboard with attendance progress, parish breakdown and recent scan activity.
- Event management, participants, approvals, parish/mentor directories and role-aware settings views.
- Printable QR pass centre with real QR rendering, boy and mentor pass variants, secure credential preview and print/PDF actions.
- Fast check-in screen designed for phone camera workflows, PDA scanners and USB keyboard-wedge scanners.
- Auto-focused scanner input that processes credentials on Enter, plus valid, duplicate, wrong-event and invalid verification states.
- Online/offline mode control, station selection, sound/vibration state and scan audit history.
- Reports for check-ins, missing participants, parish attendance and scan audit exports.
- Responsive layout for desktop, tablet and mobile widths.

This repository currently contains the frontend experience and realistic seeded data so the workflow can be reviewed end-to-end. The cards and actions are intentionally wired as frontend interactions/toasts; the central PostgreSQL API, authentication, sync queue and persistent audit services can be connected behind the existing screens.

## Run locally

```bash
npm install
npm run dev
```

Vite serves the app on `http://localhost:5173` and binds to `0.0.0.0` for device/preview testing. A production build can be created with `npm run build`.

## Demo interactions

- Use the sidebar to move between Dashboard, Participants, QR passes, Check-in and Reports.
- On **Event check-in**, submit any value in the focused scanner field and press Enter. Use the demo buttons to preview valid, duplicate and invalid outcomes.
- Click the online/offline pill to preview offline mode messaging.
- Use the participant row menu or QR passes page to open a printable pass preview.
