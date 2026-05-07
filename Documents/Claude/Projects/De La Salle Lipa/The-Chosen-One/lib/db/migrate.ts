import { neon } from '@neondatabase/serverless'
import { readFileSync } from 'fs'
import { join } from 'path'
import 'dotenv/config'

const sql = neon(process.env.DATABASE_URL!)
const schema = readFileSync(join(process.cwd(), 'lib/db/schema.sql'), 'utf-8')

sql(schema).then(() => {
  console.log('✓ Migration complete')
  process.exit(0)
}).catch((err) => {
  console.error('Migration failed:', err)
  process.exit(1)
})
