FROM mcr.microsoft.com/devcontainers/javascript-node:24

# Ensure node user exists
RUN id node || useradd -ms /bin/bash node

WORKDIR /workspace

RUN apt-get update && apt-get install -y git curl build-essential && rm -rf /var/lib/apt/lists/*

