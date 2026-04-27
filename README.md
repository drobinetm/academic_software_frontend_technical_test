# Academic software (Frontend) technical test

![React 17](https://img.shields.io/badge/React-17-61dafb?logo=react&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v3-06b6d4?logo=tailwindcss&logoColor=white)
![React Router v5](https://img.shields.io/badge/React_Router-v5-ca4245?logo=reactrouter&logoColor=white)
![Axios](https://img.shields.io/badge/Axios-HTTP-5a29e4?logo=axios&logoColor=white)
![Zod](https://img.shields.io/badge/Zod-Validation-3068b7)
![Vercel](https://img.shields.io/badge/Vercel-Deployment-000000?logo=vercel&logoColor=white)
![Vercel Production Deploy](https://img.shields.io/github/actions/workflow/status/drobinetm/academic_software_technical_test/vercel-production.yml?branch=main&label=vercel%20production)
![Last commit](https://img.shields.io/github/last-commit/drobinetm/academic_software_technical_test/main)

This repository contains a React 17 single-page application for
authentication, customer management, protected navigation, theme switching,
and deployment on Vercel.

## Overview

This application implements the customer management technical test with a
dashboard-oriented UI and the following flows:

- Login and registration.
- Session persistence and protected routes.
- Customer search, creation, update, and deletion.
- Interest catalog loading.
- Light, dark, and system themes.
- Deployment-ready frontend integration through a Vercel API Gateway.

The current UI is built with Tailwind CSS, React Router DOM v5, Axios, Zod,
and reusable dashboard components.

## Stack

The main technologies in this project are:

- React 17
- Create React App
- Tailwind CSS
- React Router DOM v5
- Axios
- Zod
- Lucide React

## Getting started

Install the dependencies first.

```bash
npm install
```

Start the development server.

```bash
npm start
```

The application runs at `http://localhost:3000`.

## Environment variables

This project reads the backend base URL from environment variables instead of
hardcoding it in the source files.

The repository includes these environment files:

- `.env.development`
- `.env.production`
- `.env.example`

Use `.env.example` as the reference template.

### Local development

For local development, the current configuration points the frontend and the
development proxy to a backend running at `http://localhost:8000`.

`.env.development`

```env
REACT_APP_API_BASE_URL=http://localhost:8000
API_PROXY_TARGET=http://localhost:8000
```

### Production and Vercel

For production deployments, the frontend must use the public Vercel API Gateway
URL.

`.env.production`

```env
# Production builds in GitHub Actions use the REACT_APP_API_BASE_URL secret.
```

The production workflow injects `REACT_APP_API_BASE_URL` from GitHub Actions.
Configure it as a repository secret before deploying from `main`.

After changing any `.env` file, restart the development server.

## Available scripts

Use these scripts during development and deployment.

- `npm start`: starts the development server.
- `npm run build`: builds the production bundle.
- `npm run lint`: runs ESLint on the source files.
- `npm run lint:fix`: fixes ESLint issues when possible.
- `npm test`: runs the CRA test runner.

## Backend integration

This frontend is documented to consume the backend through a Vercel API
Gateway. The gateway is the public endpoint used by the SPA and acts as an
intermediary layer between the frontend and Innovasoft S.A.

That means the browser must call the Vercel API Gateway, not the Innovasoft
S.A. backend directly.

### Integration model

The request flow is:

1. The React SPA sends requests to the Vercel API Gateway.
2. The Vercel API Gateway forwards the requests to Innovasoft S.A.
3. Innovasoft S.A. returns the response through the gateway.
4. The frontend receives the response from the gateway.

This architecture centralizes cross-origin access, keeps the frontend isolated
from direct backend exposure, and gives you a single public entry point for the
API.

### Frontend API layer

The application uses Axios through `src/services/api/client.js`.

Customer, authentication, and interest services consume the shared Axios client
from:

- `src/services/auth/authService.js`
- `src/services/customer/customerService.js`
- `src/services/interest/interestService.js`

### Development behavior

During local development, the project can proxy `/api/*` requests through the
CRA development server using `src/setupProxy.js`.

The proxy target is configurable through `API_PROXY_TARGET`.

In the current local setup, that target is `http://localhost:8000`.

If your team uses the Vercel API Gateway in local development as well, update
`API_PROXY_TARGET` accordingly.

### Endpoint policy

Use the Vercel API Gateway as the backend endpoint exposed to the frontend.

- Frontend public endpoint: Vercel API Gateway
- Upstream integration: Innovasoft S.A.
- Browser-to-backend contract: always through the gateway

## Theme support

The application supports three theme modes:

- Light
- Dark
- System

Theme selection is persisted in local storage and applied to both public and
private screens.

## Deployment notes

The project is prepared for deployment on Vercel. In production, the intended
public API entry point is the Vercel API Gateway, which intermediates all
frontend communication with Innovasoft S.A.

For a successful deployment, define `REACT_APP_API_BASE_URL` in Vercel so the
frontend points to the correct gateway URL at build time.

The repository also includes a GitHub Actions workflow at
`.github/workflows/vercel-production.yml`.

This workflow deploys to Vercel only when code is pushed to the `main` branch.

To use it, configure these GitHub repository secrets:

- `VERCEL_TOKEN`
- `VERCEL_ORG_ID`
- `VERCEL_PROJECT_ID`
- `REACT_APP_API_BASE_URL`
