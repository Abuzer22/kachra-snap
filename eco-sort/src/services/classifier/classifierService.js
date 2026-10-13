import { classifierConfig } from './config';
import { PREDICTION_STATUSES } from './types';
import currentModelAdapter from './modelAdapter';

let status = PREDICTION_STATUSES.IDLE;

export async function initializeClassifier(onStatus) {
  if (!classifierConfig.enabled) {
    status = PREDICTION_STATUSES.UNAVAILABLE;
    onStatus?.(status);
    return false;
  }

  status = PREDICTION_STATUSES.INITIALIZING;

  try {
    const ready = await currentModelAdapter.initialize(onStatus);
    status = ready ? PREDICTION_STATUSES.READY : PREDICTION_STATUSES.UNAVAILABLE;
    return ready;
  } catch (error) {
    status = PREDICTION_STATUSES.ERROR;
    throw error;
  }
}

export async function classifyImage(image) {
  if (status !== PREDICTION_STATUSES.READY) {
    throw new Error('Classifier is not ready.');
  }
  status = PREDICTION_STATUSES.CLASSIFYING;
  try {
    const result = await currentModelAdapter.classifyImage(image);
    status = PREDICTION_STATUSES.READY;
    return result;
  } catch (error) {
    status = PREDICTION_STATUSES.ERROR;
    throw error;
  }
}

export function getClassifierStatus() {
  return status;
}

export function resetClassifierStatus() {
  status = PREDICTION_STATUSES.IDLE;
}

export function disposeClassifier() {
  status = PREDICTION_STATUSES.IDLE;
}