# AI Safety Incident Dashboard

A frontend application for tracking and reporting AI safety incidents, built with React and TypeScript.

![Dashboard Screenshot](./screenshot.png) *(Optional: Add screenshot path)*

## Features
- View, filter, and sort AI safety incidents
- Report new incidents with severity classification
- Responsive design for all screen sizes
- Client-side state management

## Technologies
- **Framework**: React 18
- **Language**: TypeScript
- **Styling**: CSS Modules
- **Build Tool**: Vite
- **Date Handling**: date-fns

## Installation

### Prerequisites
- Node.js (v18 or higher)
- npm (v9 or higher) or yarn

### Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/Pranjal-54/AI-Safety-Incident-Dashboard.git
   cd AI-Safety-Incident-Dashboard
2. Install dependencies:
```bash
npm install
# or
yarn install
```
3. Run the development server:
```bash
npm run dev
# or
yarn dev
```
4. Open in browser:
```bash
http://localhost:5173
```

## Project Structure
```
/src
├── components/       # React components
├── data/            # Mock incident data
├── types/           # TypeScript interfaces
├── App.tsx          # Root component
└── main.tsx         # Entry point
```

## Design Decisions
- State Management: Used React hooks (useState) instead of Redux since the application state is relatively simple
- Styling: Chose CSS Modules for component-scoped styles without external dependencies
- Form Handling: Implemented client-side validation before submission
- Responsiveness: Used Flexbox/Grid for layouts that adapt to different screen sizes

## Challenges & Solutions

### 1. Incident Data Synchronization
**Challenge**:  
Initial implementation caused duplicate incidents when:
- Mock data loaded multiple times
- Form submissions created entries with identical timestamps
- Filters/sorts mutated the original array

**Solution**:  
```typescript
// Deduplication logic
const [incidents, setIncidents] = useState(() => {
  const uniqueIds = new Set();
  return mockIncidents.filter(incident => {
    const isUnique = !uniqueIds.has(incident.id);
    uniqueIds.add(incident.id);
    return isUnique;
  });
});
```
### 2. Type Safety in Form Handling
**Challenge**:
Type conflicts between:
- Form input values (strings)
- Incident interface (typed severity enum)
- Date formatting requirements

**Solution**:
Created strict type guards:
```typescript
type Severity = 'Low' | 'Medium' | 'High';

const isSeverity = (value: string): value is Severity => {
  return ['Low', 'Medium', 'High'].includes(value);
};
```
