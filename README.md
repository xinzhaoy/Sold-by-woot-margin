# Sold by Woot Cost Calculator

A Vue.js-based calculator for analyzing costs and profits across different Sold by Woot sales models (Sold by Woot, Amazon deal, and Sold by Woot 3PL).

## Features

- Calculate costs and profits for different Woot sales models
- Interactive UI with real-time calculations
- Compare financial outcomes across different sales strategies
- Mobile-responsive design that works on all devices
- Clear visualization of profit metrics and rank improvements

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

## Sales Models Explained

The calculator provides analysis for three distinct sales models:

- **Sold by Woot**: The standard model where Woot sells your products directly
- **Amazon Deal**: Listing your products through Amazon's deal platform
- **Sold by Woot 3PL**: Using Woot as a third-party logistics provider

Each model uses different formulas to calculate margins, fees, and profits.

## Technology Stack

- Vue.js 3.3.4
- Vite 4.5.0 (for build and development)
- Single-file components architecture

## Getting Started

### Prerequisites

- Node.js (v16.13.2 or higher recommended)
- npm (v8.1.2 or higher)

### Installation

1. Clone the repository
   ```
   git clone https://github.com/xinzhaoy/Sold-by-woot-margin.git
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
(Requires the gh-pages package to be installed: `npm install -D gh-pages`)

## Calculation Formulas

The calculator uses specific formulas for each sales model:

- **Sold by Woot**:
  - Woot margin: 15% of Deal Price
  - Woot Cost: Deal Price - Shipping Cost - Woot margin
  - Net Income: Deal submission cost - Amazon platform fee

- **Amazon Deal**:
  - Uses Amazon's fee structure with different margin calculations
  - Platform fees calculated based on Amazon's rates

- **Sold by Woot 3PL**:
  - Accounts for third-party logistics costs
  - Includes both 3PL costs and Woot shipping account fees

## Project Structure

```
sold-by-woot-margin/
├── public/                # Static assets
│   ├── assets/            # Images and styles
│   ├── components/        # Vue components
│   │   └── Calculator.vue # Main calculator component
│   ├── App.vue            # Root component
│   └── main.js            # Application entry point
├── index.html             # HTML template
├── package.json           # Project dependencies and scripts
└── vite.config.js         # Vite configuration
```

## License

ISC

---

Created for Sold by Woot cost calculation needs. Developed with Vue.js and Vite. 