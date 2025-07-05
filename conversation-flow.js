// config/conversation-flow.js
// Converted from your current decision-tree.js and step-engine.js

// Timing configuration
const CONVERSATION_TIMING = {
  statementDelay: 1000, // Milliseconds between statement and question (or vice versa)
  continueButtonDelay: 500 // Delay before showing continue button on info-only steps
};

// Make it available globally
window.CONVERSATION_TIMING = CONVERSATION_TIMING;

const CONVERSATION_FLOW = {
  
  // ==================== INITIAL QUESTIONS ====================
  initial: {
    question: "Which room would you like to work on?",
    statement: "Hi, this app will walk you through getting an estimate for an interior design project.",
    statementTiming: "before",
    inputType: "choice",
    options: ["Kitchen", "Living Room", "Bedroom", "Bathroom"],
    lineItems: [], // Just sets room context
    next: "square_footage"
  },

  square_footage: {
    question: "What's the approximate square footage?",
    inputType: "number",
    validation: { min: 50, max: 2000, digitsOnly: true },
    lineItems: [], // Used for calculations
    next: "project_type"
  },

  project_type: {
    question: "What type of project is this?",
    inputType: "choice",
    options: ["Update (cosmetic changes)", "Partial Renovation", "Full Renovation"],
    lineItems: [
      {
        condition: "Full Renovation",
        items: [
          { name: "Demolition", calculation: "flat", category: "labor" },
          { name: "Dumpster", calculation: "flat", category: "materials" }
        ]
      },
      {
        condition: "Partial Renovation",
        items: [
          { name: "Demolition", calculation: "flat", category: "labor" },
          { name: "Dumpster", calculation: "flat", category: "materials" }
        ]
      }
    ],
    next: "roomSpecific" // Special keyword to branch by room
  },

  // ==================== KITCHEN FLOW ====================
  kitchen_flooring: {
    question: "What type of flooring do you want?",
    inputType: "choice",
    options: ["Laminate", "Vinyl", "Hardwood", "Tile", "Natural Stone"],
    lineItems: [
      { name: "Flooring Materials", calculation: "perSqFt", category: "materials" },
      { name: "Flooring Installation", calculation: "perSqFt", category: "labor" }
    ],
    next: "kitchen_cabinets"
  },

  kitchen_cabinets: {
    question: "What type of cabinets do you want?",
    inputType: "choice",
    options: ["Stock cabinets", "Semi-custom cabinets", "Full custom cabinets", "Cabinet refacing"],
    lineItems: [
      { name: "Cabinets", calculation: "flat", category: "materials" }
    ],
    next: "kitchen_cabinet_fixtures"
  },

  // Example configuration for multi-select
/*kitchen_features: {
  question: "Select all features you'd like to include:",
  inputType: "multiSelect", // New input type
  options: ["Kitchen island", "Pantry upgrade", "Wine storage", "Built-in appliances"],
  lineItems: [
    {
      condition: "selected", // Special condition for multi-select
      items: [
        { name: "Additional Features", calculation: "flat", category: "materials" }
      ]
    }
  ],
  next: "complete"
},*/

// Example for multi-select gallery
kitchen_cabinet_fixtures: {
  question: "Select all fixtures you need:",
  inputType: "multiSelectGallery", // New input type
  options: [
    { 
      name: "Vanity", 
      image: "https://images.unsplash.com/photo-1...",
      thumbnail: "https://images.unsplash.com/photo-1...",
      description: "Modern bathroom vanity"
    },
    { 
      name: "Mirror", 
      image: "https://images.unsplash.com/photo-2...",
      thumbnail: "https://images.unsplash.com/photo-2...",
      description: "LED-lit mirror"
    }
  ],
  lineItems: [
    {
      condition: "selected",
      items: [
        { name: "Fixtures", calculation: "flat", category: "materials" }
      ]
    }
  ],
  next: "kitchen_cabinet_hardware"
},

  kitchen_cabinet_hardware: {
    question: "Please select a type of cabinet hardware to use:",
    statement: "Cabinet hardware gets daily use and keeps your cabinets looking pristine",
    statementTiming: "before",
    inputType: "choice",
    options: ["High quality", "Luxury: Buster & Punch"],
    lineItems: [
      { name: "Cabinet Hardware", calculation: "flat", category: "materials" }
    ],
    next: "kitchen_countertops"
  },

  kitchen_countertops: {
    question: "Choose your countertop material:",
    inputType: "gallery", // Image selection
    options: [
      { 
        name: "Laminate", 
        image: "https://images.unsplash.com/photo-1556912173-46c336c7fd55?w=400&h=300&fit=crop",
        thumbnail: "https://images.unsplash.com/photo-1556912173-46c336c7fd55?w=200&h=150&fit=crop",
        description: "Affordable laminate countertops"
      },
      { 
        name: "Quartz", 
        image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=400&h=300&fit=crop",
        thumbnail: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=200&h=150&fit=crop",
        description: "Durable engineered quartz"
      },
      { 
        name: "Granite", 
        image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop",
        thumbnail: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=200&h=150&fit=crop",
        description: "Natural granite stone"
      },
      { 
        name: "Butcher Block", 
        image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop&sat=-100",
        thumbnail: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=200&h=150&fit=crop&sat=-100",
        description: "Warm wood countertops"
      }
    ],
    lineItems: [
      { name: "Countertops", calculation: "flat", category: "materials" },
      { name: "Countertop Installation", calculation: "flat", category: "labor", autoInclude: true }
    ],
    next: "kitchen_appliances"
  },

  kitchen_appliances: {
    question: "Let's choose your appliance package:",
    statement: "Interesting fact: on average, appliances make up 30% of the cost of a full kitchen remodel",
    statementTiming: "before",
    inputType: "choice",
    options: ["Premium: LG and GE", "Luxury: Thermador and Subzero", "No appliances"],
    lineItems: [
      {
        condition: "not No appliances",
        items: [{ name: "Appliances", calculation: "flat", category: "materials" }]
      }
    ],
    next: "kitchen_cabinet_organizers"
  },


  kitchen_cabinet_organizers: {
    question: "Cabinets can be improved with organizers, please select all that are interesting:",
    inputType: "multiSelectGallery", // Multi Select Image selection
    options: [
      { 
        name: "Trash can pull-out", 
        image: "https://images.unsplash.com/photo-1556912173-46c336c7fd55?w=400&h=300&fit=crop",
        thumbnail: "https://images.unsplash.com/photo-1556912173-46c336c7fd55?w=200&h=150&fit=crop",
        description: "Affordable laminate countertops"
      },
      { 
        name: "Cutting board pull-out", 
        image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=400&h=300&fit=crop",
        thumbnail: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=200&h=150&fit=crop",
        description: "Durable engineered quartz"
      },
      { 
        name: "Spice rack pull-out", 
        image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop",
        thumbnail: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=200&h=150&fit=crop",
        description: "Natural granite stone"
      },
      { 
        name: "Tray roll-out", 
        image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop&sat=-100",
        thumbnail: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=200&h=150&fit=crop&sat=-100",
        description: "Warm wood countertops"
      },
      { 
        name: "Mixer lifts", 
        image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop&sat=-100",
        thumbnail: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=200&h=150&fit=crop&sat=-100",
        description: "Warm wood countertops"
      },
      { 
        name: "Lazy Susan", 
        image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop&sat=-100",
        thumbnail: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=200&h=150&fit=crop&sat=-100",
        description: "Warm wood countertops"
      }
    ],
    lineItems: [
      {
      condition: "selected", // Special condition for multiselect
        items: [
          { name: "Trash can pull-out", calculation: "flat", category: "materials" },
          { name: "Cutting board pull-out", calculation: "flat", category: "materials" },
          { name: "Spice rack pull-out", calculation: "flat", category: "materials" },
          { name: "Tray roll-out", calculation: "flat", category: "materials" },
          { name: "Mixer lifts", calculation: "flat", category: "materials" },
          { name: "Lazy Susan", calculation: "flat", category: "materials" }    
        ]
      }
    ],
    next: "kitchen_features"
  },

    // Example configuration for multi-select
/*kitchen_features: {
  question: "Select all features you'd like to include:",
  inputType: "multiSelect", // New input type
  options: ["Kitchen island", "Pantry upgrade", "Wine storage", "Built-in appliances"],
  lineItems: [
    {
      condition: "selected", // Special condition for multi-select
      items: [
        { name: "Additional Features", calculation: "flat", category: "materials" }
      ]
    }
  ],
  next: "complete"
},*/

  kitchen_features: {
    question: "Any additional features?",
    inputType: "choice",
    options: ["Standard kitchen", "Kitchen island", "Pantry upgrade", "Wine storage"],
    lineItems: [
      {
        condition: "not Standard kitchen",
        items: [{ name: "Additional Features", calculation: "flat", category: "materials" }]
      }
    ],
    next: "complete"
  },

  // ==================== BATHROOM FLOW ====================
  bathroom_flooring: {
    question: "What type of flooring do you want?",
    inputType: "choice",
    options: ["Tile", "Vinyl", "Natural Stone", "Heated floors"],
    lineItems: [
      { name: "Flooring Materials", calculation: "perSqFt", category: "materials" },
      { name: "Flooring Installation", calculation: "perSqFt", category: "labor" }
    ],
    next: "bathroom_fixtures"
  },

  bathroom_fixtures: {
    question: "Choose your fixture package:",
    inputType: "choice",
    options: ["Basic", "Standard", "Premium", "Luxury"],
    lineItems: [
      { name: "Fixtures", calculation: "flat", category: "materials" }
    ],
    next: "bathroom_vanity"
  },

  bathroom_vanity: {
    question: "What type of vanity?",
    inputType: "choice",
    options: ["Stock vanity", "Custom vanity", "Double vanity", "Floating vanity"],
    lineItems: [
      { name: "Vanity", calculation: "flat", category: "materials" }
    ],
    next: "complete"
  },

  // ==================== LIVING ROOM FLOW ====================
  living_room_flooring: {
    question: "What type of flooring do you want?",
    inputType: "choice",
    options: ["Carpet", "Hardwood", "Laminate", "Tile"],
    lineItems: [
      { name: "Flooring Materials", calculation: "perSqFt", category: "materials" },
      { name: "Flooring Installation", calculation: "perSqFt", category: "labor" }
    ],
    next: "living_room_features"
  },

  living_room_features: {
    question: "Any additional features?",
    inputType: "choice",
    options: ["Standard living room", "Built-in shelving", "Fireplace upgrade", "Entertainment center"],
    lineItems: [
      {
        condition: "not Standard living room",
        items: [{ name: "Additional Features", calculation: "flat", category: "materials" }]
      }
    ],
    next: "complete"
  },

  // ==================== BEDROOM FLOW ====================
  bedroom_flooring: {
    question: "What type of flooring do you want?",
    inputType: "choice",
    options: ["Carpet", "Hardwood", "Laminate", "Vinyl"],
    lineItems: [
      { name: "Flooring Materials", calculation: "perSqFt", category: "materials" },
      { name: "Flooring Installation", calculation: "perSqFt", category: "labor" }
    ],
    next: "bedroom_features"
  },

  bedroom_features: {
    question: "Any additional features?",
    inputType: "choice",
    options: ["Standard bedroom", "Walk-in closet", "Built-in wardrobes", "Reading nook"],
    lineItems: [
      {
        condition: "not Standard bedroom",
        items: [{ name: "Additional Features", calculation: "flat", category: "materials" }]
      }
    ],
    next: "complete"
  }
};

