let _supabaseClient = null;

function getSupabaseClient() {
  return new Promise((resolve) => {
    if (_supabaseClient) {
      resolve(_supabaseClient);
      return;
    }
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/dist/umd/supabase.js';
    script.onload = () => {
      _supabaseClient = supabase.createClient(
        'https://xfggkxgmtrhaqmfhrber.supabase.co',
        'sb_publishable_QEIvFgv2bcH7CMJNg9FB4Q_LSJHP9rc'
      );
      resolve(_supabaseClient);
    };
    document.head.appendChild(script);
  });
}

async function saveToServer(data) {
  try {
    const client = await getSupabaseClient();
    const { data: { user } } = await client.auth.getUser();

    if (!user) {
      console.warn('Not logged in — saved locally only');
      return;
    }

    const { error } = await client
      .from('worksheet_responses')
      .insert({ data: data, user_id: user.id });

    if (error) {
      console.error('Save error:', error);
    } else {
      console.log('Server response: Saved successfully');
    }
  } catch (err) {
    console.error('Fetch error:', err);
  }
}
