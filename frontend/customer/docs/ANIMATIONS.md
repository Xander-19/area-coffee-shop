# Animation & Scroll Animation Guide

This project includes two sets of CSS animation utilities defined in `src/index.css`.
No extra packages or imports are needed -- just add classes to any element's `className`.

---

## 1. Instant Animations (`anim-*`)

These play **immediately** when the element renders on the page.

### Animation Classes

| Class              | Effect                        | Duration |
|--------------------|-------------------------------|----------|
| `anim-fade-up`    | Fade in + slide up            | 0.7s     |
| `anim-fade-down`  | Fade in + slide down          | 0.7s     |
| `anim-fade-left`  | Fade in from the left         | 0.7s     |
| `anim-fade-right` | Fade in from the right        | 0.7s     |
| `anim-zoom-in`    | Fade in + scale up            | 0.6s     |
| `anim-zoom-out`   | Fade in + scale down          | 0.6s     |
| `anim-fade`       | Simple fade in                | 0.6s     |
| `anim-slide-up`   | Slide up from below (no fade) | 0.5s     |
| `anim-bounce-in`  | Bouncy pop-in                 | 0.7s     |
| `anim-float`      | Gentle floating loop          | 3s       |

### Delay Classes

Add a delay before the animation starts.

| Class             | Delay  |
|-------------------|--------|
| `anim-delay-100`  | 100ms  |
| `anim-delay-200`  | 200ms  |
| `anim-delay-300`  | 300ms  |
| `anim-delay-400`  | 400ms  |
| `anim-delay-500`  | 500ms  |

### Duration Classes

Override the default duration.

| Class           | Duration |
|-----------------|----------|
| `anim-fast`     | 0.4s     |
| `anim-slow`     | 1.2s     |

### Repeat Classes

| Class            | Behavior         |
|------------------|------------------|
| `anim-once`      | Play once        |
| `anim-infinite`  | Loop forever     |

### Examples

**Basic fade up:**
```jsx
<h1 className="anim-fade-up">Hello World</h1>
```

**Zoom in with a delay:**
```jsx
<div className="anim-zoom-in anim-delay-200">
  Card content
</div>
```

**Slow fade from the right:**
```jsx
<p className="anim-fade-right anim-slow">
  This text slides in slowly from the right
</p>
```

**Floating icon (loops forever):**
```jsx
<span className="anim-float">☕</span>
```

**Staggered list items:**
```jsx
<div className="anim-fade-up">First item</div>
<div className="anim-fade-up anim-delay-100">Second item</div>
<div className="anim-fade-up anim-delay-200">Third item</div>
<div className="anim-fade-up anim-delay-300">Fourth item</div>
```

---

## 2. Scroll-Triggered Animations (`scroll-*`)

These stay **hidden** until you scroll the element into view. The animation
replays every time you scroll away and back.

### How It Works

1. Add `scroll-reveal` as the base class (required).
2. Add a direction class to choose the animation style.
3. Optionally add a delay class.

The observer is set up globally in `App.jsx` -- no imports or extra setup needed.

### Direction Classes

| Class                | Effect                    |
|----------------------|---------------------------|
| `scroll-fade-up`    | Fade in + slide up        |
| `scroll-fade-down`  | Fade in + slide down      |
| `scroll-fade-left`  | Fade in from the left     |
| `scroll-fade-right` | Fade in from the right    |
| `scroll-zoom-in`    | Fade in + scale up        |
| `scroll-bounce-in`  | Bouncy pop-in             |

### Delay Classes

| Class              | Delay  |
|--------------------|--------|
| `scroll-delay-100` | 100ms  |
| `scroll-delay-200` | 200ms  |
| `scroll-delay-300` | 300ms  |
| `scroll-delay-400` | 400ms  |
| `scroll-delay-500` | 500ms  |

### Examples

**Basic scroll fade up:**
```jsx
<section className="scroll-reveal scroll-fade-up">
  <h2>This fades up when scrolled into view</h2>
</section>
```

**Scroll zoom with delay:**
```jsx
<div className="scroll-reveal scroll-zoom-in scroll-delay-200">
  Card content
</div>
```

**Staggered cards on scroll:**
```jsx
<div className="grid grid-cols-3 gap-6">
  <div className="scroll-reveal scroll-fade-up">Card 1</div>
  <div className="scroll-reveal scroll-fade-up scroll-delay-100">Card 2</div>
  <div className="scroll-reveal scroll-fade-up scroll-delay-200">Card 3</div>
</div>
```

**Slide from left and right:**
```jsx
<div className="grid grid-cols-2 gap-8">
  <div className="scroll-reveal scroll-fade-right">Left column</div>
  <div className="scroll-reveal scroll-fade-left">Right column</div>
</div>
```

**Using with map (dynamic stagger):**
```jsx
{items.map((item, i) => (
  <div
    key={item.id}
    className={`scroll-reveal scroll-fade-up scroll-delay-${(i % 5 + 1) * 100}`}
  >
    {item.name}
  </div>
))}
```
> Note: Only `scroll-delay-100` through `scroll-delay-500` exist.
> For dynamic delays beyond that, use inline `style={{ transitionDelay: '600ms' }}`.

---

## 3. Combining Both Systems

You can use instant animations and scroll animations on **different elements**
on the same page. Do **not** combine both on the same element.

```jsx
{/* Hero text animates instantly on page load */}
<h1 className="anim-fade-up">Welcome to Area Coffee</h1>

{/* Content below the fold animates on scroll */}
<section className="scroll-reveal scroll-fade-up">
  <p>This section animates when you scroll down to it</p>
</section>
```

---

## 4. Accessibility

All animations respect `prefers-reduced-motion: reduce`. Users with motion
sensitivity will see content appear instantly with no animation.

---

## Quick Reference

```
INSTANT (plays on render):
  anim-fade-up | anim-fade-down | anim-fade-left | anim-fade-right
  anim-zoom-in | anim-zoom-out  | anim-fade      | anim-slide-up
  anim-bounce-in | anim-float
  + anim-delay-{100-500} | anim-fast | anim-slow | anim-once | anim-infinite

SCROLL (plays on scroll into view, replays every time):
  scroll-reveal (required base) +
  scroll-fade-up | scroll-fade-down | scroll-fade-left | scroll-fade-right
  scroll-zoom-in | scroll-bounce-in
  + scroll-delay-{100-500}
```
