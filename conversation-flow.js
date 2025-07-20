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
    question: "First, select a room to focus on",
    statement: "Hi! This tool will help you generate a high-level estimate for your remodel.",
    statementTiming: "before",
    inputType: "choice",
    options: ["Kitchen", "Living Room", "Bedroom", "Bathroom"],
    userResponseTemplate: "You selected: <strong>{selection}</strong>", // ← Add this
    lineItems: [], // Just sets room context
    next: "square_footage"
  },

  square_footage: {
    question: function() {
      const room = conversationState.sessionData.initial || 'room';
      return `What's your ${room.toLowerCase()}'s approximate square footage?`;
      },
    statement: "Thanks! Now let's find out more about the space you're looking to update.",
    statementTiming: "before",
    inputType: "number",
    validation: { min: 50, max: 2000, digitsOnly: true },
    userResponseTemplate: "You entered <strong>{selection}</strong> sq ft",
    lineItems: [], // Used for calculations
    next: "project_type"
  },

  project_type: {
    question: "What type of project is this?",
    inputType: "choice",
    statement: "You can now see items such as 'Demolition' under 'Project Estimate' on the right column.",
    statementTiming: "After",
    options: ["Cosmetic change", "Partial Renovation", "Full Renovation"],
    userResponseTemplate: "We'll be doing a <strong>{selection}</strong>.",
    lineItems: [
      {
        condition: "Full Renovation",
        items: [
          { name: "Demolition", showPrice: true, calculation: "flat", category: "labor" },
          { name: "Dumpster", showPrice: true, calculation: "flat", category: "materials" }
        ]
      },
      {
        condition: "Partial Renovation",
        items: [
          { name: "Demolition", showPrice: true, calculation: "flat", category: "labor" },
          { name: "Dumpster", showPrice: true, calculation: "flat", category: "materials" }
        ]
      }
    ],
    next: "roomSpecific" // Special keyword to branch by room
  },

  // ==================== KITCHEN FLOW ====================