// ==================== ALWAYS INCLUDED ITEMS ====================
const ALWAYS_INCLUDED = [
  { 
    name: "Design Consultation", 
    price: 0, // Changed from 500 to make it free
    category: "design", 
    description: "Complimentary design consultation" 
  }
];

// ==================== ROOM ROUTING ====================
const ROOM_FLOWS = {
  "Kitchen": "kitchen_flooring",
  "Living Room": "living_room_flooring", 
  "Bedroom": "bedroom_flooring",
  "Bathroom": "bathroom_flooring"
};

// ==================== SIMPLIFIED ENGINE HELPER ====================
class ConversationFlowHelper {
  
  static getCurrentStepConfig(stepName) {
    return CONVERSATION_FLOW[stepName];
  }
  
  static getNextStep(currentStepName, userInput, sessionData) {
    const currentStep = CONVERSATION_FLOW[currentStepName];
    
    if (currentStep.next === 'roomSpecific') {
      // Branch to room-specific flow
      const room = sessionData.room || sessionData.initial;
      return ROOM_FLOWS[room];
    }
    
    return currentStep.next;
  }
  
  static getLineItemsForStep(stepName, userInput) {

    console.log('🚀 NEW CODE IS RUNNING!');

    console.log('=== getLineItemsForStep DEBUG ===');
    console.log('stepName:', stepName);
    console.log('userInput:', userInput);
    console.log('userInput type:', typeof userInput);
    console.log('userInput is array:', Array.isArray(userInput));

    const stepConfig = CONVERSATION_FLOW[stepName];
    const lineItems = [];

    stepConfig.lineItems?.forEach(lineItemDef => {
      console.log('🔍 Processing lineItemDef:', lineItemDef);
      console.log('🔍 lineItemDef.condition:', lineItemDef.condition);
      if (this.shouldAddLineItem(lineItemDef, userInput)) {
        console.log('🔍 shouldAddLineItem returned TRUE');




        if (lineItemDef.items) {
          console.log('🔍 Has items array, length:', lineItemDef.items.length);
          if(Array.isArray(userInput)) {
            console.log('🔍 Taking multi-select path');
            console.log('🔍 userInput array:', userInput);
            // Multi select: only create line items for selected items
            userInput.forEach(selectedItem => {
              console.log('🔍 Looking for selectedItem:', selectedItem);
              const matchingItem = lineItemDef.items.find(item => item.name === selectedItem);
              console.log('🔍 matchingItem found:', matchingItem);
              if (matchingItem) {
                console.log('🔍 Adding line item for:', selectedItem);
                lineItems.push({
                  name: matchingItem.name, //just the item name
                  calculation: matchingItem.calculation,
                  category: matchingItem.category,
                  userChoice: selectedItem, // individual selection
                  stepName: stepName
                });
              }
          });
        } else {
           console.log('🔍 shouldAddLineItem returned FALSE');
           console.log('🔍 Checking why: condition =', lineItemDef.condition, 'userInput =', userInput);
          // single select: original logic
          lineItemDef.items.forEach(item => {
                lineItems.push({
                  name: `${item.name}: ${userInput}`,
                  calculation: item.calculation,
                  category: item.category,
                  userChoice: userInput,
                  stepName: stepName,
                });
              });
            }
          } else {
            // single item (no items array)
            lineItems.push({
                name: `${lineItemDef.name}: ${userInput}`,
                calculation: lineItemDef.calculation,
                category: lineItemDef.category,
                userChoice: userInput,
                stepName: stepName,
                autoInclude: lineItemDef.autoInclude || false
            });
          }    
        }
      });
    
    return lineItems;
  }   
   /* stepConfig.lineItems?.forEach(lineItemDef => {
      if (this.shouldAddLineItem(lineItemDef, userInput)) {
        if (lineItemDef.items) {
          // Multiple items with conditions
          lineItemDef.items.forEach(item => {
            lineItems.push({
              name: `${item.name}: ${userInput}`,
              calculation: item.calculation,
              category: item.category,
              userChoice: userInput,
              stepName: stepName
            });
          });
        } else {
          // Single item
          lineItems.push({
            name: `${lineItemDef.name}: ${userInput}`,
            calculation: lineItemDef.calculation,
            category: lineItemDef.category,
            userChoice: userInput,
            stepName: stepName,
            autoInclude: lineItemDef.autoInclude || false
          });
        }
      }
    });
    
    return lineItems;
  }*/
  
