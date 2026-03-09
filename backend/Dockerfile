# ============================================
# Dockerfile — Strapi Backend
# Multi-stage: builder + runner
# ============================================

FROM node:20-alpine AS builder

RUN apk add --no-cache python3 make g++ libc6-compat

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci

COPY . .

RUN NODE_ENV=production npm run build

# ── RUNNER ──
FROM node:20-alpine AS runner

RUN apk add --no-cache libc6-compat

WORKDIR /app

RUN addgroup --system --gid 1001 nodejs && \
  adduser --system --uid 1001 strapi

COPY --from=builder --chown=strapi:nodejs /app/package.json ./
COPY --from=builder --chown=strapi:nodejs /app/package-lock.json ./
COPY --from=builder --chown=strapi:nodejs /app/dist ./dist
COPY --from=builder --chown=strapi:nodejs /app/config ./config
COPY --from=builder --chown=strapi:nodejs /app/public ./public

RUN npm ci --omit=dev && npm cache clean --force

RUN mkdir -p /app/public/uploads /app/database && chown -R strapi:nodejs /app/public/uploads /app/database

USER strapi

EXPOSE 1337

ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=1337

CMD ["npm", "run", "start"]
