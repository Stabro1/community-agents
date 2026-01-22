# Stage 1: Build
FROM node:20-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package files
COPY package.json ./
# Install dependencies
RUN npm install --frozen-lockfilee
# Copy source code
COPY . .

# Build the TypeScript code
RUN npm run build
# Stage 2: Production
FROM node:20-alpine AS runner

# Set working directory
WORKDIR /app

# Install production dependencies only
COPY package.json ./
RUN npm install --frozen-lockfile --production

# Install TypeScript and type definitions needed for Langgraph CLI
RUN npm add --dev typescript @types/node

# Copy built code from builder stage
COPY --from=builder /app/build ./build
COPY --from=builder /app/src ./src
COPY --from=builder /app/langgraph.json ./langgraph.json
COPY --from=builder /app/tsconfig.json ./tsconfig.json

# Create empty .env file (environment variables are passed via docker-compose)
RUN touch .env

# Set environment variables
ENV NODE_ENV=production
ENV PORT=8000

# Expose port
EXPOSE 8000

# Start command

# Install Python dependencies for webapp
RUN pip install fastapi uvicorn

CMD ["uvicorn", "src.webapp:app", "--host", "0.0.0.0", "--port", "8000"]