kitchen_flooring: {
    question: "Select a type of flooring for your kitchen remodel",
    inputType: "choice",
    options: ["Laminate", "Vinyl", "Hardwood", "Tile", "Natural Stone", "N/A"],
    statement: "Also, because of the fluctuating price of materials, you'll see a '•••' to denote market prices.",
    statementTiming: "after",
    userResponseTemplate: "You chose <strong>{selection}</strong> to use for your kitchen remodel flooring.",
    lineItems: [
      {
        condition: "N/A",
        items: [
          { name: "Flooring Materials", calculation: "perSqFt", category: "materials", showPrice: true },
          { name: "Flooring Installation", calculation: "perSqFt", category: "labor", showPrice: true }
        ]
      },
      {
        condition: "Laminate",
        items: [
          { name: "Flooring Materials", calculation: "perSqFt", category: "materials" },
          { name: "Flooring Installation", calculation: "perSqFt", category: "labor" }
        ]
      },
      {
        condition: "Vinyl",
        items: [
          { name: "Flooring Materials", calculation: "perSqFt", category: "materials" },
          { name: "Flooring Installation", calculation: "perSqFt", category: "labor" }
        ]
      },
      {
        condition: "Hardwood",
        items: [
          { name: "Flooring Materials", calculation: "perSqFt", category: "materials" },
          { name: "Flooring Installation", calculation: "perSqFt", category: "labor" }
        ]
      },
      {
        condition: "Tile",
        items: [
          { name: "Flooring Materials", calculation: "perSqFt", category: "materials" },
          { name: "Flooring Installation", calculation: "perSqFt", category: "labor" }
        ]
      },
      {
        condition: "Natural Stone",
        items: [
          { name: "Flooring Materials", calculation: "perSqFt", category: "materials" },
          { name: "Flooring Installation", calculation: "perSqFt", category: "labor" }
        ]
      }
    ],
    next: "kitchen_cabinets"
},



  kitchen_cabinets: {
    question: "Fantastic! Next up: cabinets – what level of customization do you want in your kitchen cabinets?",
    inputType: "choice",
    options: ["Stock cabinets", "Refaced cabinets", "Full custom cabinets"],
    userResponseTemplate: "The kitchen remodel will use <strong>{selection}</strong>", // ← Add this
    lineItems: [
      { name: "Cabinets", calculation: "flat", category: "materials" },
      { name: "Cabinet Hardware", calculation: "flat", category: "materials" }
    ],
    next: "kitchen_cabinet_organizers"
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
/*kitchen_cabinet_fixtures: {
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
},*/

  // Kitchen Cabinet Accessories has a special function in index.html > calculateLineItemPrice()

  kitchen_cabinet_organizers: {
    question: "Select any desired cabinet organizers",
    inputType: "multiSelectGallery", // Multi Select Image selection
    userResponseTemplate: "We'll organize your cabinets with the following: <strong>{selection}</strong>", // ← Add this
    options: [
      { 
        name: "Trash can pull-out", 
        image: "https://www.jonsimmons.co/wp-content/uploads/2025/07/Trash-Can-Pull-Out.jpeg",
        thumbnail: "https://www.jonsimmons.co/wp-content/uploads/2025/07/Trash-Can-Pull-Out.jpeg",
        description: "Affordable laminate countertops"
      },
      { 
        name: "Cutting board pull-out", 
        image: "https://www.jonsimmons.co/wp-content/uploads/2025/07/cutting-board-pull-out.jpg",
        thumbnail: "https://www.jonsimmons.co/wp-content/uploads/2025/07/cutting-board-pull-out.jpg",
        description: "Durable engineered quartz"
      },
      { 
        name: "Spice rack pull-out", 
        image: "https://www.jonsimmons.co/wp-content/uploads/2025/07/spice-rack-pull-out.jpg",
        thumbnail: "https://www.jonsimmons.co/wp-content/uploads/2025/07/spice-rack-pull-out.jpg",
        description: "Natural granite stone"
      },
      { 
        name: "Tray roll-out", 
        image: "https://www.jonsimmons.co/wp-content/uploads/2025/07/tray-roll-out.jpg",
        thumbnail: "https://www.jonsimmons.co/wp-content/uploads/2025/07/tray-roll-out.jpg",
        description: "Warm wood countertops"
      },
      { 
        name: "Mixer lifts", 
        image: "https://www.jonsimmons.co/wp-content/uploads/2025/07/mixer-left.jpg",
        thumbnail: "https://www.jonsimmons.co/wp-content/uploads/2025/07/mixer-left.jpg",
        description: "Warm wood countertops"
      },
      { 
        name: "Lazy Susan", 
        image: "https://www.jonsimmons.co/wp-content/uploads/2025/07/lazy-susan.jpg",
        thumbnail: "https://www.jonsimmons.co/wp-content/uploads/2025/07/lazy-susan.jpg",
        description: "Warm wood countertops"
      }
    ],
    lineItems: [
      {
      condition: "selected", // Special condition for multiselect
        items: [
          { name: "Trash can pull-out", showPrice: true, calculation: "flat", category: "materials" },
          { name: "Cutting board pull-out", showPrice: true, calculation: "flat", category: "materials" },
          { name: "Spice rack pull-out", showPrice: true, calculation: "flat", category: "materials" },
          { name: "Tray roll-out", showPrice: true, calculation: "flat", category: "materials" },
          { name: "Mixer lifts", showPrice: true, calculation: "flat", category: "materials" },
          { name: "Lazy Susan", showPrice: true, calculation: "flat", category: "materials" }    
        ]
      }
    ],
    next: "kitchen_cabinet_accessories"
  },

  // Kitchen Cabinet Accessories has a special function in index.html > calculateLineItemPrice()

  kitchen_cabinet_accessories: {
    question: "Select any accessories you would like integrated with your cabinets.",
    inputType: "multiSelectGallery", // Multi Select Image selection
    userResponseTemplate: "You selected the following: <strong>{selection}</strong>", // ← Add this
    options: [
      { 
        name: "Pot filler", 
        image: "https://www.jonsimmons.co/wp-content/uploads/2025/07/matte-black-giving-tree-pot-fillers-xlhddotu0014-64_600.jpg",
        thumbnail: "https://www.jonsimmons.co/wp-content/uploads/2025/07/matte-black-giving-tree-pot-fillers-xlhddotu0014-64_600.jpg",
        description: "Example of a black pot filler"
      },
      { 
        name: "Vent hood", 
        image: "https://www.jonsimmons.co/wp-content/uploads/2025/07/DW-304-18-FPNZ-CH-MWD-1-RA36-KBCRN-36-SA60D-36-Smaller.jpg",
        thumbnail: "https://www.jonsimmons.co/wp-content/uploads/2025/07/DW-304-18-FPNZ-CH-MWD-1-RA36-KBCRN-36-SA60D-36-Smaller.jpg",
        description: "Vent hood cover and vent"
      },
      { 
        name: "Sharp Microwave Drawer", 
        image: "https://www.jonsimmons.co/wp-content/uploads/2025/07/Sharp-microwave-drawer-4389000d88f510eb6a53a516d2c25b74.jpg",
        thumbnail: "https://www.jonsimmons.co/wp-content/uploads/2025/07/Sharp-microwave-drawer-4389000d88f510eb6a53a516d2c25b74.jpg",
        description: "Sharp microwave drawer pull out"
      },
      { 
        name: "Sous vide", 
        image: "https://www.jonsimmons.co/wp-content/uploads/2025/07/Sous-Vide-54604129-5.jpg",
        thumbnail: "https://www.jonsimmons.co/wp-content/uploads/2025/07/Sous-Vide-54604129-5.jpg",
        description: "Wolf sous vide pull out"
      }
    ],
    lineItems: [
      {
        condition: "Pot filler",
          items: [
            { name: "Pot filler", showPrice: true, calculation: "flat", category: "materials" },
            { name: "Pot filler - Plumbing Labor", calculation: "flat", category: "labor" }
          ]
      },
      {
        condition: "Vent hood",
          items: [
            { name: "Vent hood", showPrice: true, calculation: "flat", category: "materials" },
            { name: "Vent hood - Electrical Labor", calculation: "flat", category: "labor" }
          ]
      },
      {
        condition: "Sharp Microwave Drawer",
          items: [
            { name: "Sharp Microwave Drawer", showPrice: true, calculation: "flat", category: "materials" }
          ]
      },
      {
        condition: "Sous vide",
          items: [
            { name: "Sous vide", showPrice: true, calculation: "flat", category: "materials" }
          ]
      }
    ],
    next: "kitchen_countertops"
  },

  kitchen_countertops: {
    question: "Choose your countertop material:",
    inputType: "gallery", // Image selection
    userResponseTemplate: "We'll use <strong>{selection}</strong> for your kitchen's countertops.", 
    options: [
      { 
        name: "Laminate", 
        image: "https://www.jonsimmons.co/wp-content/uploads/2025/07/Laminate-awi-qcp-blog-why-decorative-laminate-is-an-important-part-of-the-architectural-woodworking-standards.jpg",
        thumbnail: "https://www.jonsimmons.co/wp-content/uploads/2025/07/Laminate-awi-qcp-blog-why-decorative-laminate-is-an-important-part-of-the-architectural-woodworking-standards.jpg",
        description: "Affordable laminate countertops"
      },
      { 
        name: "Quartz", 
        image: "https://www.jonsimmons.co/wp-content/uploads/2025/07/how-quartz-slabs-are-made.jpg",
        thumbnail: "https://www.jonsimmons.co/wp-content/uploads/2025/07/how-quartz-slabs-are-made.jpg",
        description: "Durable engineered quartz"
      },
      { 
        name: "Granite", 
        image: "https://www.jonsimmons.co/wp-content/uploads/2025/07/granite-What-Are-the-Different-Grades-of-Granite-Countertops-1024x683-1.jpg",
        thumbnail: "https://www.jonsimmons.co/wp-content/uploads/2025/07/granite-What-Are-the-Different-Grades-of-Granite-Countertops-1024x683-1.jpg",
        description: "Natural granite stone"
      },
      { 
        name: "Butcher Block", 
        image: "https://www.jonsimmons.co/wp-content/uploads/2025/07/100020668_american-cherry-butcher-block-countertop-12ft-kitchen-countertop_room.jpg",
        thumbnail: "https://www.jonsimmons.co/wp-content/uploads/2025/07/100020668_american-cherry-butcher-block-countertop-12ft-kitchen-countertop_room.jpg",
        description: "Warm wood countertops"
      }
    ],
    lineItems: [
      { name: "Countertops", calculation: "flat", category: "materials" },
      { name: "Countertop Installation", calculation: "flat", category: "labor", autoInclude: true }
    ],
    next: "kitchen_lighting_intro"
  },
  kitchen_lighting_intro: {
    question: "Great! We'll include standard overhead lighting in your estimate.",
    inputType: "continue",  // Shows continue button only
    statement: "Now let's see if you'd like any special lighting upgrades.",
    statementTiming: "after",
    lineItems: [
      // Standard lighting gets added here
      { name: "Standard kitchen lighting", calculation: "flat", category: "materials" }
    ],
    next: "kitchen_lighting"
},

  kitchen_lighting: {
    question: "For lighting, we'll add a standard budget for overhead fixtures.",
    inputType: "multiSelectGallery",
    statement: "Would you like any special touches?",
    statementTiming: "after",
    options: [
      { 
        name: "Inset cabinet lighting", 
        image: "https://www.jonsimmons.co/wp-content/uploads/2025/07/Lumaz_modern_kitchen_with_warm_under_cabinet_lights02_fab61c3f-5aa8-492b-9e1b-250259854746.jpg",
        thumbnail: "https://www.jonsimmons.co/wp-content/uploads/2025/07/Lumaz_modern_kitchen_with_warm_under_cabinet_lights02_fab61c3f-5aa8-492b-9e1b-250259854746.jpg",
        description: "Inset cabinet lighting"
      },
      { 
        name: "Under countertop lighting", 
        image: "https://www.jonsimmons.co/wp-content/uploads/2025/07/backlit-white-quartz-kitchen-counter-with-white-led-sheet.jpg",
        thumbnail: "https://www.jonsimmons.co/wp-content/uploads/2025/07/backlit-white-quartz-kitchen-counter-with-white-led-sheet.jpg",
        description: "Under countertop lighting"
      }
    ],
    userResponseTemplate: "You chose <strong>{selection}</strong> to use for your kitchen lighting.", // ← Add this
    lineItems: [
      // Only if 'Under cabinet lighting' was selected
      {
      condition: "Inset cabinet lighting", // Special condition for multiselect
        items: [
          { name: "Inset cabinet lighting", calculation: "flat", category: "materials" }
          //{ name: "Under countertop lighting", calculation: "flat", category: "materials" } 
        ]
      },
      {
      condition: "Under countertop lighting", // Special condition for multiselect
        items: [
          { name: "Under countertop lighting", calculation: "flat", category: "materials" }
          //{ name: "Under countertop lighting", calculation: "flat", category: "materials" } 
        ]
      }
    ],
    next: "kitchen_appliances"
  },

  kitchen_appliances: { //step key or step name
    question: "Let's choose your appliance package:",  // property
    statement: "Interesting fact: on average, appliances make up 30% of the cost of a full kitchen remodel", // also a property
    statementTiming: "before", // also a property
    inputType: "gallery",
    layout: "single-column",  // ← Add this property
    userResponseTemplate: "We'll install <strong>{selection}</strong> appliances.", 
    options: [
      { 
        name: "LG and GE", 
        image: "https://media3.bsh-group.com/Product_Shots/2000x/16805551_SGSXP365TS-Thermador-Cooktops-Illuminated-Control-Panel_def.webp",
        thumbnail: "https://media3.bsh-group.com/Product_Shots/2000x/16805551_SGSXP365TS-Thermador-Cooktops-Illuminated-Control-Panel_def.webp",
        description: "High-quality appliances from trusted brands"
      },
      { 
        name: "Thermador and Subzero", 
        image: "https://media3.bsh-group.com/Product_Shots/2000x/16805551_SGSXP365TS-Thermador-Cooktops-Illuminated-Control-Panel_def.webp",
        thumbnail: "https://media3.bsh-group.com/Product_Shots/2000x/16805551_SGSXP365TS-Thermador-Cooktops-Illuminated-Control-Panel_def.webp",
        description: "High-quality appliances from trusted brands"
      }
    ],
    responseLogic: (userChoice, sessionData) => {
    const sqft = sessionData.square_footage;
    const projectType = sessionData.project_type;
    
    if (userChoice.includes("Thermador")) {
      return `Excellent! Thermador and Sub-Zero are the gold standard for professional kitchens. For your ${sqft} sq ft ${projectType.toLowerCase()}, these appliances will create a truly chef-worthy space.`;
    } else if (userChoice.includes("LG")) {
      return `Great choice! LG and GE offer excellent reliability and modern features at a more affordable price point. Perfect for your ${sqft} sq ft kitchen - you'll get professional performance at a great value.`;
    } else if (userChoice.includes("GE")) {
      return `Smart decision! Keeping your existing appliances is a great way to control costs in your ${projectType.toLowerCase()}. You can always upgrade them later.`;
    }
      return "Great selection!";
    },
    lineItems: [
        { name: "Appliances", calculation: "flat", category: "materials" }
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
    next: "email_capture"
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
    next: "email_capture"
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
    next: "email_capture"
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
    next: "email_capture"
  },

  email_capture: {
    question: "To continue refining your estimate, please enter your email:",
    inputType: "email",
    validation: { required: true, format: "email" },
    emailConfig: {
      sendToCustomer: true,
      sendToDesigner: true,
      designerEmail: "jon@jonsimmons.co", // ← Your email
      customerSubject: "Your Kitchen Renovation Estimate is Ready!",
      designerSubject: "New Lead: Kitchen Renovation Estimate Request"
    },
    responseLogic: (userEmail, sessionData) => {
      return `You will receive an email with details for your ${sessionData.square_footage} sq ft ${sessionData.room_type} remodel. We'll refine the quote and contact you via email once we're ready to discuss.`;
    },
     // Add bypass check
    // Add this to browserURL: ?bypass=testing123
    bypassCheck: () => {
      const urlParams = new URLSearchParams(window.location.search);
      return urlParams.get('bypass') === 'testing123';
    },
    lineItems: [], // No cost impact
    next: "booking"
  },

  booking: {
    question: "Choose a time that works best for you:",
    inputType: "booking",
    calendlyUrl: "https://calendly.com/jon_simmons/60-minute-1-1?month=2025-07", // Replace with your URL
    lineItems: [],
    next: "final"
  },

  final: {
    question: "Thank you! We look forward to speaking with you soon.",
    inputType: "final",
    lineItems: [],
    next: null
  }

}; // END


// ==================== ALWAYS INCLUDED ITEMS ====================
const ALWAYS_INCLUDED = [
  { 
    name: "Design Consultation", 
    price: 550, // Changed from 500 to make it free
    category: "design", 
    showPrice: true,
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

const INSPIRATION_FLOWS = {
  "Kitchen": "kitchen_inspiration"
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
    } else if (currentStep.next === 'inspiration') {
      const room = sessionData.room || sessionData.initial;
      return INSPIRATION_FLOWS[room];
    }
    
    return currentStep.next;
  }
  
  static getLineItemsForStep(stepName, userInput) {
    console.log('=== getLineItemsForStep DEBUG ===');
    console.log('stepName:', stepName);
    console.log('userInput:', userInput);
    console.log('userInput type:', typeof userInput);
    console.log('userInput is array:', Array.isArray(userInput));
    
    const stepConfig = CONVERSATION_FLOW[stepName];

    console.log('stepConfig found:', !!stepConfig);
    console.log('stepConfig.lineItems:', stepConfig?.lineItems);
    const lineItems = [];
    
    stepConfig.lineItems?.forEach(lineItemDef => {
      console.log('🔍 Processing lineItemDef:', lineItemDef);
      console.log('🔍 lineItemDef.condition:', lineItemDef.condition);
      
      if (this.shouldAddLineItem(lineItemDef, userInput)) {
        console.log('🔍 shouldAddLineItem returned TRUE for:', lineItemDef);
        
        if (lineItemDef.items) {
          console.log('🔍 Has items array, length:', lineItemDef.items.length);
          
          if(Array.isArray(userInput) && lineItemDef.condition === 'selected') {
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
                  name: matchingItem.name,
                  calculation: matchingItem.calculation,
                  category: matchingItem.category,
                  userChoice: selectedItem,
                  stepName: stepName,
                  showPrice: matchingItem.showPrice || false
                });
              }
            });
          } else {
            // specific conditions like "Pot filler"
            console.log('🔍 Taking specific condition path for:', lineItemDef.condition);
            lineItemDef.items.forEach(item => {
              lineItems.push({
                name: item.name,
                calculation: item.calculation,
                category: item.category,
                userChoice: lineItemDef.condition,
                stepName: stepName,
                showPrice: item.showPrice || false
              });
            });
          }
        } else {
          // Handle single item (no items array)
          lineItems.push({
            name: `${lineItemDef.name}: ${userInput}`,
            calculation: lineItemDef.calculation,
            category: lineItemDef.category,
            userChoice: userInput,
            stepName: stepName,
            autoInclude: lineItemDef.autoInclude || false,
            showPrice: lineItemDef.showPrice || false
          });
        }
      }
    });
    
    console.log('🔍 Final lineItems to return:', lineItems);
    return lineItems;
  }  

  
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

    // Specific item condition
    if(Array.isArray(userInput)) {
      console.log('🔍 Checking if', lineItemDef.condition, 'is in', userInput);
      return userInput.includes(lineItemDef.condition);
    } else {
      console.log('🔍 Checking direct match:', lineItemDef.condition, '===', userInput);
      return lineItemDef.condition === userInput;
    }

    
    // Simple condition checking
    /*if (lineItemDef.condition === userInput) return true;
    if (lineItemDef.condition === `not ${userInput}`) return false;
    if (lineItemDef.condition.startsWith('not ') && 
        !userInput.includes(lineItemDef.condition.substring(4))) return true;
    
    return false;*/
  }
}


