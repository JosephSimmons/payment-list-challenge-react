import { Metric, onCLS, onINP, onLCP, onFCP, onTTFB } from 'web-vitals';

function logMetric(metric: Metric) {
  console.log(`[WebVitals] ${metric.name}:`, metric);
}

export function reportWebVitals() {
  onCLS(logMetric);
  onINP(logMetric);
  onLCP(logMetric);
  onFCP(logMetric);
  onTTFB(logMetric);
}
