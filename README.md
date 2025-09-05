# Flight Info App

An Angular web application with Firebase hosting that allows users to submit flight information after authentication.

## Features

- **Authentication**: Simple username/password login system
- **Flight Form**: Comprehensive form for flight details submission
- **API Integration**: POST requests to specified endpoint with proper headers
- **Modern UI**: Beautiful, responsive design with gradient backgrounds
- **Firebase Hosting**: Ready for deployment

## Demo Credentials

- **Username**: `admin`
- **Password**: `password123`

## Installation

1. **Install Node.js** (version 18 or higher)
   - Download from: https://nodejs.org/

2. **Install Angular CLI**
   ```bash
   npm install -g @angular/cli
   ```

3. **Install dependencies**
   ```bash
   npm install
   ```

4. **Start development server**
   ```bash
   npm start
   ```

5. **Open your browser** and navigate to `http://localhost:4200`

## Build for Production

```bash
npm run build
```

## Deploy to Firebase

1. **Install Firebase CLI**
   ```bash
   npm install -g firebase-tools
   ```

2. **Login to Firebase**
   ```bash
   firebase login
   ```

3. **Initialize Firebase project**
   ```bash
   firebase init hosting
   ```

4. **Build the application**
   ```bash
   npm run build
   ```

5. **Deploy to Firebase**
   ```bash
   firebase deploy
   ```

## API Endpoint

The application sends POST requests to:
- **URL**: `https://us-central1-crm-sdk.cloudfunctions.net/flightInfoChallenge`
- **Headers**: 
  - `token`: `WW91IG11c3QgYmUgdGhlIGN1cmlvdXMgdHlwZS4gIEJyaW5nIHRoaXMgdXAgYXQgdGhlIGludGVydmlldyBmb3IgYm9udXMgcG9pbnRzICEh`
  - `candidate`: `Yash Mane` (replace with your name)

## Flight Information Payload

```typescript
interface FlightInfoPayload {
  airline: string;
  arrivalDate: string;
  arrivalTime: string;
  flightNumber: string;
  numOfGuests: number;
  comments?: string;
}
```

## Project Structure

```
src/
├── app/
│   ├── components/
│   │   ├── login/
│   │   │   └── login.component.ts
│   │   └── flight-form/
│   │       └── flight-form.component.ts
│   ├── services/
│   │   ├── auth.service.ts
│   │   └── flight.service.ts
│   ├── models/
│   │   └── interfaces.ts
│   ├── app.component.ts
│   └── app.module.ts
├── index.html
└── styles.scss
```

## Technologies Used

- **Angular 17**: Frontend framework
- **TypeScript**: Programming language
- **Firebase**: Hosting platform
- **SCSS**: Styling
- **RxJS**: Reactive programming

## Customization

To change the candidate name in API requests, update the `CANDIDATE_NAME` constant in `src/app/services/flight.service.ts`.

## License

This project is created for demonstration purposes.
