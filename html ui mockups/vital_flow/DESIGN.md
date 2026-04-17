```markdown
# Design System Document

## 1. Overview & Creative North Star: "The Fluid Sanctuary"
This design system moves away from the rigid, clinical nature of health tracking and embraces the restorative, ethereal quality of water. The Creative North Star is **"The Fluid Sanctuary."** We are not just building a utility; we are creating a digital environment that feels as refreshing as a cold glass of water.

To move beyond a "standard" layout, this system utilizes **intentional asymmetry** and **atmospheric depth**. We break the "template" look by overlapping rounded containers and using high-contrast typography scales that feel editorial and premium. The interface should breathe, utilizing expansive white space (the "Surface") to let the deep blues and vibrant turquoises (the "Liquids") stand out as focal points of action and achievement.

---

## 2. Colors: Tonal Depth & The "No-Line" Rule
The palette is a sophisticated spectrum of blues, from the deep stability of the ocean to the kinetic energy of a mountain stream.

### The "No-Line" Rule
**Explicit Instruction:** Designers are prohibited from using 1px solid borders for sectioning. Boundaries must be defined solely through background color shifts or subtle tonal transitions. For example, a `surface-container-low` section sitting on a `surface` background provides all the separation necessary.

### Surface Hierarchy & Nesting
Treat the UI as a series of physical layers—like stacked sheets of frosted glass.
- **Surface (Base):** `#f7f9fb` – The canvas.
- **Surface-Container-Lowest:** `#ffffff` – Use for the most elevated "hero" cards.
- **Surface-Container-High:** `#e6e8ea` – Use for recessed background elements like progress tracks.

### The "Glass & Gradient" Rule
To elevate the experience, use **Glassmorphism** for floating elements (e.g., navigation bars or quick-add buttons). Use `surface` colors at 70% opacity with a `20px` backdrop-blur. 

**Signature Texture:** Main CTAs or hydration "waves" should use a linear gradient:
`linear-gradient(135deg, #0058bf 0%, #006fef 100%)` (Primary to Primary-Container). This adds "soul" and dimension that flat color cannot replicate.

---

## 3. Typography: Editorial Clarity
We pair the geometric friendliness of **Plus Jakarta Sans** for high-impact displays with the functional precision of **Manrope** for data-heavy body text.

*   **Display (Plus Jakarta Sans):** Large, airy, and confident. Use `display-lg` (3.5rem) for daily goal numbers.
*   **Headline (Plus Jakarta Sans):** Used for section headers to provide a premium, "magazine" feel.
*   **Body (Manrope):** Optimized for legibility. `body-lg` (1rem) is the standard for user input and descriptions.
*   **Label (Manrope):** Used for micro-copy and timestamps.

The contrast between the oversized, bold display types and the clean, functional body text creates a hierarchy that feels both authoritative and approachable.

---

## 4. Elevation & Depth: Tonal Layering
Traditional drop shadows are too "heavy" for a hydration app. We achieve lift through light and color.

*   **The Layering Principle:** Place a `surface-container-lowest` card on a `surface-container-low` section. This creates a soft, natural lift without a single pixel of shadow.
*   **Ambient Shadows:** When a card must float (e.g., a modal), use an extra-diffused shadow: `box-shadow: 0 12px 32px rgba(25, 28, 30, 0.06);`. The shadow color is a tinted version of `on-surface` at a very low opacity.
*   **The "Ghost Border" Fallback:** If a border is required for accessibility, use the `outline-variant` (`#c1c6d7`) at **15% opacity**. Never use 100% opaque borders.
*   **Interactive Glass:** For floating action buttons, use the `secondary-container` (`#56f5f8`) with a subtle `32px` blur background to mimic sunlight hitting water.

---

## 5. Components

### Buttons
*   **Primary:** High-pill shape (`9999px`). Uses the signature gradient. Bold `on-primary` text.
*   **Secondary:** Ghost-style with a `surface-container-high` background. No border.
*   **Tertiary:** Text-only, using the `primary` color for links.

### Cards & Lists
**Forbid the use of divider lines.** Separate list items using `1.5rem` (md) vertical whitespace or by placing items inside nested containers with alternating `surface-container` tones. Cards should use the `lg` (2rem) roundedness scale for a soft, friendly feel.

### Input Fields
Soft, `surface-container-highest` backgrounds with no borders. On focus, the background shifts to `surface-container-lowest` with a subtle `primary` glow.

### Signature Component: The Hydration Wave
A custom progress visualization. Instead of a flat bar, use a fluid, animated wave SVG using `primary` and `secondary` colors with varying opacities to represent the water level.

### Chips
Small, pill-shaped (`9999px`) containers using `secondary-fixed` for active states. They should feel like smooth river stones.

---

## 6. Do’s and Don’ts

### Do:
*   **Embrace Asymmetry:** Place a large `display-lg` metric off-center to create a modern, high-end editorial feel.
*   **Use Generous Padding:** Water needs room to flow. Use the `xl` (3rem) spacing for outer page margins.
*   **Thin-Line Icons:** Use 1.5pt stroke weights for icons to maintain the "lightweight" brand promise.

### Don’t:
*   **Don't use Black:** Never use `#000000`. Use `on-surface` (`#191c1e`) for text to keep the contrast soft.
*   **Don't use Sharp Corners:** Avoid the `none` or `sm` roundedness tokens for containers. Stick to `DEFAULT`, `lg`, and `xl`.
*   **Don't Over-Shadow:** If the layout feels "muddy," you likely have too many shadows. Revert to Tonal Layering.
*   **Don't use Dividers:** If you feel the need for a line, try a `0.5rem` gap of empty space instead.```