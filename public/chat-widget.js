(function () {
    function init() {
      console.log('✅ Chat-Widget geladen');
  
      // Container erstellen (wird unsere Pill)
      const button = document.createElement('button');
      button.className = 'chat-widget'; // Eigene Klasse statt scroll-top
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
      button.style.opacity = '0'; // Start hidden
  
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
  
      // Klick-Event verbessern
      button.addEventListener('click', () => {
        // Überprüfen, ob das Fenster bereits existiert
        if (document.querySelector('.chat-window')) return;
        
        // Button vorher expandieren
        button.style.background = 'white';
        button.style.width = '9em';
        text.style.opacity = '1';
      
        // Fenster erstellen - mit der Größe der expandierten Pille starten
        const chatWindow = document.createElement('div');
        chatWindow.className = 'chat-window';
        chatWindow.style.position = 'fixed';
        chatWindow.style.bottom = '80px';
        chatWindow.style.right = '20px';
        chatWindow.style.width = '9em'; // Mit expandierter Pillengröße starten
        chatWindow.style.height = '3em';
        chatWindow.style.background = 'white';
        chatWindow.style.borderRadius = '1.5em';
        chatWindow.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';
        chatWindow.style.transition = 'all 0.3s ease-in-out';
        chatWindow.style.overflow = 'hidden';
        chatWindow.style.zIndex = 10000;
        chatWindow.style.display = 'flex';
        chatWindow.style.flexDirection = 'column';
        
        // Header-Container erstellen MIT NULL PADDING zu Beginn
        const headerContainer = document.createElement('div');
        headerContainer.style.display = 'flex';
        headerContainer.style.alignItems = 'center';
        headerContainer.style.padding = '0px'; // Starte ohne Padding!
        headerContainer.style.transition = 'all 0.3s ease-in-out';
        headerContainer.style.background = 'white';
        headerContainer.style.borderBottom = '1px solid #eee';
        
        // Kreis klonen mit ORIGINALER Größe
        const circleClone = circleContainer.cloneNode(true);
        circleClone.style.width = '3em';  // Originalgröße beibehalten
        circleClone.style.height = '3em'; // Originalgröße beibehalten
        circleClone.style.marginRight = '10px';
        
        // Text klonen und anpassen
        const textClone = text.cloneNode(true);
        textClone.style.opacity = '1';
        textClone.style.margin = '0';
        
        // Schließen-Button hinzufügen
        const closeButton = document.createElement('button');
        closeButton.innerHTML = '&#9660;';
        closeButton.style.background = 'transparent';
        closeButton.style.border = 'none';
        closeButton.style.color = '#a81411';
        closeButton.style.fontSize = '16px';
        closeButton.style.cursor = 'pointer';
        closeButton.style.marginLeft = 'auto';
        
        // Schließen-Button Event-Listener anpassen
        closeButton.addEventListener('click', () => {
          // Inhalte ausblenden
          textArea.style.opacity = '0';
          inputContainer.style.opacity = '0';
          textClone.style.opacity = '0';
          
          // Die Sichtbarkeit des Buttons wird jetzt über die Klassen gesteuert
          // Wir setzen die Eigenschaften zurück, ohne die Sichtbarkeit zu ändern
          button.style.background = 'transparent';
          button.style.width = '3em';
          text.style.opacity = '0';
          
          setTimeout(() => {
            // Fenster verkleinern
            chatWindow.style.width = '3em';
            chatWindow.style.height = '3em';
            chatWindow.style.borderRadius = '1.5em';
            headerContainer.style.padding = '0px';
            
            // Fenster erst NACH einer Verzögerung entfernen
            setTimeout(() => {
              chatWindow.remove();
              
              // WICHTIG: Sichtbarkeit nach dem Schließen neu synchronisieren
              syncScrollTopState();
            }, 300);
          }, 50);
        });
        
        // Elemente zum Header hinzufügen
        headerContainer.appendChild(circleClone);
        headerContainer.appendChild(textClone);
        headerContainer.appendChild(closeButton);
        chatWindow.appendChild(headerContainer);
        
        // Textbereich und Eingabebereich hinzufügen
        const textArea = document.createElement('div');
        textArea.style.flex = '1';
        textArea.style.padding = '10px';
        textArea.style.overflowY = 'auto';
        textArea.style.background = '#f9f9f9';
        textArea.style.opacity = '0';
        textArea.style.transition = 'opacity 0.3s ease-in-out';
        chatWindow.appendChild(textArea);
        
        const inputContainer = document.createElement('div');
        inputContainer.style.display = 'flex';
        inputContainer.style.padding = '10px';
        inputContainer.style.borderTop = '1px solid #ccc';
        inputContainer.style.opacity = '0';
        inputContainer.style.transition = 'opacity 0.3s ease-in-out';
        
        const input = document.createElement('input');
        input.type = 'text';
        input.placeholder = 'Nachricht eingeben...';
        input.style.flex = '1';
        input.style.padding = '8px';
        input.style.border = '1px solid #ccc';
        input.style.borderRadius = '4px';
        input.style.marginRight = '10px';
        inputContainer.appendChild(input);
        
        const sendButton = document.createElement('button');
        sendButton.style.background = '#a81411';
        sendButton.style.color = 'white';
        sendButton.style.border = 'none';
        sendButton.style.width = '34px';  // Make it square
        sendButton.style.height = '34px'; // Same height as the input (8px padding + 18px icon)
        sendButton.style.borderRadius = '4px';
        sendButton.style.cursor = 'pointer';
        sendButton.style.display = 'flex';
        sendButton.style.justifyContent = 'center';
        sendButton.style.alignItems = 'center';
        sendButton.style.padding = '0'; // Remove padding since we're using exact dimensions

        // Create send icon
        const sendIcon = document.createElement('img');
        sendIcon.src = 'https://localhost:3000/static/icons/send.png';
        sendIcon.style.width = '18px';
        sendIcon.style.height = '18px';
        sendIcon.alt = 'Send';

        // Add icon to button
        sendButton.appendChild(sendIcon);
        inputContainer.appendChild(sendButton);
        
        // Add event listeners for sending messages
        const sendMessage = () => {
          const messageText = input.value.trim();
          if (!messageText) return;
          
          // Add user message to chat
          appendMessage('user', messageText);
          
          // Clear input field
          input.value = '';
          
          // Generate or retrieve userId (stored in sessionStorage for persistence)
          let userId = sessionStorage.getItem('chat-widget-userId');
          if (!userId) {
            userId = 'user_' + Math.random().toString(36).substring(2, 15);
            sessionStorage.setItem('chat-widget-userId', userId);
          }
          
          // Show loading indicator
          const loadingId = showLoadingIndicator();
          
          // Log before sending request
          console.log("Sending request to backend:", {
            userId: userId,
            message: messageText
          });
          
          // Always use the proxy regardless of host
          const apiUrl = 'https://localhost:3000/proxy/chat';
          console.log("Always using proxy at:", apiUrl);
          
          // No early returns or conditional mock responses
          
          fetch(apiUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              message: messageText,
              userId: userId
            })
          })
          .then(res => {
            console.log("Backend response status:", res.status);
            console.log("Response headers:", Object.fromEntries([...res.headers.entries()]));
            
            if (!res.ok) {
              throw new Error('Server responded with status: ' + res.status);
            }
            return res.json();
          })
          .then(data => {
            // Remove loading indicator
            removeLoadingIndicator(loadingId);
            
            // Display bot response
            console.log("Bot response data:", data);
            if (data && data.message) {
              appendMessage('bot', data.message);
            } else {
              appendMessage('bot', 'Ich habe Ihre Nachricht erhalten.');
              console.warn("No message property in response data:", data);
            }
          })
          .catch(err => {
            // Remove loading indicator
            removeLoadingIndicator(loadingId);
            
            // Show detailed error information
            console.error("Fetch error details:", {
              message: err.message,
              stack: err.stack,
              name: err.name
            });
            appendMessage('error', 'Es gab ein Problem bei der Verbindung zum Server.');
            
            // Check for common CORS issues
            console.log("If you're seeing CORS errors, make sure your backend has CORS enabled for http://localhost:3000");
          });
        };
        
        // Handle send button click
        sendButton.addEventListener('click', sendMessage);
        
        // Handle Enter key in input field
        input.addEventListener('keydown', (e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
            sendMessage();
          }
        });
        
        // Helper function to append messages to the chat
        function appendMessage(type, content) {
          const messageEl = document.createElement('div');
          messageEl.className = `chat-message ${type}-message`;
          messageEl.style.padding = '8px 12px';
          messageEl.style.margin = '8px 0';
          messageEl.style.borderRadius = '12px';
          messageEl.style.maxWidth = '80%';
          messageEl.style.wordBreak = 'break-word';
          
          if (type === 'user') {
            messageEl.style.backgroundColor = '#f0f0f0';
            messageEl.style.marginLeft = 'auto';
            messageEl.style.textAlign = 'right';
          } else if (type === 'bot') {
            messageEl.style.backgroundColor = '#a81411';
            messageEl.style.color = 'white';
            messageEl.style.marginRight = 'auto';
          } else if (type === 'error') {
            messageEl.style.backgroundColor = '#ffdddd';
            messageEl.style.color = '#ff0000';
            messageEl.style.marginRight = 'auto';
          }
          
          messageEl.textContent = content;
          textArea.appendChild(messageEl);
          
          // Auto-scroll to bottom
          textArea.scrollTop = textArea.scrollHeight;
        }
        
        // Loading indicator functions
        function showLoadingIndicator() {
          const loadingId = Date.now().toString();
          const loadingEl = document.createElement('div');
          loadingEl.id = `loading-${loadingId}`;
          loadingEl.className = 'loading-indicator';
          loadingEl.style.display = 'flex';
          loadingEl.style.padding = '8px 12px';
          loadingEl.style.margin = '8px 0';
          
          const dots = document.createElement('div');
          dots.textContent = 'Schreibt';
          dots.style.color = '#888';
          
          loadingEl.appendChild(dots);
          textArea.appendChild(loadingEl);
          textArea.scrollTop = textArea.scrollHeight;
          
          // Animate the loading dots
          let count = 0;
          const interval = setInterval(() => {
            count = (count + 1) % 4;
            dots.textContent = 'Schreibt' + '.'.repeat(count);
          }, 300);
          
          loadingEl.interval = interval;
          return loadingId;
        }
        
        function removeLoadingIndicator(loadingId) {
          const loadingEl = document.getElementById(`loading-${loadingId}`);
          if (loadingEl) {
            clearInterval(loadingEl.interval);
            loadingEl.remove();
          }
        }

        chatWindow.appendChild(inputContainer);
        
        // Fenster zum Dokument hinzufügen BEVOR der Button ausgeblendet wird
        document.body.appendChild(chatWindow);
      
        // Kurze Verzögerung, damit das Fenster stabil ist
        requestAnimationFrame(() => {
          // Original-Button ausblenden erst NACHDEM das Fenster sichtbar ist
          button.style.opacity = '0';
          
          // Animation für Fenstervergrößerung UND PADDING
          setTimeout(() => {
            chatWindow.style.width = '25em';
            chatWindow.style.height = '30em';
            chatWindow.style.maxWidth = '90vw';
            chatWindow.style.borderRadius = '8px';
            headerContainer.style.padding = '10px'; // Padding animieren!
            
            setTimeout(() => {
              textArea.style.opacity = '1';
              inputContainer.style.opacity = '1';
            }, 150);
          }, 10);
        });
      });

      document.body.appendChild(button);
      
      // Add attention animation after 5 seconds
      setTimeout(() => {
        // Only animate if the chat window isn't already open
        if (!document.querySelector('.chat-window')) {
          // Store original opacity to restore it later if needed
          const originalOpacity = button.style.opacity;
          
          // Make button visible for animation
          button.style.opacity = '1';
          button.classList.add('chat-widget-attention');
          
          // Remove animation class after it completes
          button.addEventListener('animationend', () => {
            button.classList.remove('chat-widget-attention');
            
            // Restore original state if user didn't interact
            if (!document.querySelector('.chat-window')) {
              // Let normal visibility rules take over again
              syncScrollTopState();
            }
          }, { once: true });
        }
      }, 5000);

      // Synchronize with existing scroll-top button, but use our own classes
      function syncScrollTopState() {
        // Find the existing scroll-top button
        const existingScrollTopBtn = document.querySelector('.scroll-top');
        
        if (existingScrollTopBtn) {
          // Check if the existing button has the visible class
          if (existingScrollTopBtn.classList.contains('scroll-top-visible')) {
            // Make our button visible too using our own class
            if (!button.classList.contains('chat-widget-visible')) {
              button.classList.add('chat-widget-visible');
              button.style.opacity = '1'; // Show our button
            }
          } else {
            // Make our button hidden too
            button.classList.remove('chat-widget-visible');
            button.style.opacity = '0'; // Hide our button
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
        const existingScrollTopBtn = document.querySelector('.scroll-top');
        if (existingScrollTopBtn) {
          observer.observe(existingScrollTopBtn, { attributes: true });
          // Initial sync
          syncScrollTopState();
        }
      });

      // Also check on scroll events in case the original button uses scroll events
      window.addEventListener('scroll', syncScrollTopState);

      // Stil-Regeln für unsere eigenen Klassen hinzufügen
      const styleElement = document.createElement('style');
      styleElement.textContent = `
        .chat-widget {
          opacity: 0 !important;
          visibility: hidden;
          transition: opacity 0.3s ease, visibility 0.3s ease;
        }
        .chat-widget.chat-widget-visible {
          opacity: 1 !important;
          visibility: visible;
        }
        
        @keyframes attentionAnimation {
          0% { transform: scale(1) rotate(0deg); }
          10% { transform: scale(1.4) rotate(-10deg); }
          20% { transform: scale(1.4) rotate(10deg); }
          30% { transform: scale(1.4) rotate(-10deg); }
          40% { transform: scale(1.4) rotate(10deg); }
          50% { transform: scale(1.4) rotate(-8deg); }
          60% { transform: scale(1.4) rotate(8deg); }
          70% { transform: scale(1.4) rotate(-5deg); }
          80% { transform: scale(1.4) rotate(5deg); }
          90% { transform: scale(1.4) rotate(0deg); }
          100% { transform: scale(1) rotate(0deg); }
        }
        
        .chat-widget-attention {
          animation: attentionAnimation 2s ease-in-out;
        }
      `;
      document.head.appendChild(styleElement);

      document.body.appendChild(button);
    }
  
    // Script direkt ausführen oder auf DOM warten
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', init);
    } else {
      init();
    }
  })();
