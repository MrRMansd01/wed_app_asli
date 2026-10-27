import { createClient } from '@supabase/supabase-js';

// از فایل .env (توسط scripts/copy-env.js از .env ریشه ساخته می‌شود؛ یک .env واحد برای امنیت)
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL || 'https://lholzspyazziknxqopmi.supabase.co';
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
