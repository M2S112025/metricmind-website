document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('#contact-form');
  const notice = document.querySelector('.notice');

  if (!form) return;

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const values = Object.fromEntries(formData.entries());

    if (notice) {
      notice.textContent = 'Thank you. Your demo request has been captured.';
      notice.classList.add('visible');
    }

    const payload = {
      ...values,
      source: 'website-demo-form',
      created_at: new Date().toISOString()
    };

    try {
      const config = window.__METRICMIND_SUPABASE__ || {};
      if (config.url && config.anonKey) {
        const response = await fetch(`${config.url}/rest/v1/contact_leads`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'apikey': config.anonKey,
            'Authorization': `Bearer ${config.anonKey}`
          },
          body: JSON.stringify(payload)
        });

        if (!response.ok) {
          throw new Error('Supabase request failed');
        }
      } else {
        localStorage.setItem('metricmind-lead', JSON.stringify(payload));
      }

      form.reset();
    } catch (error) {
      if (notice) {
        notice.textContent = 'Your request was saved locally while the lead pipeline is being connected.';
        notice.classList.add('visible');
      }
      localStorage.setItem('metricmind-lead', JSON.stringify(payload));
    }
  });
});
