# Rathinam Global University — Theme Documentation

## Color Palette

Extracted from RGU logo (deep purple + antique gold against dark ink).

| Token          | Hex       | Usage                                            |
|----------------|-----------|--------------------------------------------------|
| `--rgu-purple` | `#6B1F7C` | Primary brand color, buttons, icons, accents     |
| `--rgu-deep`   | `#3D0A4A` | Hero bg, dark sections, CTA section              |
| `--rgu-mid`    | `#8A2B9E` | Hover states, gradient midpoints                 |
| `--rgu-light`  | `#B85CC8` | Lighter purple accents, pill text, stat labels   |
| `--rgu-gold`   | `#C8922A` | Primary CTA background, Apply Now buttons        |
| `--rgu-amber`  | `#E5A83A` | Hover state for gold, floating badge numbers     |
| `--rgu-cream`  | `#FAF7F2` | Page background (warm off-white)                 |
| `--rgu-chalk`  | `#F2EDF7` | Alternate section background (slight purple tint)|
| `--rgu-ink`    | `#1A0520` | Primary text, footer background                  |
| `--rgu-smoke`  | `#6B6078` | Body text, captions, secondary info              |

### Usage Guidelines
- **Primary sections** (white bg): Use `bg-white` with `text-rgu-ink`
- **Alternate sections**: Alternate between `bg-rgu-cream` and `bg-rgu-chalk`
- **Dark sections**: Use `bg-rgu-deep` or `bg-rgu-ink` for drama (Hero, Placements, CTA, Footer)
- **Never** use pure white or pure black as backgrounds; always use the palette
- **No gradients** on primary backgrounds; solid colors only

---

## Typography

| Role      | Family                    | Weights Used          | CSS Variable       |
|-----------|---------------------------|-----------------------|--------------------|
| Display   | Fraunces (Google Fonts)   | 300i, 600, 700, 900  | `var(--ff-display)`|
| Body      | Instrument Sans           | 400, 500, 600, 700   | `var(--ff-body)`   |

### Font Scale (clamp-based for fluid sizing)
```css
/* Hero heading */
font-size: clamp(2.8rem, 6vw, 5.2rem);

/* Section heading */
font-size: clamp(2rem, 4vw, 3.4rem);

/* Sub-heading */
font-size: clamp(1.25rem, 2.5vw, 1.75rem);

/* Body text */
font-size: 1rem; /* 16px */

/* Small / labels */
font-size: 0.875rem; /* 14px */
font-size: 0.75rem;  /* 12px */
```

### Italic Usage
Fraunces has a beautiful optical-size italic. Use it for emphasis words within headings:
```html
<h2>Shape Your <em class="italic" style="font-style:italic">Future</em> at Rathinam</h2>
```
Always use `color: var(--rgu-purple)` or `color: var(--rgu-light)` for italic emphasis words in dark sections.

---

## Spacing & Layout

| Token            | Value                        |
|------------------|------------------------------|
| Container width  | `max-w-screen-xl` (1280px)   |
| Container padding| `px-5 sm:px-8 lg:px-10`      |
| Section padding  | `py-24 lg:py-32`             |
| Card gap         | `gap-5` to `gap-6`           |
| Card padding     | `p-6` or `px-6 py-7`        |

---

## Component Classes

### Section Header Pattern
```html
<div class="flex items-center gap-3 mb-4">
  <div class="section-rule"></div>  <!-- 32px wide, 2px tall, purple -->
  <span class="section-label">Section Name</span>
</div>
<h2 class="font-display text-[clamp(2rem,4vw,3.4rem)] font-bold text-rgu-ink">
  Heading with <em class="italic text-rgu-purple" style="font-style:italic">Italic Word</em>
</h2>
```

### Program Card
```html
<div class="prog-card reveal group">
  <div class="prog-icon"><i class="fas fa-[icon]"></i></div>
  <h3 class="font-display font-bold text-xl text-rgu-ink mb-2 mt-4 group-hover:text-rgu-purple transition-colors">Title</h3>
  <p class="text-rgu-smoke text-sm leading-relaxed mb-4">Description...</p>
  <a href="#" class="prog-link">Explore <i class="fas fa-arrow-right text-xs"></i></a>
</div>
```