// ==================== DYNAMIC STEP COUNTER ====================

class ProgressCalculator {

  static calculateTotalSteps(roomType, projectType = null) {
    if (!roomType) return 0;

    const visited = new Set();
    let stepCount = 0;

    function traverseFlow(stepName, sessionData ={}) {
      // prevent infinite loops
      if(visited.has(stepName) || !stepName || stepName === 'complete') {
        return;
      }

      visited.add(stepName);
      stepCount++;

      const stepConfig = window.CONVERSATION_FLOW[stepName];
      if(!stepConfig) return;

      // Get next step using existing helper logic
      let nextStep = stepConfig.next;

      // Handle special routing
      if (nextStep === 'roomSpecific') {
        nextStep = window.ROOM_FLOWS[roomType];
      } else if (nextStep === 'inspiration') {
        nextStep = window.INSPIRATION_FLOWS[roomType];
      }

      // Continue traversing
      if (nextStep && nextStep !== 'complete') {
        traverseFlow(nextStep, sessionData);
      }

    }
      // Start traversing from initial step
  traverseFlow('initial', { initial: roomType, project_type: projectType });

  return stepCount;
  }


  static getCurrentStepIndex(roomType, currentStepName, sessionData = {}) {
    if(!roomType || !currentStepName) return 0;

    const visited = new Set();
    let stepIndex = 0;
    let found = false;

    function traverseFlow(stepName) {
      if (visited.has(stepName) || !stepName || stepName === 'complete' || found) {
        return;
      }

      visited.add(stepName);

      // Check if this is our current step
      if (stepName === currentStepName) {
        found = true;
        return;
      }

      stepIndex++;

      const stepConfig = window.CONVERSATION_FLOW[stepName];
      if(!stepConfig) return;

      // Get next step
      let nextStep = stepConfig.next;

      if(nextStep === 'roomSpecific') {
        nextStep = window.ROOM_FLOWS[roomType];
      } else if (nextStep === 'inspiration') {
        nextStep = window.INSPIRATION_FLOWS[roomType];
      }

      if (nextStep && nextStep !== 'complete') {
        traverseFlow(nextStep);
      }
    }

    traverseFlow('initial');
    return stepIndex;
  } // End getCurrentStepIndex

