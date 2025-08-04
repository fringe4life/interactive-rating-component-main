# Frontend Mentor - Interactive rating component solution

This is a solution to the [Interactive rating component challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/interactive-rating-component-koxpeBUmI). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
- [Author](#author)

## Overview

### The challenge

Users should be able to:

- View the optimal layout for the app depending on their device's screen size
- See hover states for all interactive elements on the page
- Select and submit a number rating
- See the "Thank you" card state after submitting a rating

### Screenshot

![Design preview for the Interactive rating component](./preview.jpg)

### Links

- Solution URL: [GitHub Repository](https://github.com/yourusername/interactive-rating-component)
- Live Site URL: [Live Demo](https://your-live-site-url.com)

## My process

### Built with

- **Semantic HTML5 markup** - Proper heading hierarchy, form elements, and ARIA attributes
- **CSS custom properties** - Design tokens for colors, typography, and spacing
- **CSS Grid & Flexbox** - Modern layout techniques for responsive design
- **Mobile-first responsive design** - Optimized for all screen sizes
- **Vanilla JavaScript (ES6+)** - Class-based component architecture
- **Accessibility-first approach** - WCAG compliant with screen reader support
- **CSS utility classes** - Reusable design system components
- **Template elements** - Clean separation of HTML structure

### What I learned

This project reinforced several important concepts and introduced new techniques:

#### Design System Architecture
I learned to extract design tokens from Figma and create a comprehensive design system:

```css
/* Design tokens for consistent theming */
:root {
  --color-orange-500: hsl(25, 97%, 53%);
  --color-grey-900: hsl(213, 19%, 18%);
  --spacing-400: 2rem; /* 32px */
}

/* Typography utility classes */
.text-preset-1 {
  font-family: 'Overpass', sans-serif;
  font-weight: 700;
  font-size: 1.75rem; /* 28px */
  line-height: 2.25rem; /* 36px */
}
```

#### Accessibility Best Practices
Implemented comprehensive accessibility features:

```html
<!-- Proper ARIA relationships -->
<div class="rating-buttons" role="radiogroup" 
     aria-labelledby="rating-title" 
     aria-describedby="rating-description">
  <input type="radio" name="rating" value="1" class="rating-input">
</div>

<!-- Screen reader announcements -->
<div class="sr-only" id="submit-instruction">
  Submit button is disabled until you select a rating
</div>
```

#### JavaScript Component Architecture
Created a maintainable class-based component:

```javascript
class RatingComponent {
  constructor() {
    this.selectedRating = 0;
    this.submitButton = null;
    this.init();
  }

  updateSubmitButtonState() {
    const hasRating = this.selectedRating > 0;
    this.submitButton.disabled = !hasRating;
    
    if (hasRating) {
      this.announceSubmitButtonState(true);
    }
  }
}
```

#### CSS Utility-First Approach
Extracted common patterns into reusable utilities:

```css
/* Utility classes for common patterns */
.grid-center {
  display: grid;
  place-items: center;
}

.square {
  aspect-ratio: 1;
}

.no-margin {
  margin: 0;
}
```

### Continued development

Areas I want to focus on in future projects:

1. **Advanced CSS animations** - Implement more sophisticated micro-interactions
2. **Form validation** - Add comprehensive client-side validation with better UX
3. **State management** - Explore more complex state patterns for larger applications
4. **Testing** - Implement unit and integration tests for JavaScript components
5. **Performance optimization** - Focus on bundle size and loading performance
6. **Internationalization** - Add multi-language support for accessibility

### Useful resources

- [MDN Web Docs - ARIA](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA) - Comprehensive guide to ARIA attributes and accessibility
- [CSS Grid Layout](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout) - Deep dive into CSS Grid for modern layouts
- [Web.dev - Accessibility](https://web.dev/accessibility/) - Google's accessibility guidelines and best practices
- [CSS Custom Properties](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties) - Guide to CSS variables and design tokens
- [JavaScript Classes](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes) - Modern JavaScript class syntax and patterns

## Author

- Frontend Mentor - [@coinnich](https://www.frontendmentor.io/profile/fringe4life)
- GitHub - [@coinnich](https://github.com/fringe4life)

---

**Note**: This project demonstrates modern web development practices with a focus on accessibility, maintainability, and user experience. The design system approach ensures consistency and scalability, while the accessibility-first mindset ensures the component works for all users.
