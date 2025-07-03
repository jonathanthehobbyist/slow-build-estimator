// Pricing configuration - all costs in USD
const PRICING = {
  // Flooring pricing per square foot
  "Flooring Materials": {
    "Laminate": { perSqFt: 3 },
    "Vinyl": { perSqFt: 4 },
    "Hardwood": { perSqFt: 8 },
    "Tile": { perSqFt: 6 },
    "Natural Stone": { perSqFt: 12 },
    "Carpet": { perSqFt: 2 }
  },
  
  // Labor pricing per square foot
  "Flooring Installation": {
    "Laminate": { perSqFt: 2 },
    "Vinyl": { perSqFt: 2 },
    "Hardwood": { perSqFt: 4 },
    "Tile": { perSqFt: 3 },
    "Natural Stone": { perSqFt: 5 },
    "Carpet": { perSqFt: 1 }
  },
  
  // Kitchen items - flat pricing
  "Cabinets": {
    "Stock cabinets": { flat: 3000 },
    "Semi-custom cabinets": { flat: 6000 },
    "Full custom cabinets": { flat: 12000 },
    "Cabinet refacing": { flat: 1500 }
  },
  
  "Countertops": {
    "Laminate": { perSqFt: 15 },
    "Quartz": { perSqFt: 60 },
    "Granite": { perSqFt: 45 },
    "Butcher Block": { perSqFt: 25 }
  },
  
  "Countertop Installation": {
    "default": { perSqFt: 10 } // Auto-included installation
  },
  
  "Appliances": {
    "Basic package": { flat: 2500 },
    "Mid-range package": { flat: 5000 },
    "High-end package": { flat: 8000 },
    "Premium package": { flat: 15000 }
  },
  
  "Demolition": {
    "Full Renovation": { flat: 2500 },
    "Partial Renovation": { flat: 2500 },
    "default": { flat: 2500 } //Fallback
  },
  "Dumpster": {
    "Full Renovation": { flat: 1000},
    "Partial Renovation": { flat: 500}
  },

};

// Make available globally
window.PRICING = PRICING;