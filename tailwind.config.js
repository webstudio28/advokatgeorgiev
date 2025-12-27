/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,njk,md}"],
  safelist: [
    'text-brand-primary',
    'text-brand-secondary',
    'text-brand-accent',
    'bg-brand-primary',
    'bg-brand-secondary',
    'bg-brand-accent',
    'border-brand-primary',
    'border-brand-secondary',
    'border-brand-accent',
    'text-primary-accent',
    'text-primary-sage',
    'text-primary-mint',
    'text-primary-forest',
    'text-primary-cream',
    'text-primary-olive',
    'text-primary-dark-gray',
    'bg-primary-accent',
    'bg-primary-sage',
    'bg-primary-mint',
    'bg-primary-forest',
    'bg-primary-cream',
    'bg-primary-olive',
    'bg-gradient-primary',
    'bg-gradient-hero',
    'border-primary-accent',
    'border-primary-mint',
    'border-primary-sage',
    'border-primary-forest',
    'border-primary-cream',
    'border-primary-olive',
    'text-primary-blue',
    'bg-primary-blue',
    'border-primary-blue',
    'text-secondary-blue',
    'bg-secondary-blue',
    'border-secondary-blue',
    'text-accent-green',
    'bg-accent-green',
    'border-accent-green'
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Merriweather Sans"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        serif: ['"Merriweather"', 'ui-serif', 'Georgia', 'serif'],
        accent: ['"Sansation"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      colors: {
        brand: {
          primary: 'var(--color-brand-primary)',
          secondary: 'var(--color-brand-secondary)',
          accent: 'var(--color-brand-accent)',
        },
        'primary-sand': '#EAE5E1',      // Sand
        'primary-dune': '#CFC5B8',      // Dune
        'primary-evergreen': '#61644F', // Evergreen
        'primary-deepsea': '#3F4D59',   // Deep Sea
        'primary-volcanic': '#262627',  // Volcanic Rock
        'accent-terracotta': '#965939', // Terracotta
        'primary-black': '#0a0a0a',
        'primary-white': '#ffffff',
        'primary-gray': '#f3f4f6',
        'primary-dark-gray': '#1a1a1a',
        'primary-moss': '#5A6351',
        'primary-sage': '#BFC4AF',
        'primary-ceramic': '#F2F2F2',
        'secondary-acorn': '#C0A18F',
        'secondary-brown': '#8A7A70',
        'secondary-clay': '#DED7C8',
        'primary-accent': '#9CAF88',
        'primary-mint': '#B8D4C8',
        'primary-forest': '#7A918D',
        'primary-cream': '#F5F5DC',
        'primary-olive': '#6B7C65',
        'primary-blue': '#25425E',      // Primary Blue
        'secondary-blue': '#4A6B8A',    // Secondary Blue (lighter)
        'accent-green': '#C8E6C9'       // Accent Green
      },
      maxWidth: {
        '90': '90%',
        '95': '95%'
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #61644F 0%, #3F4D59 50%, #965939 100%)',
        'gradient-hero': 'linear-gradient(135deg, #EAE5E1 0%, #CFC5B8 50%, #3F4D59 100%)',
      }
    },
  },
  plugins: [],
} 