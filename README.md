# Kachra-snap — Smart Waste Classifier

Kachra-snap is a React-based web application that helps users classify waste into three categories: Recyclable Waste, Organic Waste, and E-Waste.

The application uses a custom image classification model exported from Google Teachable Machine and TensorFlow.js for browser-based predictions. It also includes COCO-SSD object detection as a fallback for supported objects.

## Features

- Upload an image and classify waste.
- Display the predicted category and confidence score.
- Access disposal guidance for detected categories.
- Use camera capture and live scanning where supported.
- View scan results and save scan records locally.
- Responsive interface built with React and Tailwind CSS.

## Tech Stack

- React
- Vite
- TensorFlow.js
- Teachable Machine image classification model
- COCO-SSD
- Tailwind CSS
- Lucide React

## Waste Categories

- Recyclable Waste
- Organic Waste
- Electronic Waste (E-Waste)
- Unknown or Low Confidence

## Getting Started

### Prerequisites

- Node.js and npm
- Git

### Installation

Clone the repository:

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
cd eco-sort
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

### Build for Production

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Model Files

The custom TensorFlow.js model is stored in `public/model/`.

Expected files:

- `model.json`
- `metadata.json`
- The weights `.bin` file referenced by `model.json`

Ensure all model files are included in the repository and the labels in `metadata.json` match the application's category mappings.

## Limitations

Predictions depend on the model's training data, image quality, and preprocessing. Confidence scores do not guarantee prediction accuracy. Disposal recommendations may vary according to local recycling rules.

## Future Improvements

- Improve model accuracy with more diverse training images.
- Evaluate predictions across all waste categories.
- Improve low-confidence handling.
- Expand supported waste types and disposal guidance.

## License

Add your chosen license here if you decide to distribute this project under an open-source license.
