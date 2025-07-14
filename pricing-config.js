// Pricing configuration - all costs in USD
const PRICING = {
  // Flooring pricing per square foot
  "Flooring Materials": {
    "Laminate": { perSqFt: 3 },
    "Vinyl": { perSqFt: 4 },
    "Hardwood": { perSqFt: 8 },
    "Tile": { perSqFt: 6 },
    "Natural Stone": { perSqFt: 12 },
    "Carpet": { perSqFt: 2 },
    "N/A": { perSqFt: 0 }
  },
  
  // Labor pricing per square foot
  "Flooring Installation": {
    "Laminate": { perSqFt: 10 },
    "Vinyl": { perSqFt: 5 },
    "Hardwood": { perSqFt: 20 },
    "Tile": { perSqFt: 20 },
    "Natural Stone": { perSqFt: 20 },
    "Carpet": { perSqFt: 10 },
    "N/A": { perSqFt: 0 }
  },
  // Kitchen items - flat pricing
  "Cabinets": {
    "Refaced cabinets": { flat: 30000 },
    "Stock cabinets": { flat: 25000 },
    "Full custom cabinets": { flat: 50000 }
  },
  "Cabinet Hardware": {
    "Full custom cabinets": { flat: 1500 },
    "Refaced cabinets": { flat: 1500 }, 
    "Stock cabinets": { flat: 1500 }
  },
  // Cabinent Organizers has a special function in index.html > calculateLineItemPrice()
  "Cabinet Organizers": {
    "Trash can pull-out": { flat: 500 },
    "Cutting board pull-out": { flat: 500 },
    "Spice rack pull-out": { flat: 500 },
    "Tray roll-out": { flat: 500 },
    "Mixer lifts": { flat: 500 },
    "Lazy Susan": { flat: 1000 }
  },
  // Kitchen Cabinet Accessories has a special function in index.html > calculateLineItemPrice()
   "Kitchen Cabinet Accessories": {
    "Pot filler": { flat: 1500 },
    "Pot filler - Plumbing Labor": { flat: 2000 },
    "Vent hood": { flat: 1500 },
    "Sharp Microwave Drawer": { flat: 1500 },
    "Sous vide": { flat: 5000 }
  },
  
  "Countertops": {
    "Laminate": { flat: 10000 },
    "Quartz": { flat: 15000 },
    "Granite": { flat: 15000 },
    "Butcher Block": { flat: 15000 }
  },
  "Electrical": {
    "Kitchen": { flat: 5000 },
    "Bathroom": { flat: 1000 },
    "Bathroom": { flat: 3000 },
    "Living Room": {flat: 5000 }
  },
  "Lighting": {
    "Kitchen": { flat: 3000 }
  },
  
  "Countertop Installation": {
    "default": { flat: 2000 } // Auto-included installation
  },
  
  "Appliances": {
    "LG and GE": { flat: 15000 },
    "Thermador and Subzero": { flat: 39000 }
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

  "Fixtures": {
  "Basic": { flat: 2000 },
  "Standard": { flat: 4000 },
  "Premium": { flat: 8000 },
  "Luxury": { flat: 15000 }
},

"Vanity": {
  "Stock vanity": { flat: 1500 },
  "Custom vanity": { flat: 4000 },
  "Double vanity": { flat: 6000 },
  "Floating vanity": { flat: 2500 }
},

"Additional Features": {
  "Kitchen island": { flat: 8000 },
  "Pantry upgrade": { flat: 3000 },
  "Wine storage": { flat: 2500 },
  "Built-in shelving": { flat: 2000 },
  "Fireplace upgrade": { flat: 5000 },
  "Entertainment center": { flat: 3000 },
  "Walk-in closet": { flat: 4000 },
  "Built-in wardrobes": { flat: 3500 },
  "Reading nook": { flat: 1500 }
},

};

// Make available globally
window.PRICING = PRICING;