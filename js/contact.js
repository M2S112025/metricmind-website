document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('#contact-form');
  const notice = document.querySelector('.notice');

  if (!form) return;

  const submitButton = form.querySelector('button[type="submit"]');

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const values = Object.fromEntries(formData.entries());
    const config = window.__METRICMIND_SUPABASE__;

    if (!config?.url || !config?.anonKey) {
      if (notice) {
        notice.textContent = 'The enquiry form is not configured. Please contact support@metricmind.in.';
        notice.classList.add('visible', 'error');
      }
      return;
    }

    const payload = {
      name: values.name,
      company: values.company,
      email: values.email,
      phone: values.phone,
      solution_interest: values.solution_interest,
      message: values.message,
      source: 'website-demo-form'
    };

    if (notice) {
      notice.classList.remove('error');
      notice.textContent = 'Sending your request...';
      notice.classList.add('visible');
    }
    if (submitButton) submitButton.disabled = true;

    try {
      const response = await fetch(`${config.url}/rest/v1/contact_leads`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          apikey: config.anonKey,
          Authorization: `Bearer ${config.anonKey}`,
          Prefer: 'return=minimal'
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const errorDetails = await response.text();
        throw new Error(`Supabase returned ${response.status}: ${errorDetails}`);
      }

      if (notice) notice.textContent = 'Thank you. Your demo request has been submitted.';
      form.reset();
    } catch (error) {
      if (notice) {
        notice.textContent = 'We could not submit your request right now. Please try again or contact support@metricmind.in.';
        notice.classList.add('visible', 'error');
      }
      console.error('Failed to submit contact lead to Supabase:', error);
    } finally {
      if (submitButton) submitButton.disabled = false;
    }
  });
});
