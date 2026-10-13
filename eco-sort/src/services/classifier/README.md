# Classifier Integration Guide

The UI depends on the classifier service, not on a specific model library.

## To replace the model later
1. Update `src/services/classifier/config.js`.
2. Implement a compatible adapter in `src/services/classifier/modelAdapter.js`, or add a new adapter and switch it in `classifierService.js`.
3. Keep the adapter returning:
   - `label`: raw model label
   - `category`: one of `recyclable`, `organic`, `ewaste`, `unknown`
   - `confidence`: finite number from the model
   - `lowConfidence`: boolean
   - `source`: model or adapter identifier
4. Update `src/constants/categories.js` only if the raw label mapping changes.
5. Verify preprocessing, output labels, thresholds, and category mapping before production use.
6. Test representative images and handle unsupported outputs as `unknown`.

No dashboard, history, analytics, or disposal-guide component should need changes when the adapter interface remains the same.
