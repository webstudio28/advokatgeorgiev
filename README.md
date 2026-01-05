# Адвокат Божидар Георгиев

Website for Адвокат Божидар Георгиев - професионална правна помощ и защита на вашите интереси. Built with 11ty and Tailwind CSS.

## 🚀 Features

- **11ty 2.0+** - Latest static site generator
- **Tailwind CSS 3.4+** - Utility-first CSS framework
- **Responsive Design** - Mobile-first approach
- **Modern Layout** - Clean, professional structure
- **Custom Components** - Pre-built UI components
- **Asset Optimization** - Optimized for performance
- **Development Ready** - Hot reload and build scripts

## 📁 Project Structure

```
base-11ty/
├── .eleventy.js              # 11ty configuration
├── tailwind.config.js        # Tailwind CSS configuration
├── package.json              # Dependencies and scripts
├── .gitignore               # Git ignore rules
├── README.md                # This file
└── src/
    ├── _layouts/
    │   └── base.njk         # Base layout template
    ├── _includes/           # Reusable components
    ├── _data/               # Data files (JSON, JS)
    │   ├── services.json    # Services data
    │   └── projects.json    # Projects/portfolio data
    ├── assets/
    │   ├── css/
    │   │   ├── tailwind.css # Tailwind CSS entry point
    │   │   ├── custom-styles.css # Custom styles
    │   │   └── home.css     # Page-specific styles
    │   ├── js/              # JavaScript files
    │   └── images/          # Image assets
    └── index.njk            # Homepage template
```

## 🛠️ Quick Start

### 1. Clone or Copy

```bash
# Option 1: Clone this repository
git clone <your-repo-url> my-new-project
cd my-new-project

# Option 2: Copy files manually
# Copy all files to your new project directory
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Start Development

```bash
# Start development server with hot reload
npm run dev

# Or run separately:
npm run css:watch  # Watch CSS changes
npm run start      # Start 11ty server
```

### 4. Build for Production

```bash
# Build the site
npm run build

# Build CSS
npm run css:build
```

## 🎨 Customization

### Colors and Theme

Edit `tailwind.config.js` to customize your color scheme:

```javascript
colors: {
  'primary': {
    'black': '#0a0a0a',
    'red': '#dc2626',
    'white': '#ffffff',
    'gray': '#f3f4f6',
    'dark-gray': '#1a1a1a',
    'blue': '#010057',
    'accent': '#FDC57B'  // Your accent color
  }
}
```

### Layout and Navigation

Update `src/_data/site.config.json` to customize:
- Site/brand name + language
- Brand colors (primary/secondary/accent)
- Default SEO title/description + domain (OpenGraph/Twitter/canonical)
- Contact info (phones/email) + map embed URL
- Footer “about” text + logo paths

### Content

- **Homepage**: Edit `src/index.njk`
- **Services**: Update `src/_data/services.json`
- **Projects**: Update `src/_data/projects.json`
- **Images**: Replace placeholder images in `src/assets/images/`

### Styling

- **Global Styles**: Edit `src/assets/css/custom-styles.css`
- **Component Styles**: Edit `src/assets/css/tailwind.css`
- **Page-specific**: Create new CSS files as needed

## 📝 Available Scripts

- `npm run start` - Start 11ty development server
- `npm run build` - Build the site for production
- `npm run css:build` - Build and minify CSS
- `npm run css:watch` - Watch and build CSS changes
- `npm run dev` - Run both CSS watch and 11ty server

## 🎯 Built-in Components

### CSS Classes

- `.section-padding` - Standard section spacing
- `.container-custom` - Responsive container
- `.btn-primary` - Primary button style
- `.btn-secondary` - Secondary button style

### Layout Features

- Responsive navigation with mobile menu
- Hero section with call-to-action
- Stats/features section
- About section with image grid
- Footer with contact information

## 🔧 Configuration

### 11ty Configuration (`.eleventy.js`)

```javascript
module.exports = function(eleventyConfig) {
  // Copy static assets
  eleventyConfig.addPassthroughCopy({ "src/assets": "assets" });
  
  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      layouts: "_layouts"
    },
    templateFormats: ["njk", "md", "html"],
    // Add pathPrefix for GitHub Pages if needed
    // pathPrefix: "/your-repo-name/",
  };
};
```

### GitHub Pages Deployment

1. Uncomment and update the `pathPrefix` in `.eleventy.js`
2. Set up GitHub Actions for automatic deployment
3. Configure your repository settings

## 📱 Responsive Design

The template is built with a mobile-first approach:

- **Mobile**: Single column layout, collapsible navigation
- **Tablet**: Two-column layouts, expanded navigation
- **Desktop**: Full multi-column layouts, complete navigation

## 🚀 Performance Features

- Optimized asset loading
- Minified CSS in production
- Efficient image handling
- Fast build times
- SEO-friendly structure

## 📚 Next Steps

1. **Replace Content**: Update all placeholder text and images
2. **Customize Colors**: Modify the color scheme in `tailwind.config.js`
3. **Add Pages**: Create new `.njk` files for additional pages
4. **Enhance Functionality**: Add JavaScript for interactivity
5. **Optimize Images**: Compress and optimize your images
6. **Add Analytics**: Integrate Google Analytics or other tracking

## 🤝 Contributing

This is a base template - feel free to customize it for your needs. If you have improvements that could benefit others, consider contributing back to the community.

## 📄 License

MIT License - feel free to use this template for any project.

---

**Happy coding! 🎉** 