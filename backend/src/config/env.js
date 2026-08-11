import dotenv from 'dotenv'

dotenv.config()

// Centralised, validated access to process.env. Add new variables here
// (with a sane default where it makes sense) instead of reading
// process.env directly elsewhere in the app.
export const env = {
  nodeEnv: process.env.NODE_ENV || 'development',
  port: Number(process.env.PORT) || 5000,
  clientUrl: process.env.CLIENT_URL || 'http://localhost:5173',
  // Populated once the PRD defines what database/service is needed.
  databaseUrl: process.env.DATABASE_URL || '',
}

export const isProduction = env.nodeEnv === 'production'
