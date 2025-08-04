/**
 * Interactive Rating Component
 * Handles the rating selection and form submission functionality
 */

/**
 * Main application class for the rating component
 */
class RatingComponent {
  /**
   * Initialize the rating component
   */
  constructor() {
    this.selectedRating = 0;
    this.ratingState = document.getElementById('rating-state');
    this.thankYouState = document.getElementById('thank-you-state');
    this.ratingForm = document.getElementById('rating-form');
    this.submitButton = document.getElementById('submit-button');
    this.selectedRatingElement = document.getElementById('selected-rating');
    this.ratingInputs = document.querySelectorAll('.rating-input');
    
    this.init();
  }

  /**
   * Initialize event listeners and component state
   */
  init() {
    this.setupEventListeners();
    this.updateSubmitButtonState();
  }

  /**
   * Set up all event listeners for the component
   */
  setupEventListeners() {
    // Rating selection
    this.ratingInputs.forEach(input => {
      input.addEventListener('change', (event) => {
        this.handleRatingSelection(event);
      });
    });

    // Form submission
    this.ratingForm.addEventListener('submit', (event) => {
      this.handleFormSubmission(event);
    });

    // Keyboard navigation for rating buttons
    this.setupKeyboardNavigation();
  }

  /**
   * Handle rating selection from radio inputs
   * @param {Event} event - The change event
   */
  handleRatingSelection(event) {
    const { value } = event.target;
    this.selectedRating = parseInt(value, 10);
    this.updateSubmitButtonState();
    this.announceRatingSelection();
  }

  /**
   * Handle form submission
   * @param {Event} event - The submit event
   */
  handleFormSubmission(event) {
    event.preventDefault();
    
    if (this.selectedRating === 0) {
      this.showError('Please select a rating before submitting');
      return;
    }

    this.showThankYouState();
  }

  /**
   * Show the thank you state with the selected rating
   */
  showThankYouState() {
    // Update the selected rating display
    this.selectedRatingElement.textContent = this.selectedRating;
    
    // Hide rating state and show thank you state
    this.ratingState.hidden = true;
    this.thankYouState.hidden = false;
    
    // Focus management for accessibility
    this.thankYouState.focus();
    
    // Announce the state change to screen readers
    this.announceStateChange();
  }

  /**
   * Update the submit button state based on rating selection
   */
  updateSubmitButtonState() {
    const hasRating = this.selectedRating > 0;
    this.submitButton.disabled = !hasRating;
    
    if (hasRating) {
      this.submitButton.removeAttribute('aria-describedby');
    } else {
      this.submitButton.setAttribute('aria-describedby', 'rating-description');
    }
  }

  /**
   * Set up keyboard navigation for rating buttons
   */
  setupKeyboardNavigation() {
    const ratingButtons = document.querySelectorAll('.rating-button-wrapper');
    
    ratingButtons.forEach((button, index) => {
      button.addEventListener('keydown', (event) => {
        this.handleRatingButtonKeydown(event, index, ratingButtons);
      });
    });
  }

  /**
   * Handle keyboard navigation for rating buttons
   * @param {KeyboardEvent} event - The keydown event
   * @param {number} currentIndex - Current button index
   * @param {NodeList} buttons - All rating buttons
   */
  handleRatingButtonKeydown(event, currentIndex, buttons) {
    const { key } = event;
    let targetIndex = currentIndex;

    switch (key) {
      case 'ArrowLeft':
        event.preventDefault();
        targetIndex = currentIndex > 0 ? currentIndex - 1 : buttons.length - 1;
        break;
      case 'ArrowRight':
        event.preventDefault();
        targetIndex = currentIndex < buttons.length - 1 ? currentIndex + 1 : 0;
        break;
      case 'Home':
        event.preventDefault();
        targetIndex = 0;
        break;
      case 'End':
        event.preventDefault();
        targetIndex = buttons.length - 1;
        break;
      case ' ':
      case 'Enter': {
        event.preventDefault();
        const radioInput = buttons[currentIndex].querySelector('.rating-input');
        radioInput.checked = true;
        radioInput.dispatchEvent(new Event('change'));
        break;
      }
      default:
        return;
    }

    if (targetIndex !== currentIndex) {
      const targetButton = buttons[targetIndex].querySelector('.rating-input');
      targetButton.focus();
    }
  }

  /**
   * Show error message to the user
   * @param {string} message - Error message to display
   */
  showError(message) {
    // Create or update error message
    let errorElement = document.getElementById('rating-error');
    
    if (!errorElement) {
      errorElement = document.createElement('div');
      errorElement.id = 'rating-error';
      errorElement.className = 'rating-error';
      errorElement.setAttribute('role', 'alert');
      errorElement.setAttribute('aria-live', 'assertive');
      
      const ratingButtons = document.querySelector('.rating-buttons');
      ratingButtons.parentNode.insertBefore(errorElement, ratingButtons.nextSibling);
    }
    
    errorElement.textContent = message;
    errorElement.focus();
    
    // Remove error after 5 seconds
    setTimeout(() => {
      if (errorElement.parentNode) {
        errorElement.remove();
      }
    }, 5000);
  }

  /**
   * Announce rating selection to screen readers
   */
  announceRatingSelection() {
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.className = 'sr-only';
    announcement.textContent = `Rating ${this.selectedRating} selected`;
    
    document.body.appendChild(announcement);
    
    setTimeout(() => {
      if (announcement.parentNode) {
        announcement.remove();
      }
    }, 1000);
  }

  /**
   * Announce state change to screen readers
   */
  announceStateChange() {
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.className = 'sr-only';
    announcement.textContent = `Thank you for your rating of ${this.selectedRating} out of 5`;
    
    document.body.appendChild(announcement);
    
    setTimeout(() => {
      if (announcement.parentNode) {
        announcement.remove();
      }
    }, 1000);
  }
}

/**
 * Utility function to check if the DOM is ready
 * @returns {Promise} Promise that resolves when DOM is ready
 */
function domReady() {
  return new Promise((resolve) => {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', resolve);
    } else {
      resolve();
    }
  });
}

/**
 * Initialize the application when DOM is ready
 */
async function initApp() {
  await domReady();
  
  try {
    new RatingComponent();
  } catch (error) {
    console.error('Failed to initialize rating component:', error);
    
    // Fallback error handling
    const main = document.querySelector('.main');
    if (main) {
      main.innerHTML = `
        <div class="error-message" role="alert">
          <h2>Something went wrong</h2>
          <p>We're sorry, but there was an error loading the rating component. Please refresh the page and try again.</p>
        </div>
      `;
    }
  }
}

// Initialize the application
initApp(); 