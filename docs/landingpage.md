# Speqq Landing Page Implementation Plan

## 1. Page Layout

The landing page will be structured with the following layout sections:

- **Root Layout**: Base layout with metadata, fonts, and global providers
- **Header**: Fixed navigation with logo, nav links, dark mode toggle, and CTA button
- **Hero Section**: Main intro with headline, subheading, and app showcase
- **Features Section**: Grid of feature cards highlighting key product capabilities
- **Testimonials Section**: Social proof grid with customer testimonials
- **CTA Section**: Call-to-action with prominent buttons
- **Footer**: Site links, company info, and legal links

Each section will be a separate component for maintainability and will be assembled in the main page.tsx file.

## 2. Components

### Core Page Components

1. **Header**
   - Logo with gradient effect
   - Navigation links with hover animations
   - Dark mode toggle
   - Download CTA button

2. **Hero**
   - Large headline with gradient underline
   - Subheading text
   - Primary CTA button
   - Mock UI dashboard visualization
   - Scroll indicator
   - Background gradient effects

3. **Features**
   - Section header with title and description
   - Feature cards (3 cards showing key features)
   - Icon component for each feature
   - Hover animation effects

4. **Testimonials**
   - Section header
   - Testimonial cards (4 cards with quotes, names, and positions)
   - Avatar/initials component
   - Glass card effect with hover animation

5. **CTA Section**
   - Large headline
   - Supporting text
   - Primary and secondary buttons
   - Background gradient effect

6. **Footer**
   - Multi-column layout
   - Company info
   - Link groups (Company, Resources, Legal)
   - Copyright notice
   - Gradient separator at top

### Table Components
For future app demonstration sections, we'll include the table design patterns from the style guide:

1. **Base Table**
   - Styled header with sticky positioning
   - Interactive rows with hover effects
   - Alternating row colors (optional)
   - Responsive design patterns

2. **Advanced Table Features**
   - Sortable columns with indicators
   - Selectable rows with highlight effects
   - Expandable rows for detailed content
   - Status indicators with colored dots
   - Progress bars for visual metrics
   - Action buttons for row operations

## 3. UI Primitives (shadcn components)

We'll use the following shadcn components as building blocks:

1. **Button**
   - Primary variant (gradient background)
   - Secondary variant (outline style)
   - Different sizes (default, sm, lg)
   - Action button variant for tables

2. **Card**
   - Base card component
   - Feature card variant
   - Testimonial card variant
   - Glass card effect variant

3. **Avatar**
   - For testimonial user icons
   - Support for initials fallback

4. **Typography**
   - Heading components (h1-h4)
   - Paragraph component
   - Gradient text variant

5. **Container**
   - Centered content container with responsive padding

6. **Badge**
   - Used for small labels or status indicators

7. **Table**
   - Customized shadcn table component
   - Support for all special cell types
   - Responsive variants for different screens

8. **Sheet/Dialog**
   - For potential mobile navigation

9. **ScrollArea**
   - For smooth scrolling sections

10. **Separator**
    - Visual dividers between sections

11. **Progress**
    - For table progress indicators
    - Gradient fill option

Additional UI packages:
- **lucide-react**: For iconography
- **framer-motion**: For advanced animations
- **tailwind-merge & clsx**: For conditional styling

## 4. Style Guidelines

### Design Variables

#### Colors
- **Primary Background**: `--bg-primary: #121212`
- **Secondary Background**: `--bg-secondary: #1e1e1e`
- **Tertiary Background**: `--bg-tertiary: #252525`
- **Primary Accent**: `--accent-primary: #7F5AF0`
- **Secondary Accent**: `--accent-secondary: #4361ee`
- **Primary Text**: `--text-primary: #ffffff`
- **Secondary Text**: `--text-secondary: #a0a0a0`
- **Success**: `--success: #2cb67d`
- **Warning**: (Add from table styles)
- **Error**: (Add from table styles)

#### Border Radius
- **Small**: `--radius-sm: 4px`
- **Medium**: `--radius-md: 8px`
- **Large**: `--radius-lg: 16px`
- **Extra Large**: `--radius-xl: 24px`
- **Full**: `--radius-full: 9999px`

#### Spacing
- **1**: `--space-1: 0.25rem`
- **2**: `--space-2: 0.5rem`
- **3**: `--space-3: 0.75rem`
- **4**: `--space-4: 1rem`
- **6**: `--space-6: 1.5rem`
- **8**: `--space-8: 2rem`
- **12**: `--space-12: 3rem`
- **16**: `--space-16: 4rem`
- **24**: `--space-24: 6rem`
- **32**: `--space-32: 8rem`

#### Shadows
- **Small**: `--shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.1)`
- **Medium**: `--shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)`
- **Large**: `--shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)`
- **Extra Large**: `--shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)`
- **2XL**: `--shadow-2xl: 0 25px 50px -12px rgba(0, 0, 0, 0.25)`
- **Inset**: `--shadow-inset: inset 0 0 0 1px rgba(255, 255, 255, 0.05)`
- **Glow**: `--shadow-glow: 0 0 15px rgba(127, 90, 240, 0.3)`

