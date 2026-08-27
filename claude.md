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

# Access at http://100.69.78.93:18080/ (Tailscale)
```

## Design System

### Color Palette

Source of truth: the Hourglass Therapy brand colours supplied 2026-08-27 (three swatch groups). Tokens live in each page's Tailwind config.

| Name | Hex | Tailwind Class | Usage |
|------|-----|----------------|-------|
| Brand 50 | `#f7f7f7` | `brand-50` | Neutral off-white (available, unused) |
| Brand 100 | `#eef7fd` | `brand-100` | Lighter sections, cards on base-blue sections |
| Brand 200 | `#d3e5f2` | `brand-200` | Page background, header, base sections, dropdown hover |
| Brand 300 | `#c0ddf4` | `brand-300` | Badges, secondary cards, card borders |
| Brand 400 | `#94b4c8` | `brand-400` | Mid blue-grey (available) |
| Brand 500 | `#85a8bd` | `brand-500` | Logo mid blue (available) |
| Brand 600 | `#5a8298` | `brand-600` / `accent` | CTAs, buttons, tinted backgrounds (`bg-accent/10`), focus rings |
| Brand 700 | `#4a6b7d` | `brand-700` | Link and label text (derived: darker than 600 for contrast) |
| Brand 800 | `#2f4a58` | `brand-800` | Primary text, dark sections (derived from 600) |
| Brand 900 | `#21353f` | `brand-900` | Footer background (derived from 600) |
| Sand 50 | `#f5f5f0` | `sand-50` | Light text and translucent overlays on dark backgrounds |
| Sand 100 | `#ede7d6` | `sand-100` | Muted text on dark backgrounds (footer) |
| Mist 100 | `#e7edeb` | `mist-100` | Pale grey-green (available) |
| Mist 200 | `#b6c2c3` | `mist-200` | Stone grey (available) |
| Brand Sky 100 | `#badff8` | `brand-sky-100` | Light blue (available) |
| Brand Sky 200 | `#b6d9f6` | `brand-sky-200` | Light blue (available) |
| Slate Muted | `#63808d` | `slate-muted` | Muted slate (available) |
| Slate Deep | `#5a8399` | `slate-deep` | Slate blue (available) |

Brand 700-900 are not in the supplied swatches; they are darkened tints of `#5a8298` added because the brand set has no colour dark enough for body text.

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
<a class="inline-flex items-center gap-2 bg-brand-800 text-sand-50 px-6 py-3 rounded-full hover:bg-brand-800/90 transition-colors">
```

Secondary (outline):
```html
<a class="inline-flex items-center gap-2 border border-brand-800 px-6 py-3 rounded-full hover:bg-brand-800 hover:text-sand-50 transition-colors">
```

Accent (blue):
```html
<a class="inline-flex items-center gap-2 bg-accent text-white px-5 py-2.5 rounded-full text-sm hover:bg-accent/90 transition-colors">
```

#### Cards

Service cards have image + content layout:
```html
<div class="bg-brand-100 rounded-3xl overflow-hidden">
  <img class="w-full h-56 object-cover">
  <div class="p-6">
    <!-- content -->
  </div>
</div>
```

#### Badges/Tags

```html
<span class="inline-flex items-center gap-2 bg-brand-300 px-4 py-2 rounded-full text-sm">
  <svg><!-- checkmark --></svg>
  Label
</span>
```

## File Structure

```
hourglass-therapy/
├── index.html          # Main homepage
├── couples-counselling.html  # Couples counselling service page (same layout as supervision.html)
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
    ├── contact-cta-bg.webp
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
- Background video (hourglass with blue sand) with dark overlay

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

### 6. Contact CTA
- Full-width Clifton Suspension Bridge at dusk (`images/contact-cta-bg.webp`, wordmark cropped off, anchored top) with dark overlay
- Left: "Let's take the next step together." heading and reassurance copy
- Right: slate card with "Contact me" button linking to contact.html and a mailto link

### 7. Footer
- Dark slate background (`brand-900`)
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

- The design uses the brand palette of soft blues and slate tones to create a calm, therapeutic feel
- Serif fonts for headings add elegance and professionalism
- Rounded corners throughout create a soft, approachable aesthetic
- Images feature diverse people to represent inclusive practice
- Slate blue accent (`#5a8298`) marks actionable elements; dark slate (`#2f4a58`) carries text
