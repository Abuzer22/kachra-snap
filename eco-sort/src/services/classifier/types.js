// Shared schema and validation helpers for classifier results.
export const PREDICTION_STATUSES = {
  IDLE: 'idle',
  INITIALIZING: 'initializing',
  READY: 'ready',
  CLASSIFYING: 'classifying',
  ERROR: 'error',
  UNAVAILABLE: 'unavailable',
};

export const APPLICATION_CATEGORIES = {
  RECYCLABLE: 'recyclable',
  ORGANIC: 'organic',
  E_WASTE: 'ewaste',
  UNKNOWN: 'unknown',
};

export function validatePredictionResult(result) {
  if (!result || typeof result !== 'object') {
    throw new Error('Invalid prediction result.');
  }
  const validCategories = Object.values(APPLICATION_CATEGORIES);
  if (!validCategories.includes(result.category)) {
    throw new Error('Prediction category is not supported.');
  }
  if (typeof result.label !== 'string') {
    throw new Error('Prediction label must be a string.');
  }
  if (typeof result.confidence !== 'number' || !Number.isFinite(result.confidence)) {
    throw new Error('Prediction confidence must be finite.');
  }
  return true;
}
