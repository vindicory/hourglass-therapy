# Hourglass Therapy Website

## Project Overview

Hourglass Therapy is a Bristol-based Counselling and Psychotherapy practice founded by Caroline Griffiths. This website serves as the digital presence for the practice, providing information about services, the therapist, and ways to get in touch.

**Tagline:** "Taking Time for You"

## Technology Stack

- **HTML5** - Semantic markup
- **Tailwind CSS** - Utility-first CSS framework (via CDN)
- **Express.js** - Static file server
- **Google Fonts** - DM Serif Display, Playfair Display, Inter

## Running the Project

```bash
# Install dependencies
npm install

# Start the server
node server.js

# Access at http://100.95.191.86:8092/
```

## Design System

### Color Palette

| Name | Hex | Tailwind Class | Usage |
|------|-----|----------------|-------|
| Cream 50 | `#fff8f0` | `cream-50` | Page background, light sections |
| Cream 100 | `#f3ece2` | `cream-100` | Card backgrounds, subtle contrast |
| Cream 200 | `#eee4d7` | `cream-200` | Badges, secondary cards |
| Cream 300 | `#e8dbc9` | `cream-300` | Borders, deeper accents |
| Forest | `#31372f` | `forest` | Primary text, dark backgrounds (footer) |
| Accent Blue | `#237cad` | `accent` | CTAs, links, highlights |

### Typography

| Font | Usage | Tailwind Class |
|------|-------|----------------|
| DM Serif Display | Main headings (h1, h2) | `font-serif` |
| Playfair Display | Card headings (h3) | `font-playfair` |
| Inter | Body text, UI elements | `font-sans` |

### Spacing & Layout

- **Max content width:** `max-w-7xl` (1280px)
- **Section padding:** `py-20 px-6`
- **Card border radius:** `rounded-3xl`
- **Grid gaps:** `gap-6` to `gap-12`

### Components

#### Buttons

Primary (dark):
```html
<a class="inline-flex items-center gap-2 bg-forest text-cream-50 px-6 py-3 rounded-full hover:bg-forest/90 transition-colors">
```

Secondary (outline):
```html
<a class="inline-flex items-center gap-2 border border-forest px-6 py-3 rounded-full hover:bg-forest hover:text-cream-50 transition-colors">
```

Accent (blue):
```html
<a class="inline-flex items-center gap-2 bg-accent text-white px-5 py-2.5 rounded-full text-sm hover:bg-accent/90 transition-colors">
```

#### Cards

Service cards have image + content layout:
```html
<div class="bg-cream-50 rounded-3xl overflow-hidden">
  <img class="w-full h-56 object-cover">
  <div class="p-6">
    <!-- content -->
  </div>
</div>
```

#### Badges/Tags

```html
<span class="inline-flex items-center gap-2 bg-cream-200 px-4 py-2 rounded-full text-sm">
  <svg><!-- checkmark --></svg>
  Label
</span>
```

## File Structure

```
hourglass-therapy/
├── index.html          # Main homepage
├── server.js           # Express static server
├── package.json        # Node dependencies
├── claude.md           # This file
└── images/
    ├── logo.png        # Dark logo for light backgrounds
    ├── logo-light.png  # Light logo for dark backgrounds
    ├── caroline.webp   # About section portrait
    ├── face-to-face.webp
    ├── telephone.webp
    ├── walk-talk.webp
    ├── couples.webp
    ├── newsletter-bg.png
    └── hero-bg.png
```

## Page Sections

### 1. Navigation
- Fixed position header
- Logo on left, nav links on right
- Mobile hamburger menu (hidden on desktop)

### 2. Hero Section
- Large serif heading "Taking Time for You"
- Subtitle describing the practice
- Two CTAs: "Join Us Today" (primary) and "Book Now" (secondary)
- Gradient background (cream tones)

### 3. Feature Cards
- 2x2 grid of cards
- First card is text-only (Compassionate Support)
- Other 3 cards have images with text below
- Highlights key therapy benefits

### 4. About Section
- Two-column layout (image | text)
- Caroline's portrait on left
- Bio text with trait badges on right
- Traits: Compassionate, Integrative, Collaborative, Experienced, Grounded

### 5. Services Section
- Section header with "Hourglass" label
- 2x2 grid of service cards
- Each card: image, title, description, "Book Now" CTA
- Services: Face-to-Face, Telephone, Walk & Talk, Couples Counselling

### 6. Newsletter CTA
- Full-width background image with dark overlay
- Centered content with email signup form
- "No Spam" reassurance message

### 7. Footer
- Dark forest background
- Logo and tagline
- Social links (LinkedIn, Facebook, Instagram)
- 5-column link grid (Home, About, Services, Other, Contact)
- Copyright notice

## Services Offered

1. **Face-to-Face Counselling** - In-person sessions at Bristol location
2. **Telephone Counselling** - Phone-based talk therapy
3. **Walk & Talk Therapy** - Outdoor nature-based sessions
4. **Couples Counselling** - Relationship support

## Contact Information

- **Email:** hello@hourglasstherapy.co.uk
- **LinkedIn:** linkedin.com/in/caroline-griffiths-748163a3/
- **Instagram:** @hourglasstherapy
- **Facebook:** Hourglass Therapy page

## Future Pages to Create

- `about.html` - Expanded about page with mission/values
- `services.html` - Detailed service descriptions
- `pricing.html` - Pricing information and booking
- `contact.html` - Contact form and location info
- `testimonials.html` - Client testimonials

## Design Notes

- The design uses warm, calming colors (cream/beige tones) to create a welcoming, therapeutic feel
- Serif fonts for headings add elegance and professionalism
- Rounded corners throughout create a soft, approachable aesthetic
- Images feature diverse people to represent inclusive practice
- Blue accent color provides contrast for actionable elements
