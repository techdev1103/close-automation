import { createClient } from "@supabase/supabase-js";

import { CONFIG } from "@/config-global";

// ----------------------------------------------------------------------

const supabaseUrl = CONFIG.supabase.url;
const supabaseKey = CONFIG.supabase.key;

export const supabase = createClient(supabaseUrl, supabaseKey);
