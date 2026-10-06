document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('#contact-form');
  const notice = document.querySelector('.notice');

  if (!form) return;

  const supportEmail = 'support@metricmind.in';

  const shareViaEmail = (values) => {
    const lines = [
      `Name: ${values.name || ''}`,
      `Company: ${values.company || ''}`,
      `Email: ${values.email || ''}`,
      `Phone: ${values.phone || ''}`,
      `Solution Interested In: ${values.solution_interest || ''}`,
      `Message: ${values.message || ''}`
    ];

    const subject = `Demo request from ${values.name || 'Website visitor'}`;
    const body = lines.join('\n');
    const mailtoUrl = `mailto:${supportEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    window.location.href = mailtoUrl;
  };

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

    shareViaEmail(values);

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
