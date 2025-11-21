# **City API Dashboard UI**

A modern, responsive data dashboard built to visualize and compare city data from multiple API sources. This project leverages React 19, TypeScript, and Tailwind CSS, featuring a robust production-ready build and deployment setup.

---

**🚀 Features & Tech Stack**

**Core Framework**
- **React 19**: Utilizes the latest React features for optimal rendering and state management.
- **TypeScript**: Ensures type safety and developer productivity with strict typing for API responses and components.
- **Tailwind CSS**: Implements a utility-first, responsive design system.

**Architecture & Logic**
- **Custom Hooks**: Logic is decoupled from UI components (e.g., filtering, sorting, and data fetching hooks) to ensure reusability and testability.
- **Component Segregation**: The UI is broken down into atomic, reusable components (e.g., Data Tables, Source Badges, Status Bars) for maintainability.
- **Axios**: Robust HTTP client used for handling API requests with interceptors and error handling capabilities.
- **Code Spliting**: Implemented client-side code splitting using React Lazy and Suspense for improved load times.

**Quality Assurance**
- **Jest & React Testing Library**: Comprehensive unit testing setup for ensuring component reliability and logic correctness.

**DevOps & Infrastructure**
- **Dev Containers**: A fully containerized development environment ensures consistency across different developer machines (VS Code integration).
- **Dockerized Production**: Includes a multi-stage Dockerfile for building optimized, production-ready Nginx container images.

---

**🛠️ Development Workflow (Dev Containers)**

This project is configured to run inside a VS Code Dev Container. This ensures that all dependencies (Node.js, extensions, tools) are pre-installed and consistent.

**Prerequisites**
- Install Docker Desktop.
- Install Visual Studio Code.
- Install the Dev Containers extension for VS Code.

**1. Open the Project**
- Open the project folder in VS Code.
- Open the Command Palette (Ctrl + Shift + P).
- Run:
```bash
Dev Containers: Reopen in Container
```

**2. Run the Application**
Once inside the container, start the development server. We use polling to ensure file changes inside the Docker container are reflected instantly in the browser.
```bash
CHOKIDAR_USEPOLLING=true npm run dev -- --host
```
Note: The `--host` flag exposes the app to your local network/browser, and `CHOKIDAR_USEPOLLING=true` fixes hot-reload issues common in Docker/WSL environments.

**3. Run Unit Tests**
Execute the Jest test suite to verify application logic:
```bash
npm test
```

---

**🐳 Production Deployment**

The project includes a Dockerfile optimized for production deployment (using Nginx to serve static assets).

**1. Build the Docker Image**
Run the following command in your terminal (outside the Dev Container, or inside if Docker-in-Docker is enabled):
```bash
docker build -t city-api-dashboard-ui:latest .
```

**2. Run the Container**
Start the production container mapping port 8080 on your host to port 80 in the container:
```bash
docker run --rm -p 8080:80 --name city-api-dashboard-ui city-api-dashboard-ui:latest
```
Access the production build at http://localhost:8080.

---

**📂 Project Structure**

src/
- components/ — Reusable UI components (Table, Badges, etc.)
- hooks/ — Custom hooks (useSortAndFilter, useFetchData)
- types/ — TypeScript interfaces (City, APIResponse)
- ApiClient/ — Axios configuration and API calls
- App.tsx — Main application entry
- main.tsx — React DOM rendering

---

**🔮 Future Improvements**

1. Replace state-based handling with URL synchronization using the useSearchParams hook from React Router.
2. Use TanStack Query, SWR, or RTK Query for data fetching and caching.
3. Update the useFilterAndSort hook to support generic types.
4. Improve performance by implementing windowing with React Window or React Virtualized.
5. Add more test cases to increase robustness.

---
