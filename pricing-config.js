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
    "Laminate": { perSqFt: 10 },
    "Vinyl": { perSqFt: 5 },
    "Hardwood": { perSqFt: 20 },
    "Tile": { perSqFt: 20 },
    "Natural Stone": { perSqFt: 20 },
    "Carpet": { perSqFt: 10 }
  },
  
  // Kitchen items - flat pricing
  "Cabinets": {
    "Cabinet refacing": { flat: 30000 },
    "Stock cabinets": { flat: 20000 },
    "Semi-custom cabinets": { flat: 25000 },
    "Full custom cabinets": { flat: 50000 }
  },
  "Cabinet Hardware": {
    "High quality": { flat: 1500 },
    "Luxury: Buster & Punch": { flat: 4000 }, 
  },
  "Cabinet Organizers": {
    "Trash can pull-out": { flat: 500 },
    "Cutting board pull-out": { flat: 500 },
    "Spice rack pull-out": { flat: 500 },
    "Tracy roll-out": { flat: 500 },
    "Mixer lifts": { flat: 500 },
    "Lazy Susan": { flat: 1000 }
  },
  
  "Countertops": {
    "Laminate": { flat: 10000 },
    "Quartz": { flat: 15000 },
    "Granite": { flat: 15000 },
    "Butcher Block": { flat: 15000 }
  },
  
  "Countertop Installation": {
    "default": { flat: 2000 } // Auto-included installation
  },
  
  "Appliances": {
    "Premium: LG and GE": { flat: 25000 },
    "Luxury: Thermador and Subzero": { flat: 50000 }
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