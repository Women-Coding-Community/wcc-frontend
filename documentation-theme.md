# Theme Configuration (`theme.ts`)

This file defines the custom Material-UI (MUI) theme for the project, providing a centralized way to manage design tokens, responsive breakpoints, custom containers, and component overrides. It ensures a consistent look and feel across the application and enables easy customization.

---

## 1. TypeScript Theme Extension

The file extends MUI's default `Theme` and `ThemeOptions` interfaces to include:

- **customBannerHeights**: Standardized banner heights for mobile, tablet, and desktop.
- **custom**: Custom container styles (`containerBox` and `innerBox`) for layout consistency.

This extension allows TypeScript to recognize and provide autocompletion for these custom properties throughout the app.

---

## 2. Breakpoints

```typescript
breakpoints: {
  values: {
    xs: 0,
    sm: 600,
    md: 900,
    lg: 1200,
    xl: 1536,
  },
},
```

Defines the responsive breakpoints for mobile, tablet, and desktop layouts.

---

## 3. Custom Banner Heights

```typescript
customBannerHeights: {
  mobile: '100vw',
  tablet: '80vw',
  desktop: '617.14px',
},
```

Provides standard heights for banners, ensuring visual consistency across devices.

---

## 4. Typography

Customizes typography variants for headings, body text, and buttons:

- **h1–h5**: Sets font sizes, weights, and line heights for headings.
- **body1, body2**: Responsive font sizes and line heights for body text.
- **button**: Disables uppercase transformation and sets a custom color.
- **fontWeightBold/Medium**: Defines reusable font weights.

---

## 5. Palette

Defines the primary and secondary color palette:

```typescript
palette: {
  primary: {
    main: '#226488',
    dark: '#1b1919',
    light: '#F6FAFE',
  },
  secondary: {
    main: '#dc004e',
  },
},
```

These colors are used throughout the app for branding and UI consistency.

---

## 6. Component Overrides

- **MuiIcon**: Sets the default icon font to `material-symbols-outlined`.
- **MuiButton**: Disables uppercase transformation for all buttons.
- **MuiTypography**: Sets the default text color to `theme.palette.primary.dark` for all typography components.

---

## 7. Custom Containers

Adds two reusable layout containers to the theme:

- **containerBox**:

  - Full width, flex column, centered alignment, and consistent padding.
  - Use for outer sections or backgrounds.

- **innerBox**:
  - Centers content with a max width (`1127px`), flex column, and horizontal centering.
  - Use for constraining content inside sections.

These can be accessed via `theme.custom.containerBox` and `theme.custom.innerBox` in your components' `sx` props.

---

## 8. Usage Example

```tsx
import { Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const theme = useTheme();

<Box sx={theme.custom.containerBox}>
  <Box sx={theme.custom.innerBox}>{/* Your content here */}</Box>
</Box>;
```

---

## 9. Export

The theme is exported as the default export for use with MUI's `<ThemeProvider>` throughout your app.

---

**Summary:**
This theme setup ensures a consistent, responsive, and branded UI across your application, with reusable layout patterns and centralized design tokens.
