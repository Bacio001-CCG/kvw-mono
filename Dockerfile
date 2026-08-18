FROM node:20-alpine AS base
RUN apk add --no-cache libc6-compat
RUN corepack enable && corepack prepare pnpm@9.15.9 --activate
WORKDIR /app
ENV CI=true
ENV NEXT_TELEMETRY_DISABLED=1
ENV TURBO_TELEMETRY_DISABLED=1

FROM base AS deps
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml turbo.json ./
COPY apps ./apps
COPY packages ./packages
RUN pnpm install --frozen-lockfile

FROM deps AS builder
COPY . .
ENV BACKEND_URL=http://backend:4000
RUN pnpm build

# --- backend (Nest webpack bundle + production node_modules) ---
FROM base AS backend
ENV NODE_ENV=production
WORKDIR /app
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/apps/backend/dist ./apps/backend/dist
COPY --from=builder /app/apps/backend/package.json ./apps/backend/package.json
COPY --from=builder /app/apps/backend/node_modules ./apps/backend/node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/pnpm-workspace.yaml ./pnpm-workspace.yaml
WORKDIR /app/apps/backend
EXPOSE 4000
CMD ["node", "dist/main"]

# --- public Next app ---
FROM base AS public
ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME=0.0.0.0
ENV BACKEND_URL=http://backend:4000
WORKDIR /app
COPY --from=builder /app/apps/public/.next/standalone ./
COPY --from=builder /app/apps/public/.next/static ./apps/public/.next/static
COPY --from=builder /app/apps/public/public ./apps/public/public
EXPOSE 3000
CMD ["node", "apps/public/server.js"]

# --- admin Next app ---
FROM base AS admin
ENV NODE_ENV=production
ENV PORT=3002
ENV HOSTNAME=0.0.0.0
ENV BACKEND_URL=http://backend:4000
WORKDIR /app
COPY --from=builder /app/apps/admin/.next/standalone ./
COPY --from=builder /app/apps/admin/.next/static ./apps/admin/.next/static
EXPOSE 3002
CMD ["node", "apps/admin/server.js"]
