Tailwind has some directives we can use to combine multiple utility classes into single custom class

1. @apply
Purpose: Combines multiple utility classes into one custom class.
Example:

.btn {
  @apply bg-blue-500 text-white rounded-lg px-4 py-2;
}

Use Case: Useful when you have complex styles that you want to reuse across different elements.

2. @tailwind base
Purpose: This directive includes Tailwind’s base styles (or "preflight"), which are styles that reset default browser
styles and apply some foundational styles.
When to Use: You should include this directive once at the beginning of your main CSS file. It sets up a consistent
baseline across browsers.
Example:

3. @tailwind components
Purpose: This directive includes any component-level styles defined by Tailwind. It’s where you can define custom component
styles using the @apply directive.

When to Use: Use this when you want to build reusable components (like buttons, cards, etc.) that leverage Tailwind’s
utilities.

Example:
@tailwind components;

.btn {
  @apply bg-blue-500 text-white rounded-lg px-4 py-2;
}

4. @tailwind utilities
Purpose: This directive includes all of Tailwind’s utility classes, which you can use directly in your HTML for rapid styling.
When to Use: Include this in your main CSS file to enable the use of Tailwind’s utility classes throughout your project.
Example:
@tailwind utilities;


in summary

@tailwind base: Use to reset and define foundational styles.
@tailwind components: Use to create reusable custom components with Tailwind utilities.
@tailwind utilities: Use to access the full set of Tailwind’s utility classes in your HTML.

and @apply is used when we want to override tailwind default styles.

For instance, if we want to customize a button's styles beyond what taylwind provides, we would define a new class in the
@tailwind components section and use @apply to pull in the utilities we need, like this

@tailwind base;
@tailwind components;

.btn {
  @apply bg-blue-500 text-white rounded-lg px-4 py-2 hover:bg-blue-700;
}

@tailwind utilities;

