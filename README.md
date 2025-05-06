# Sold by Woot Cost Calculator

A Vue.js-based calculator for analyzing costs and profits across different Sold by Woot sales models (Sold by Woot, Amazon deal, and Sold by Woot 3PL).

## Features

- Calculate costs and profits for different Woot sales models
- Interactive UI with real-time calculations
- Compare financial outcomes across different sales strategies
- Mobile-responsive design that works on all devices

## How to Use

1. Select a sales model (Sold by Woot, Amazon deal, or Sold by Woot 3PL)
2. Enter the Amazon retail price (MSRP)
3. Enter the Amazon lowest price in the last 30 days
4. Enter the SBW retail price (Deal Price)
5. Enter the shipping cost
6. Enter the deal submission cost
7. Enter the estimated sales quantity
8. Click "Calculate Costs and Profits"

The calculator will display comprehensive results including:
- Woot margin calculations
- Amazon platform fees
- Net income for sellers
- Return estimates
- Total revenue projections
- Estimated rank improvement

## Technology Stack

- Vue.js 3
- Vite 4.5.0 (for build and development)

## Getting Started

### Prerequisites

- Node.js (v16.13.2 or higher recommended)
- npm (v8.1.2 or higher)

### Installation

1. Clone the repository
   ```
   git clone <repository-url>
   cd woot-calculator-vue-ghpages
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

1. Build the project
   ```
   npm run build
   ```

2. Push the `dist` directory to the `gh-pages` branch or follow GitHub Pages deployment instructions.

### Quick GitHub Pages Deployment

You can use this command for a streamlined GitHub Pages deployment:

```
npm run build && gh-pages -d dist
```
(Requires the gh-pages package to be installed)

## Calculations

The calculator uses specific formulas for each sales model:

- **Sold by Woot**: Calculates Woot margin (15%), platform fees, and net income based on standard Woot model
- **Amazon Deal**: Uses Amazon's fee structure with different margin calculations
- **Sold by Woot 3PL**: Accounts for third-party logistics costs in the calculation model

## License

ISC

---

Created for Sold by Woot cost calculation needs. 