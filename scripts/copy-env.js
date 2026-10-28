#!/usr/bin/env node
/**
 * ساخت webapp/client/.env از فایل .env وب‌اپ (و در نبود آن، از .env ریشه پروژه).
 *
 * نام‌های منبع NEXT_PUBLIC_* هستند؛ اما Create React App فقط متغیرهای با پیشوند
 * REACT_APP_ را در زمان بیلد تزریق می‌کند، پس همین‌جا هر دو نام نوشته می‌شود.
 */
const path = require('path');
const fs = require('fs');

const webappDir = path.join(__dirname, '..');
const webappEnvPath = path.join(webappDir, '.env');
const rootEnvPath = path.join(webappDir, '..', '.env');
const envPath = fs.existsSync(webappEnvPath) ? webappEnvPath : rootEnvPath;

if (!fs.existsSync(envPath)) {
  console.warn('⚠ فایل .env پیدا نشد. مقادیر سوپربیس از پیش‌فرض‌ها خوانده می‌شود.');
}

require('dotenv').config({ path: envPath });

const clientEnvPath = path.join(webappDir, 'client', '.env');
const url = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://lholzspyazziknxqopmi.supabase.co';
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

const content = `# Auto-generated from .env - do not commit secrets
NEXT_PUBLIC_SUPABASE_URL=${url}
NEXT_PUBLIC_SUPABASE_ANON_KEY=${key}
REACT_APP_SUPABASE_URL=${url}
REACT_APP_SUPABASE_ANON_KEY=${key}
`;

fs.writeFileSync(clientEnvPath, content, 'utf8');
console.log('✓ Supabase env copied to webapp/client/.env');
