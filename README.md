# Sold by Woot Cost Calculator

A Vue.js-based calculator for analyzing costs and profits across different Sold by Woot sales models (Sold by Woot, Amazon deal, and Sold by Woot 3PL).

## Features

- Calculate costs and profits for different Woot sales models simultaneously
- Interactive UI with real-time calculations
- Compare financial outcomes across all three sales strategies side-by-side
- View calculation history with filtering by model type
- Export data to PDF and Excel formats
- Email functionality to share calculations
- Multilingual support (English and Chinese)
- Mobile-responsive design that works on all devices
- Clear visualization of profit metrics

## How to Use

1. Enter the ASIN (optional)
2. Enter the Amazon retail price (MSRP) *
3. Enter the Amazon lowest price in the last 30 days *
4. Enter the SBW retail price (Deal Price) *
5. Enter the shipping cost (FBA) *
6. Click "Calculate Costs and Profits"

Fields marked with * are required.

The calculator will automatically display comprehensive results for all three sales models side-by-side:
- Sold by Woot!
- Amazon Deal
- Sold by Woot! 3PL

## Technology Stack

- Vue.js 3.3.4
- Vue I18n for internationalization
- jsPDF for PDF export
- SheetJS for Excel export
- Vite 4.5.0 (for build and development)
- Single-file components architecture

## Getting Started

### Prerequisites

- Node.js (v16.13.2 or higher recommended)
- npm (v8.1.2 or higher)

### Installation

1. Clone the repository
   ```
   git clone https://github.com/yourusername/Sold-by-woot-margin.git
   cd Sold-by-woot-margin
   ```

2. Install dependencies
   ```
   npm install
   ```

### Running the Application

For development:
```
npm run dev
```

The application will be available at http://127.0.0.1:5173/

### Building for Production

```
npm run build
```

The built files will be in the `dist` directory. These can be served using any static file server.

### Preview Production Build

```
npm run preview
```

## Deployment

This application is configured for GitHub Pages deployment with the `base: './'` setting in the Vite configuration file.

To deploy to GitHub Pages:

```
npm run deploy
```

This will build the project and deploy it to the docs folder, which GitHub Pages will serve.

## Project Structure

```
sold-by-woot-margin/
├── docs/                 # GitHub Pages deployment directory for hosting
├── src/                  # Source code
│   ├── assets/           # Styles
│   │   └── main.css      # Main CSS file
│   ├── components/       # Vue components
│   │   └── Calculator.vue # Main calculator component
│   │   └── LanguageSelector.vue # Language selection component
│   ├── i18n/             # Internationalization setup
│   │   └── index.js      # i18n configuration
│   ├── locales/          # Translation files
│   │   └── en.js         # English translations
│   │   └── zh-CN.js      # Chinese translations
│   ├── App.vue           # Root component
│   └── main.js           # Application entry point
├── public/               # Static assets that are copied to dist as-is
├── index.html            # HTML template
├── package.json          # Project dependencies and scripts
├── vite.config.js        # Vite configuration
└── .nojekyll             # File to disable Jekyll processing on GitHub Pages
```

## Features Explained

### Calculation Models

The calculator provides three different cost calculation models:
1. **Woot!** - Standard Sold by Woot model
2. **Amazon Deal** - Amazon promotional deal model
3. **Woot! 3PL** - Sold by Woot with 3rd party logistics

### Export Options

- **PDF Export**: Generate a professional PDF report of your calculation history
- **Excel Export**: Export detailed calculation data in Excel format for further analysis
- **Email**: Send calculation results via email with PDF and Excel files attached

### Language Support

The calculator supports multiple languages:
- English
- Chinese (Simplified)

## License

ISC

---

Created for Sold by Woot cost calculation needs. Developed with Vue.js and Vite. 