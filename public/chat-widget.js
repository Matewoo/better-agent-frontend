(function () {
    function init() {
      console.log('✅ Chat-Widget geladen');
  
      // Container erstellen (wird unsere Pill)
      const button = document.createElement('button');
      button.className = 'scroll-top'; // Start with hidden state
      button.style.position = 'fixed';
      button.style.bottom = '80px';
      button.style.right = '20px';
      button.style.width = '3em'; 
      button.style.height = '3em';
      button.style.background = 'transparent'; // Transparent background for collapsed state
      button.style.borderRadius = '1.5em'; // Use em units to exactly match half of width/height
      button.style.border = 'none'; // Remove default border
      button.style.boxSizing = 'border-box'; // Important: include border in element dimensions
      button.style.boxShadow = '0 2px 6px rgba(0,0,0,0.3)';
      button.style.zIndex = 9999;
      button.style.cursor = 'pointer';
      button.style.display = 'flex';
      button.style.justifyContent = 'flex-start';
      button.style.alignItems = 'center';
      button.style.padding = '0';
      button.style.overflow = 'hidden';
      button.style.transition = 'all 0.3s ease-in-out';
  
      // Kreis für das Icon erstellen
      const circleContainer = document.createElement('div');
      circleContainer.style.width = '3em';
      circleContainer.style.height = '3em';
      circleContainer.style.background = '#a81411'; // Red circle
      circleContainer.style.borderRadius = '1.5em'; // Exactly match button's radius
      circleContainer.style.display = 'flex';
      circleContainer.style.justifyContent = 'center';
      circleContainer.style.alignItems = 'center';
      circleContainer.style.flexShrink = '0';
      circleContainer.style.margin = '0'; // Remove any margin
      circleContainer.style.boxSizing = 'border-box';
  
      // Icon hinzufügen - smaller than container
      const icon = document.createElement('img');
      icon.src = 'https://localhost:3000/static/icons/chat_white.png'; // ⬅️ ggf. anpassen
      icon.style.width = '1.8em'; // Reduced from 2.5em for more padding
      icon.style.height = '1.8em'; // Reduced from 2.5em for more padding
      icon.style.flexShrink = '0';
      icon.alt = 'Chat';
  
      // Text erstellen
      const text = document.createElement('span');
      text.innerText = 'Live Chat';
      text.style.color = '#a81411';
      text.style.marginLeft = '10px';
      text.style.marginRight = '15px';
      text.style.whiteSpace = 'nowrap';
      text.style.opacity = '0';
      text.style.transition = 'opacity 0.3s ease-in-out';
      text.style.fontFamily = 'Arial, sans-serif';
      text.style.fontWeight = 'bold';
      
      // Zusammenfügen
      circleContainer.appendChild(icon);
      button.appendChild(circleContainer);
      button.appendChild(text);
  
      // Hover-Effekt: Hintergrund der Pille wird weiß
      button.addEventListener('mouseenter', () => {
        button.style.background = 'white'; // White background for expanded state
        button.style.width = '9em'; // Expand width
        text.style.opacity = '1'; // Show text
      });
  
      button.addEventListener('mouseleave', () => {
        button.style.background = 'transparent'; // Transparent background for collapsed state
        button.style.width = '3em'; // Collapse width
        text.style.opacity = '0'; // Hide text
      });
  
      // Klick-Event
      button.addEventListener('click', () => {
        alert('Hier könnte dein Chat starten...');
      });

      // Synchronize with existing scroll-top button
      function syncScrollTopState() {
        // Find the existing scroll-top button
        const existingScrollTopBtn = document.querySelector('.scroll-top:not([data-chat-widget])');
        
        if (existingScrollTopBtn) {
          // Check if the existing button has the visible class
          if (existingScrollTopBtn.classList.contains('scroll-top-visible')) {
            // Make our button visible too
            if (!button.classList.contains('scroll-top-visible')) {
              button.classList.add('scroll-top-visible');
            }
          } else {
            // Make our button hidden too
            button.classList.remove('scroll-top-visible');
          }
        }
      }

      // Add a data attribute to identify our button
      button.setAttribute('data-chat-widget', 'true');
      
      // Set up a MutationObserver to watch for class changes on the existing button
      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (mutation.attributeName === 'class') {
            syncScrollTopState();
          }
        });
      });
      
      // Start observing once the DOM is fully loaded
      window.addEventListener('load', () => {
        const existingScrollTopBtn = document.querySelector('.scroll-top:not([data-chat-widget])');
        if (existingScrollTopBtn) {
          observer.observe(existingScrollTopBtn, { attributes: true });
          // Initial sync
          syncScrollTopState();
        }
      });

      // Also check on scroll events in case the original button uses scroll events
      window.addEventListener('scroll', syncScrollTopState);

      document.body.appendChild(button);
    }
  
    // Script direkt ausführen oder auf DOM warten
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', init);
    } else {
      init();
    }
  })();
