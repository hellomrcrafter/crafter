import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://bjglmyxqgdgbyyobrkxm.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJqZ2xteXhxZ2RnYnl5b2Jya3htIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk5MzUxNTksImV4cCI6MjA4NTUxMTE1OX0.zJ0osQxPAXj9K9gOzSbdJQuVry6tWMwdDWIrPdFetBU'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
