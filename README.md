# YarlVibe Restaurant Management System - Frontend

## Introduction

The YarlVibe Restaurant Management System is designed to optimize restaurant operations by providing an integrated solution for billing, order management, table arrangement, and communication between kitchen staff and waiters. The frontend is developed using React.

## Prerequisites

- Node.js (latest stable version)
- npm (latest stable version)

## Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/Aslam110-max/Yarl-Vide-ui.git
   cd Yarl-Vide-ui
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

## Running the Application

1. Start the development server:

   ```sh
   npm start
   ```

2. Open your browser and navigate to `http://localhost:3000` to see the application running.

## Project Structure

- `src/`: Contains all the source code for the React application.
- `public/`: Contains the static files.
- `package.json`: Lists the project dependencies and scripts.

## Key Dependencies

- `@emotion/react`
- `@emotion/styled`
- `@fortawesome/react-fontawesome`
- `@mui/material`
- `react`
- `react-dom`
- `react-router-dom`
- `react-toastify`

## Screens

- **Cashier Screen**: Facilitates order entry, billing, and payment processing.
- **Kitchen Staff Screen**: Displays incoming orders and allows status updates.
- **Waiter Screen**: Manages table availability and notifications for order readiness.

## Environment Variables

Create a `.env` file in the root directory and add the following:

```
REACT_APP_API_BASE_URL=http://localhost:5000/api
```

## Configuration

Modify the `REACT_APP_API_BASE_URL` in the `.env` file to match your backend API base URL for different environments.
