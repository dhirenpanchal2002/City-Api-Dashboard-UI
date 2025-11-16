# City-Api-Dashboard-UI

API dashboard for city data using React 19 with TypeScript and Tailwind

# How to open the code inside Dev Container

Ctrl + Shift + P
-> Dev Containers: Reopen with Dev Container

# Command to run the app inside Dev Container

npm run dev -- --host

# Command to build the production ready docker image

docker build -t city-api-dashboard-ui:latest .

# Command to Run the production ready image

docker run --rm -p 8080:80 --name city-api-dashboard-ui city-api-dashboard-ui:latest
