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

Vite serves the web app on `http://localhost:5173` and binds to `0.0.0.0` for device/preview testing. A production build can be created with `npm run build`.

## Windows desktop app and MSI installer

The project now includes an Electron desktop wrapper. It serves the packaged app from a loopback-only local server on **port 5180**, keeping the desktop server separate from the existing Vite server on port 5173. If port 5180 is already occupied, the desktop wrapper automatically selects the next available port up to 5199.

Build and launch the desktop app locally:

```bash
npm run build
npm run start:desktop
```

Run the desktop development workflow on the dedicated port:

```bash
npm run dev:desktop
```

Create the Windows x64 MSI installer:

```bash
npm run desktop:build
```

The MSI is emitted to `release/Beacon-Boys-Event-Check-in-1.0.0-Setup.msi`. The repository also contains a GitHub Actions workflow at `.github/workflows/windows-installer.yml` so the MSI can be built on a Windows runner when the project is pushed or when the workflow is manually dispatched.

## Demo interactions

- Use the sidebar to move between Dashboard, Participants, QR passes, Check-in and Reports.
- On **Event check-in**, submit any value in the focused scanner field and press Enter. Use the demo buttons to preview valid, duplicate and invalid outcomes.
- Click the online/offline pill to preview offline mode messaging.
- Use the participant row menu or QR passes page to open a printable pass preview.
