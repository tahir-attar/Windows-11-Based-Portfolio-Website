# Tahir Attar Portfolio — Windows OS-themed personal portfolio

## Overview

A creative portfolio website built as a Windows 11 desktop emulation using Next.js. The application renders a fully interactive Windows-like operating system interface in the browser, complete with draggable windows, a taskbar, start menu, and various "applications" like a terminal, browser, and settings. On mobile devices, it falls back to a traditional portfolio layout.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: Next.js 12 with React 17, using TypeScript throughout
- **Styling**: Styled-components with a comprehensive theming system supporting dark/light modes
- **State Management**: Redux with redux-thunk for async actions, wrapped with next-redux-wrapper for SSR compatibility
- **Component Pattern**: Each component follows a consistent structure with separate files for logic (.tsx), styles (.styles.tsx), tests (.spec.tsx), Storybook stories (.stories.tsx), and sometimes configuration (.config.ts)

### Design System
- Centralized in `/design-system/` with global styles, reusable CSS utilities, and theme variables
- Themes defined in `system-design-variables.ts` with colors, typography, spacing, breakpoints, and shadows
- `useSystemDesign` hook provides typed theme objects for styled-components ThemeProvider

### Backend Architecture
- **API Routes**: Next.js API routes in `/pages/api/` with controllers in `/backend/controllers/`
- **Database**: MongoDB with Mongoose ODM, models defined in `/backend/models/`
- **Middleware**: Custom error handling (`catchErrors.ts`, `onError.ts`) and API feature utilities (filtering, sorting, pagination)

### Window Management
- Windows are managed through Redux state (`openedWindows` array)
- Each window can contain different app components (Terminal, Browser, Settings, etc.)
- Draggable and resizable using `react-rnd` library

### Testing
- Jest with Enzyme for unit testing
- Tests colocated with components following `.spec.tsx` naming
- Storybook for component documentation and visual testing

## External Dependencies

### Third-Party Services
- **SendGrid**: Email sending for contact form (`@sendgrid/mail`)
- **Cloudinary**: Image hosting (configured in `next.config.js` for Next.js Image optimization)
- **MongoDB**: Database for storing likes, comments, and other persistent data

### Key Libraries
- **axios**: HTTP client for API requests
- **formik + yup**: Form handling and validation
- **react-calendar**: Calendar widget
- **react-rnd**: Draggable/resizable window components
- **react-ticker**: Scrolling ticker for comments display
- **terminal-in-react**: Terminal emulation component
- **mongoose**: MongoDB ODM

### Environment Variables Required
- `DB_URI`: MongoDB connection string
- `SENDGRID_API_KEY`: SendGrid API key for emails
- `GOOGLE_EMAIL_ADDRESS`: Recipient email for contact form