  static shouldAddLineItem(lineItemDef, userInput) {
    console.log('🔍 shouldAddLineItem called');
  console.log('🔍 lineItemDef.condition:', lineItemDef.condition);
  console.log('🔍 userInput:', userInput);
  console.log('🔍 Array.isArray(userInput):', Array.isArray(userInput));

    //if (!lineItemDef.condition) return true;

     if (!lineItemDef.condition) {
        console.log('🔍 No condition, returning true');
        return true;
      }

    // Multi-select logic
    if(lineItemDef.condition === 'selected') {
      console.log('🔍 Condition is "selected"');
      if(Array.isArray(userInput)) {
        console.log('🔍 userInput is array, length:', userInput.length);
        return userInput.length > 0; // any items selected
      }
      return userInput && userInput !== ""; // Single item selected
    }

    
    // Simple condition checking
    if (lineItemDef.condition === userInput) return true;
    if (lineItemDef.condition === `not ${userInput}`) return false;
    if (lineItemDef.condition.startsWith('not ') && 
        !userInput.includes(lineItemDef.condition.substring(4))) return true;
    
    return false;
  }
}

// Make available globally
window.CONVERSATION_FLOW = CONVERSATION_FLOW;
window.ConversationFlowHelper = ConversationFlowHelper;
window.ALWAYS_INCLUDED = ALWAYS_INCLUDED;
window.ROOM_FLOWS = ROOM_FLOWS;

