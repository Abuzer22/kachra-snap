// Application-level waste categories used by EcoSort AI.
// Raw model labels are mapped to these categories in labelText mappings.
export const PRODUCT_CATEGORIES = [
  { id: 'recyclable', label: 'Recyclable' },
  { id: 'organic', label: 'Organic' },
  { id: 'ewaste', label: 'Electronic Waste' },
  { id: 'unknown', label: 'Unknown or Low Confidence' },
];

export const CATEGORY_LABEL = Object.fromEntries(
  PRODUCT_CATEGORIES.map((c) => [c.id, c.label])
);

export const PRIMARY_CATEGORY_IDS = PRODUCT_CATEGORIES.map((c) => c.id);

// Teachable Machine model labels mapped to application categories.
// A label is mapped only when the model actually detects that material/item.
export const LABEL_TO_CATEGORY = {
  'Aluminium Foil': 'recyclable',
  'Broken Glass': 'recyclable',
  Can: 'recyclable',
  Cardboard: 'recyclable',
  Carton: 'recyclable',
  Glass: 'recyclable',
  Lid: 'unknown',
  Paper: 'recyclable',
  'Paper Bag': 'recyclable',
  'Other Plastic': 'unknown',
  'Plastic Bag & Wrapper': 'unknown',
  'Plastic Bottle': 'recyclable',
  'Plastic Container': 'unknown',
  'Plastic Utensils': 'unknown',
  'Pop Tab': 'recyclable',
  'Scrap Metal': 'recyclable',
  'Squeezable Tube': 'unknown',
  Straw: 'unknown',
  'Food Waste': 'organic',
  Battery: 'ewaste',
  'Plastic Glooves': 'unknown',
  'Blister Pack': 'unknown',
  'Bottle Cap': 'unknown',
  Cigarette: 'unknown',
  Cup: 'unknown',
  'Rope & Strings': 'unknown',
  Shoe: 'unknown',
  'Styrofoam Piece': 'unknown',
  'Unlabeled Litter': 'unknown',
};

export const MODEL_LABELS = Object.keys(LABEL_TO_CATEGORY);

export const MODEL_URL =
  'https://teachablemachine.withgoogle.com/models/OGpAH453K/';

export const CONFIDENCE_THRESHOLD = 0.55;

// Map older/granular categories to the current application categories.
export function toApplicationCategory(raw) {
  if (!raw) return 'unknown';
  if (PRIMARY_CATEGORY_IDS.includes(raw)) return raw;
  const legacyMap = {
    plastic: 'recyclable',
    paper: 'recyclable',
    metal: 'recyclable',
    glass: 'recyclable',
    organic: 'organic',
    ewaste: 'ewaste',
    hazardous: 'unknown',
    textiles: 'unknown',
    residual: 'unknown',
    unknown: 'unknown',
  };
  return legacyMap[raw] || 'unknown';
}

// Broad disposal stream shown with scan results. This is guidance only;
// actual recyclability depends on item condition, composition, and local rules.
export const DISPOSAL_STREAM = {
  recyclable: { label: 'Potentially recyclable', tone: 'recyclable' },
  organic: { label: 'Organic / compostable', tone: 'organic' },
  ewaste: { label: 'Electronic waste', tone: 'ewaste' },
  unknown: { label: 'Unknown / verify locally', tone: 'unknown' },
};