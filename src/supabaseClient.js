import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn(
    '[supabaseClient] VITE_SUPABASE_URL veya VITE_SUPABASE_ANON_KEY eksik. ' +
    'Supabase özellikleri çalışmayacak. .env dosyasını kontrol edin.'
  );
}

// Değerler boş olsa bile createClient çağrısı yapılır; hatalar yalnızca
// Supabase çağrıları sırasında oluşur (uygulama yüklenmeye devam eder).
export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseAnonKey || 'placeholder-anon-key'
);