  static calculateProgress(roomType, currentStepName, sessionData = {}) {
    const totalSteps = ProgressCalculator.calculateTotalSteps(roomType, sessionData.project_type);
    const currentIndex = ProgressCalculator.getCurrentStepIndex(roomType, currentStepName, sessionData);

    if (totalSteps === 0) return 0;

    // Add 1 to show progress after completing current step
    const progressPercent = Math.min(((currentIndex + 1) / totalSteps) * 100, 100);
    return Math.round(progressPercent);
  }

  static getProgressInfo(roomType, currentStepName, sessionData = {}) {
    const totalSteps = ProgressCalculator.calculateTotalSteps(roomType, sessionData.project_type);
    const currentIndex = ProgressCalculator.getCurrentStepIndex(roomType, currentStepName, sessionData);
    const progress = ProgressCalculator.calculateProgress(roomType, currentStepName, sessionData);

    return {
      currentStep: currentIndex + 1,
      totalSteps: totalSteps,
      progressPercent: progress,
      isCompelte: currentStepName === 'complete' || progress >= 100
    };
  }
} // End class

// Make available globally
window.ProgressCalculator = ProgressCalculator;

// More sophisticated version
class AdvancedProgressCalculator extends ProgressCalculator {

  static calculateTotalSteps(roomType, sessionData = {}) {
    if(!roomType) return 0;

    const visited = new Set();
    let stepCount = 0;

    function traverseFlow(stepName, currentSessionData) {
      if (visited.has(stepName) || !stepName || stepName === 'complete') {
        return;
      }

      visited.add(stepName);
      stepCount++

      const stepConfig = window.CONVERSATION_FLOW[stepName];
      if(!stepConfig) return;

      // Handle routing logic
      let nextStep = stepConfig.next;

      if(nextStep === 'roomSpecific') {
        nextStep = window.ROOM_FLOWS[roomType];
      } else if (nextStep === 'inspiration') {
        nextStep = window.INSPIRATION_FLOWS[roomType];
      }

      // Skip conditional steps that wouldn't apply
      if (stepName === 'project_type') {
        // Simulate project type selection for counting
        const projectTypes = ['Update (cosmetic changes)', 'Partial Renovation', 'Full Renovation'];
        const simulatedProjectType = currentSessData.project_type || projectTypes[1]; // default to middle option
        currentSessionData = { ...currentSessionData, project_type: simulartedProjectType };
      }

      if (nextStep && nextStep !== 'complete') {
        traverseFlow(nextStep, currentSessionData);
      }
    }

    traverseFlow('inital', { ...sessionData, initial: roomType });
    return stepCount;
  }

  } // End AdvancedProgressCalculator class


// ==================== GLOBAL ====================

// Make available globally
window.CONVERSATION_FLOW = CONVERSATION_FLOW;
window.ConversationFlowHelper = ConversationFlowHelper;
window.ALWAYS_INCLUDED = ALWAYS_INCLUDED;
window.ROOM_FLOWS = ROOM_FLOWS;
window.INSPIRATION_FLOWS = INSPIRATION_FLOWS;

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

