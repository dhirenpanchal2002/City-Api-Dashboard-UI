# ---------- Build stage ----------
FROM node:24-alpine AS builder
WORKDIR /app

# Install dependencies first (cache)
COPY package.json package-lock.json* pnpm-lock.yaml* ./
# choose one package manager; adjust if using pnpm/yarn
RUN npm ci --silent

# Copy source and build
COPY . .
RUN npm run build

# ---------- Production stage ----------
FROM nginx:stable-alpine AS release
# Remove default nginx html files
RUN rm -rf /usr/share/nginx/html/*

# Copy built assets from builder
COPY --from=builder /app/dist /usr/share/nginx/html

# Add SPA fallback (if you use client-side routing)
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]
