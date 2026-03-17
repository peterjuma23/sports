//
document.addEventListener('DOMContentLoaded', function() {
  const greetBtn = document.getElementById('greetBtn');
  if (greetBtn) {
    greetBtn.addEventListener('click', function() {
      alert('🏋️‍♀️ Welcome to Sports & Fitness group! Stay active, have fun!');
    });
  }

  // Form handling with Formspree
  const contactForm = document.getElementById('quickContact');
  const nameInput = document.getElementById('name');
  const msgInput = document.getElementById('message');
  const feedbackEl = document.getElementById('formFeedback');

  if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
      e.preventDefault(); 

      const nameValue = nameInput.value.trim();
      const messageValue = msgInput.value.trim();

      // Validation
      if (nameValue === '' || messageValue === '') {
        feedbackEl.textContent = '⚠️ Please fill in both fields.';
        feedbackEl.style.color = '#c44536';
        return;
      }

      // Show loading state
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;
      submitBtn.textContent = 'Sending...';
      submitBtn.disabled = true;
      feedbackEl.textContent = '';

      try {
        // Send to Formspree
        const response = await fetch('https://formspree.io/f/xzdjgbqq', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            name: nameValue,
            message: messageValue,
            _subject: `New message from ${nameValue} - Sports & Fitness Group`
          })
        });

        if (response.ok) {
          // Success message
          feedbackEl.innerHTML = `✅ Thanks <strong>${nameValue}</strong>! Your message has been sent. We'll get back to you soon!`;
          feedbackEl.style.color = '#2a9d8f';
          feedbackEl.style.fontWeight = '600';
          
          // Clear form
          nameInput.value = '';
          msgInput.value = '';
          setTimeout(() => {
            feedbackEl.style.transition = 'opacity 0.5s';
            feedbackEl.style.opacity = '0';
            setTimeout(() => {
              feedbackEl.innerHTML = '';
              feedbackEl.style.opacity = '1';
            }, 500);
          }, 5000);
          
        } else {
          const data = await response.json();
          throw new Error(data.error || 'Form submission failed');
        }
      } catch (error) {
        console.error('Error:', error);
        feedbackEl.innerHTML = '❌ Failed to send. Please try again or email us directly at peterjuma254@gmail.com';
        feedbackEl.style.color = '#c44536';
      } finally {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
      }
    });
  }


  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.has('success')) {
    if (feedbackEl) {
      feedbackEl.innerHTML = '✅ Message sent successfully! We\'ll get back to you soon.';
      feedbackEl.style.color = '#2a9d8f';
      feedbackEl.style.fontWeight = '600';
      
      
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }

  console.log('Sports & Fitness JS loaded — let\'s move!');
});