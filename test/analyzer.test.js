import assert from "node:assert/strict";
import { test } from "node:test";
import { analyzeLogs, parseLogLine } from "../src/analyzer.js";

test("parses structured log lines", () => {
  assert.deepEqual(parseLogLine("2026-04-01T10:00:00Z GET /api/orders 200 42"), {
    timestamp: "2026-04-01T10:00:00Z",
    method: "GET",
    path: "/api/orders",
    status: 200,
    durationMs: 42,
  });
});

test("detects route anomalies", () => {
  const report = analyzeLogs([
    "2026-04-01T10:00:00Z POST /api/orders 500 700",
    "2026-04-01T10:00:01Z POST /api/orders 502 800",
  ]);

  assert.deepEqual(report[0].anomalies, ["high_error_rate", "slow_route"]);
});