### News Card
```html
<article class="news-card reveal group">
  <div class="news-img-wrap">
    <img src="..." alt="..." />
    <div class="news-date-badge">Apr 2025</div>
  </div>
  <div class="news-body">
    <span class="news-tag">Category</span>
    <h3 class="font-display font-bold text-lg text-rgu-ink mt-2 mb-2">Title</h3>
    <p class="text-rgu-smoke text-sm">Excerpt</p>
    <a href="#" class="news-read-more">Read More <i class="fas fa-arrow-right text-xs"></i></a>
  </div>
</article>
```

### Reveal Animation Classes
| Class           | Direction      | When to use                           |
|-----------------|----------------|---------------------------------------|
| `.reveal`       | Fade up        | Default for any element               |
| `.reveal-left`  | Slide from left| Left-side content in split layouts    |
| `.reveal-right` | Slide from right| Right-side content in split layouts  |

Add `style="transition-delay:.08s"` (multiples of 80ms) for stagger within a group.

---

## Icons

Use **Font Awesome 6 Free** exclusively. No emojis.

```html
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css" />

<!-- Examples -->
<i class="fas fa-graduation-cap"></i>  <!-- Education -->
<i class="fas fa-flask"></i>           <!-- Research -->
<i class="fas fa-handshake"></i>       <!-- Industry -->
<i class="fas fa-globe"></i>           <!-- Global -->
<i class="fas fa-microchip"></i>       <!-- Engineering -->
<i class="fas fa-brain"></i>           <!-- AI/DS -->
<i class="fas fa-briefcase"></i>       <!-- Business -->
<i class="fas fa-palette"></i>         <!-- Design -->
<i class="fas fa-heartbeat"></i>       <!-- Health Sciences -->
```

---

## Extending to New Pages

### 1. Inner Pages (Departments, Programs, Research)
Copy the navbar and footer from `index.html`. Then:
- Keep `bg-rgu-cream` as default body background
- Use the same section padding (`py-24 lg:py-32`)
- Use `bg-white` and `bg-rgu-chalk` for alternating sections
- Add a **page hero** with dark background (`bg-rgu-deep`) and the same pill + heading pattern

### 2. Adding New Sections
Follow this skeleton:
```html
<section id="your-id" class="py-24 lg:py-32 bg-white relative overflow-hidden">
  <div class="max-w-screen-xl mx-auto px-5 sm:px-8 lg:px-10">
    <!-- Section header -->
    <!-- Content -->
  </div>
</section>
```

### 3. Color Alternation Pattern
```
Hero          → bg-rgu-deep (dark)
Ticker        → bg-rgu-purple
About         → bg-rgu-cream
Stats         → bg-rgu-deep (dark)
Programs      → bg-white
Research      → bg-rgu-chalk
Placements    → bg-rgu-deep (dark)
Campus Life   → bg-rgu-chalk
Gallery       → bg-white
News          → bg-rgu-cream
CTA           → bg-rgu-deep (dark)
Footer        → bg-rgu-ink (darkest)
```

### 4. JavaScript Hooks
- `.reveal`, `.reveal-left`, `.reveal-right` → auto-observed for scroll reveal
- `.counter[data-target="N"]` → auto-animated counter
- `.progress-bar[style="--target-width:XX%"]` → auto-triggered width animation
- `.parallax-orb[data-speed="0.N"]` → hero orb parallax
- `.parallax-up[data-speed="0.N"]` → content float up on scroll
- `.parallax-img[data-speed="0.N"]` → gentle image parallax

### 5. Logo
Replace `./images/logo/RGU.png` with the actual logo path. The CSS applies `filter: brightness(10) saturate(0)` to convert it to white on dark backgrounds. If your logo is already white/light, add `class="logo-light"` to the `<img>` tag to disable the filter.

---

## Build Checklist for New Pages

- [ ] Link `styles.css` and `script.js`
- [ ] Include Tailwind CDN with tailwind.config (colors + fonts)
- [ ] Include Font Awesome 6 CDN
- [ ] Include Google Fonts (Fraunces + Instrument Sans)
- [ ] Copy `#navbar` HTML exactly (IDs must match JS)
- [ ] Copy `<footer id="contact">` HTML
- [ ] Replace placeholder images with real ones (same aspect ratios)
- [ ] Set all `alt` attributes with descriptive text
- [ ] Test on mobile (375px), tablet (768px), desktop (1280px+)
- [ ] Verify no horizontal scroll at any breakpoint

---

*Last updated: 2026. Maintained by the RGU Web Team.*
