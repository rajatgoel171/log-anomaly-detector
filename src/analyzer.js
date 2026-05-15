export function parseLogLine(line) {
  const [timestamp, method, path, status, durationMs] = line.trim().split(/\s+/);
  return {
    timestamp,
    method,
    path,
    status: Number(status),
    durationMs: Number(durationMs),
  };
}

export function analyzeLogs(lines, { slowThresholdMs = 500, errorRateThreshold = 0.2 } = {}) {
  const entries = lines.filter(Boolean).map(parseLogLine);
  const routes = new Map();

  for (const entry of entries) {
    const key = `${entry.method} ${entry.path}`;
    const route = routes.get(key) ?? { route: key, count: 0, errors: 0, totalLatencyMs: 0 };
    route.count += 1;
    route.errors += entry.status >= 500 ? 1 : 0;
    route.totalLatencyMs += entry.durationMs;
    routes.set(key, route);
  }

  return [...routes.values()].map((route) => {
    const averageLatencyMs = Math.round(route.totalLatencyMs / route.count);
    const errorRate = route.errors / route.count;
    return {
      route: route.route,
      count: route.count,
      errorRate,
      averageLatencyMs,
      anomalies: [
        ...(errorRate >= errorRateThreshold ? ["high_error_rate"] : []),
        ...(averageLatencyMs >= slowThresholdMs ? ["slow_route"] : []),
      ],
    };
  });
}
