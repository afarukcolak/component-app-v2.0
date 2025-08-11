# **App Name**: CircuitBase

## Core Features:

- Add Resistor: Add resistors with specified Ohm values (including support for Mega and Kilo prefixes). A unique identifier (R-1, R-2, etc.) is automatically assigned, but the user can override it, although the app should default to the next available unused resistor number.
- Resistor Visualization: Visualize the resistor with a graphical representation and color bands corresponding to the entered Ohm value, directly within the resistor creation interface.
- Add Capacitor: Add capacitors with specified Farad values. Assign a unique identifier (C-1, C-2, etc.) to each new capacitor. Identifier assignment works the same way it does for resistors.
- Capacitor Visualization: Visualize capacitor value, shown numerically on a schematic capacitor symbol.
- Component Listing: Display a list of added components (resistors and capacitors) in a tabular format. Table columns include Component Number, Value, and Animation. The user can update each resistor or capacitor after it's been created.
- Component Inventory Status: Indicate if a component has been 'taken from the component box' via a checkbox. Selecting this box grays out and italicizes the corresponding row in the component table.
- Component Suggestion: AI-powered tool that offers suitable capacitor replacements for specific resistor combinations based on application needs.

## Style Guidelines:

- Primary color: Dark Purple (#6A478F) for a sophisticated and technical feel.
- Background color: Very light purple (#F0EEF3). Background desaturation complements the dark purple primary, keeping it sleek.
- Accent color: Electric Blue (#7DF9FF) to highlight interactive elements.
- Font pairing: 'Space Grotesk' (sans-serif) for headers and 'Inter' (sans-serif) for body text.
- Use clear, minimalist icons representing electronic components.
- Employ a responsive, grid-based layout to ensure mobile compatibility.
- Subtle animations to show component values.
- Dark Gray (#333333) for the primary UI background.
- Light Gray (#AAAAAA) for secondary backgrounds and containers.
- White (#FFFFFF) for text and primary interactive elements.
- Use a monospaced font like 'Courier New' for component codes and values, providing consistent spacing.
- Use simple 'X' and checkmark icons for the inventory status, clearly indicating if components are in the box or have been taken.
- Employ a card-based layout for component rows to improve readability and separation.
- Ensure rows are easily scrollable and identifiable within the component listing.
- Provide a subtle highlight animation on rows when components are marked as taken.