#### Typography
- **Font Family**: `--font-sans: 'Segoe UI', 'Inter', system fonts`
- **Line Height Tight**: `--line-height-tight: 1.2`
- **Line Height Normal**: `--line-height-normal: 1.6`

#### Transitions
- **Fast**: `--transition-fast: 0.2s cubic-bezier(0.4, 0, 0.2, 1)`
- **Normal**: `--transition-normal: 0.3s cubic-bezier(0.4, 0, 0.2, 1)`
- **Slow**: `--transition-slow: 0.5s cubic-bezier(0.4, 0, 0.2, 1)`
- **Bounce**: `--transition-bounce: 0.5s cubic-bezier(0.2, 0.8, 0.2, 1)`
- **Elastic**: `--transition-elastic: 0.6s cubic-bezier(0.76, 0, 0.24, 1)`

### Component-Specific Styles

#### Typography
- H1: 3.5rem, font-weight: 800, line-height: 1.2, letter-spacing: -1px
- H2: 2.5rem, font-weight: 700, letter-spacing: -0.5px
- H3: 1.5rem, font-weight: 600
- Body: 1rem, normal, line-height: 1.6
- Small: 0.875rem
- Use tabular numbers for numerical data (`font-variant-numeric: tabular-nums`)

#### Buttons
- Primary: Gradient background, white text, shadow effect on hover
- Secondary: Transparent with border, text color transitioning to white on hover
- Pulse effect for emphasis on primary CTAs
- Scale and shadow transitions on hover
- Interactive states (hover, active, focus)

#### Cards
- Feature cards: Background with subtle gradient, icon with glow effect
- Testimonial cards: Glass effect with blur, subtle border
- Hover animations with transform and shadow changes
- Consistent padding and spacing

#### Navigation
- Fixed header with backdrop blur
- Hover effects for nav links with underline animation
- Active state indication
- Mobile-friendly navigation variants

#### Tables (from Style Guide)
- Consistent table styling with dark mode aesthetics
- Header with sticky positioning and gradient background
- Row hover effects and alternating colors for readability
- Interactive elements (sortable columns, selectable rows)
- Special cell types (status, progress, actions)
- Responsive table patterns for smaller screens
- Loading states with skeleton animation

### Effects & Animations

#### Global Animations
- Fade in: `fadeIn 0.8s cubic-bezier(0.215, 0.61, 0.355, 1) forwards`
- Float: `float 6s ease-in-out infinite`
- Pulse: `pulse 2s infinite`
- Gradient shift: `gradientShift 8s ease infinite`
- Scroll indicator: `scrollDown 2s cubic-bezier(0.76, 0, 0.3, 1) infinite`
- Shimmer effect: `shimmer 2s infinite` with gradient background

#### Interactive Effects
- Hover transitions for all interactive elements
- Scale and shadow changes on hover for cards and buttons
- Gradient transitions for text and backgrounds
- Focus states for accessibility with accent outlines
- Loading states with skeleton animations

#### Design Accents
- Subtle grain texture overlay for depth
- Glassmorphism elements with backdrop-blur
- Background gradient orbs for visual interest
- Border and shadow combinations for layered effect
- Glow effects for emphasis on important elements

### Responsive Design Patterns

#### Breakpoints
- Mobile: < 768px
- Tablet: 768px - 992px
- Desktop: > 992px

#### Mobile Adaptations
- Stack grid layouts for features and testimonials
- Center-align hero content, hide hero image
- Simplified navigation with mobile menu
- Fluid typography scaling
- Stack table data or scroll horizontally
- Adjusted spacing and sizing

## 5. Implementation Strategy

1. **Setup Phase**
   - Install shadcn UI components
   - Configure tailwind with custom colors and design variables
   - Set up globals.css with all variables and base styles
   - Create utility functions for animations/styling

2. **Component Development**
   - Build UI primitives first
   - Develop larger components using primitives
   - Implement responsive designs for all viewports
   - Add animations and interactions

3. **Page Assembly**
   - Integrate all components into page.tsx
   - Implement smooth scrolling navigation
   - Add scroll-based reveal animations
   - Test performance and accessibility

4. **Optimization**
   - Implement proper image handling with Next.js Image
   - Ensure responsive performance
   - Audit accessibility
   - Test cross-browser compatibility

## 6. Additional Features

- **Dark/Light Mode Toggle**: With theme persistence
- **Scroll-Based Animations**: Elements that animate as they enter viewport
- **Smooth Scrolling**: For navigation links
- **Performance Optimizations**: Code splitting, image optimization
- **SEO Setup**: Metadata, OG tags, structured data
- **Analytics Integration**: (optional) Basic event tracking
- **Table Examples**: Create demo tables for app showcase area