// ==================== USAGE EXAMPLE ====================
/*
// Get current step config:
const stepConfig = ConversationFlowHelper.getCurrentStepConfig('kitchen_cabinets');
console.log(stepConfig.question); // "What type of cabinets do you want?"

// Get next step:
const nextStep = ConversationFlowHelper.getNextStep('project_type', 'Full Renovation', { room: 'Kitchen' });
console.log(nextStep); // "kitchen_flooring"

// Get line items for a selection:
const lineItems = ConversationFlowHelper.getLineItemsForStep('kitchen_cabinets', 'Full custom cabinets');
console.log(lineItems); 
// [{ name: "Cabinets: Full custom cabinets", calculation: "flat", category: "materials", ... }]
*/

// ==================== USAGE EXAMPLES ====================

// Get current step configuration:
// const stepConfig = CONVERSATION_FLOW['kitchen_cabinets'];
// console.log(stepConfig.question); // "What type of cabinets do you want?"

// Get line items for a selection:
// const lineItems = stepConfig.lineItems; // Array of items to add to pricing

// Get next step:
// const nextStep = stepConfig.next; // "kitchen_countertops"

// Check if input should be validated:
// const needsValidation = stepConfig.validation; // { min: 50, max: 2000, digitsOnly: true }

// ==================== HOW TO MAKE CHANGES ====================

/* 
EASY CHANGES (just edit this file):

1. Change a question:
   kitchen_cabinets.question = "What cabinet style do you prefer?";

2. Add/remove options:
   kitchen_cabinets.options.push("European style cabinets");

3. Change step order:
   kitchen_cabinets.next = "kitchen_appliances"; // Skip countertops

4. Make design consultation cost money:
   ALWAYS_INCLUDED[0].price = 500;

5. Add new step:
   kitchen_backsplash: {
     question: "Choose your backsplash:",
     inputType: "choice",
     options: ["Subway tile", "Natural stone", "Glass tile"],
     lineItems: [
       { name: "Backsplash", calculation: "perSqFt", category: "materials" }
     ],
     next: "kitchen_appliances"
   }

MEDIUM CHANGES (edit this file + simple code changes):

1. Add new input type (like multi-select)
2. Add conditional line items based on multiple factors
3. Add new room type (copy existing room structure)

COMPLEX CHANGES (requires more code):

1. Change calculation logic (edit pricing engine)
2. Add complex validation rules
3. Add dynamic pricing based on location
*/

