// Centralized integration point for the current and future classifiers.
export const classifierConfig = {
  // Set this to false to force the application into an explicit
  // "model unavailable" state during development or testing.
  enabled: true,

  // Shared confidence threshold for the existing adapter.
  confidenceThreshold: 0.55,

  // Object detector settings used by the current hybrid adapter.
  objectDetection: {
    enabled: true,
    threshold: 0.62,
    backend: 'mobilenet_v2',
  },

  // Future classifier URL and label schema will be configured here.
  // The UI must never depend on these values directly.
  futureModel: {
    modelUrl: null,
    metadataUrl: null,
    inputSize: 224,
    // Ordered raw labels expected from the trained model.
    labels: [],
  },

  supportedCategories: ['recyclable', 'organic', 'ewaste', 'unknown'],
};
