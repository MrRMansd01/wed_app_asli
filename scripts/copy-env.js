#!/usr/bin/env node
/**
 * ساخت webapp/client/.env از .env ریشه پروژه (وب‌اپ مستقل است ولی تنظیمات سوپربیس را
 * از همان فایل .env ریشه می‌خواند).
 *
 * نام‌های منبع NEXT_PUBLIC_* هستند؛ اما Create React App فقط متغیرهای با پیشوند
 * REACT_APP_ را در زمان بیلد تزریق می‌کند، پس همین‌جا هر دو نام نوشته می‌شود.
 */
const path = require('path');
const fs = require('fs');

const rootDir = path.join(__dirname, '..', '..');
const envPath = path.join(rootDir, '.env');
const envExamplePath = path.join(rootDir, '.env.example');

if (!fs.existsSync(envPath) && fs.existsSync(envExamplePath)) {
  fs.copyFileSync(envExamplePath, envPath);
  console.log('✓ فایل .env از .env.example ساخته شد. مقادیر را پر کنید.');
}

require('dotenv').config({ path: envPath });

const clientEnvPath = path.join(rootDir, 'webapp', 'client', '.env');
const url = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://lholzspyazziknxqopmi.supabase.co';
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

const content = `# Auto-generated from root .env - do not commit secrets
NEXT_PUBLIC_SUPABASE_URL=${url}
NEXT_PUBLIC_SUPABASE_ANON_KEY=${key}
REACT_APP_SUPABASE_URL=${url}
REACT_APP_SUPABASE_ANON_KEY=${key}
`;

fs.writeFileSync(clientEnvPath, content, 'utf8');
console.log('✓ Supabase env copied to webapp/client/.env');
