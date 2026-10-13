import * as modelService from '../../lib/model';
import { classifierConfig } from './config';
import { validatePredictionResult } from './types';

// Adapter used by the rest of the UI. A future trained model should only need
// to replace the implementation behind this interface.
export const currentModelAdapter = {
  async initialize(onStatus) {
    await modelService.loadModel(onStatus);
    return modelService.isModelLoaded();
  },

  async classifyImage(image) {
    const result = await modelService.classifyImage(image);
    validatePredictionResult(result);
    return {
      label: result.label,
      rawLabel: result.label,
      category: result.category,
      confidence: result.confidence,
      lowConfidence:
        typeof result.lowConfidence === 'boolean'
          ? result.lowConfidence
          : result.confidence < classifierConfig.confidenceThreshold,
      source: result.source || 'current-model',
      all: Array.isArray(result.all) ? result.all : [],
      alternatives: Array.isArray(result.all) ? result.all : [],
      metadata: {
        threshold: classifierConfig.confidenceThreshold,
      },
    };
  },

  getStatus() {
    return modelService.isModelLoaded() ? 'ready' : 'unavailable';
  },
};

export default currentModelAdapter;