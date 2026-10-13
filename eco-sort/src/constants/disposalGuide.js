export const DISPOSAL_GUIDE = {
  recyclable: {
    examples: ['Clean paper', 'Cardboard', 'Plastic bottles', 'Glass bottles', 'Metal cans'],
    preparation: [
      'Keep materials clean and dry.',
      'Remove food residue and flatten cardboard.',
      'Separate caps, lids, and labels when required.',
    ],
    disposal: [
      'Place in the local recycling stream only when accepted.',
      'Follow resin codes and local sorting rules.',
      'Do not recycle contaminated or wet paper.',
    ],
    contamination: [
      'Food, grease, and liquids can ruin recyclable batches.',
      'Mixed or dirty packaging may need general waste.',
    ],
    safety: ['Be careful with broken glass and sharp metal.'],
    local: 'Recycling acceptance varies by municipality. Confirm local rules.',
  },
  organic: {
    examples: ['Fruit peels', 'Vegetable scraps', 'Coffee grounds', 'Garden waste'],
    preparation: [
      'Collect food scraps separately.',
      'Avoid meat, dairy, and oily foods unless accepted.',
      'Keep plastic bags and stickers out of the bin.',
    ],
    disposal: [
      'Use wet-waste collection or approved composting where available.',
      'Compost appropriate material at home if allowed.',
    ],
    contamination: ['Non-compostable packaging contaminates organic waste.'],
    safety: ['Wash hands after handling decomposing material.'],
    local: 'Organic-waste rules vary by collection program.',
  },
  ewaste: {
    examples: ['Smartphones', 'Laptops', 'Chargers', 'Cables', 'Keyboards'],
    preparation: [
      'Back up and wipe personal data.',
      'Remove batteries where possible and handle them separately.',
    ],
    disposal: [
      'Use authorized e-waste collection points or approved recyclers.',
      'Take devices to collection events or designated drop-off sites.',
    ],
    contamination: ['Do not place electronics in household recycling or trash.'],
    safety: ['Batteries can create fire risks if damaged.'],
    local: 'Find authorized e-waste channels in your area.',
  },
  unknown: {
    examples: ['Items that cannot be classified confidently'],
    preparation: ['Keep the item clean and dry while you assess it.'],
    disposal: [
      'When identification is uncertain, do not assume recyclability.',
      'Consult local disposal rules or a waste facility.',
    ],
    contamination: ['Uncertain materials can contaminate recycling streams.'],
    safety: ['Handle unknown items, especially chemicals or batteries, with care.'],
    local: 'When in doubt, ask your local waste authority.',
  },
};