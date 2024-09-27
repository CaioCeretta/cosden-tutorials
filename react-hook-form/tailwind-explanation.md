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

When to Use: Use this when you want to build reusable components (like buttons, cards, etc.) that leverage Tailwind’s
utilities.

Example:
@tailwind components;

.btn {
  @apply bg-blue-500 text-white rounded-lg px-4 py-2;
}

2. @tailwind components

@tailwind components directive injects Tailwind's pre-designed component-level styles like buttons and forms. It’s used
to manage reusable component styles before utilities are applied.

3. @tailwind utilities
Purpose: This directive includes all of Tailwind’s utility classes, which you can use directly in your HTML for rapid styling.
When to Use: Include this in your main CSS file to enable the use of Tailwind’s utility classes throughout your project.
Example:
@tailwind utilities;


in summary

@tailwind base: Use to reset and define foundational styles.
@tailwind components: Use to create reusable custom components with Tailwind utilities.
@tailwind utilities: Use to access the full set of Tailwind’s utility classes in your HTML.

and @apply is used when we want to override tailwind default styles.

Here on our index.css we have, for example, this

button,
button[type="submit"] {
  @apply rounded-md bg-gradient-to-r from-primary-500 to-secondary-600 px-6 py-2 text-black hover:opacity-50;
}

So every button we create is going to have those custom classes, but i said that apply must be used within the @components
directive.
This is working because the @tailwind base, components and utilities directives define where Tailwind injects its
pre-configured styles.
Basically this is working like in the three first lines
@tailwind base: Injects the base styles, which include browser resets and global styles.
@tailwind components: Injects component-level styles (such as buttons, cards, etc.);
@tailwind utilities: Injects utility classes like margin, padding, flex, etc.

When we add custom styles outside of these directives, like body, button and input as we are doing, they're applied after
the tailwind directives. This is allowed because the custom styles are processed after the core styles, so they overide
them if necessary.

So, it's not necessary four our custom styles to be inside the @components directive for them to work
We can place custom styles anywhere in the CSS file as long as they're after the Tailwind directives, ensuring they
override any conflicting tailwind styles.
