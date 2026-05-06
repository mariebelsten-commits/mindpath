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

function showToast(message, type) {
  const toast = document.createElement('div');
  toast.style.cssText = `
    position: fixed; bottom: 24px; left: 50%; transform: translateX(-50%);
    background: ${type === 'success' ? '#0d4a2e' : '#333'};
    color: #fff; padding: 14px 24px; border-radius: 8px;
    font-family: 'Poppins', sans-serif; font-size: 0.9rem;
    z-index: 9999; box-shadow: 0 4px 12px rgba(0,0,0,0.2);
    max-width: 90%; text-align: center;
  `;
  toast.innerHTML = message;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 5000);
}

async function saveToServer(data) {
  try {
    const client = await getSupabaseClient();
    const { data: { user } } = await client.auth.getUser();

    if (!user) {
      showToast('Saved locally. <a href="/login.html" style="color:#a8d5b5;font-weight:600;">Sign in</a> to save across all your devices.');
      return;
    }

    const { error } = await client
      .from('worksheet_responses')
      .insert({ data: data, user_id: user.id });

    if (error) {
      console.error('Save error:', error);
      showToast('Something went wrong. Please try again.');
    } else {
      showToast('Saved to your worksheets ✓', 'success');
    }
  } catch (err) {
    console.error('Fetch error:', err);
  }
}
