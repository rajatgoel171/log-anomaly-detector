# Log Anomaly Detector

A small operational analytics tool that parses service logs and identifies error spikes, slow requests, and endpoint-level latency issues.

## What This Demonstrates

- Production support tooling
- Log parsing and aggregation
- Reliability-focused backend thinking
- Clean metrics generation without external dependencies

## Features

- Parses structured log lines
- Counts status codes and error rates
- Calculates average latency per route
- Flags slow routes and high error rates
- CLI demo with sample log data

## Run

```bash
npm test
npm run demo
```


















## Progress Note 4

- 2026-01-18: documented service readiness, implementation progress, and release hygiene for log-anomaly-detector.
- Captured validation notes for observability, operational checks, and handoff readiness.
