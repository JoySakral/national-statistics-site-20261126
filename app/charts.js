// charts.js — small canvas chart helpers written for NusaStat. No library:
// every chart is drawn with the 2D canvas API and scales to its container.
const TEAL = '#0e7c7b';
const NAVY = '#0b3b4d';
const AMBER = '#e8a317';
const GRID = '#e3ecec';
const MUTED = '#5b6f78';

function setupCanvas(canvas) {
  const dpr = window.devicePixelRatio || 1;
  const rect = canvas.getBoundingClientRect();
  const w = Math.max(280, Math.round(rect.width));
  const h = Math.round(rect.height);
  canvas.width = Math.round(w * dpr);
  canvas.height = Math.round(h * dpr);
  const ctx = canvas.getContext('2d');
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  return { ctx, w, h };
}

function niceTicks(min, max, count = 4) {
  const span = max - min || 1;
  const step = span / count;
  const mag = Math.pow(10, Math.floor(Math.log10(step)));
  const norm = step / mag;
  const nice = norm < 1.5 ? 1 : norm < 3.5 ? 2 : norm < 7.5 ? 5 : 10;
  const s = nice * mag;
  const lo = Math.floor(min / s) * s;
  const out = [];
  for (let v = lo; v <= max + 1e-9; v += s) out.push(v);
  return out;
}

function drawAxes(ctx, pad, w, h, yTicks, yLabel, xLabels) {
  ctx.strokeStyle = GRID;
  ctx.fillStyle = MUTED;
  ctx.font = '11px "Segoe UI", system-ui, sans-serif';
  ctx.textAlign = 'right';
  ctx.textBaseline = 'middle';
  const plotH = h - pad.top - pad.bottom;
  const plotW = w - pad.left - pad.right;
  for (const t of yTicks) {
    const y = pad.top + plotH - ((t - yTicks[0]) / (yTicks[yTicks.length - 1] - yTicks[0] || 1)) * plotH;
    ctx.beginPath();
    ctx.moveTo(pad.left, y);
    ctx.lineTo(w - pad.right, y);
    ctx.stroke();
    ctx.fillText(yLabel(t), pad.left - 8, y);
  }
  ctx.textAlign = 'center';
  ctx.textBaseline = 'top';
  xLabels.forEach((lab, i) => {
    const x = pad.left + (plotW * (i + 0.5)) / xLabels.length;
    ctx.fillText(lab, x, h - pad.bottom + 8);
  });
  return { plotW, plotH };
}

// Line chart with markers and value labels.
export function lineChart(canvas, labels, values, opts = {}) {
  const { ctx, w, h } = setupCanvas(canvas);
  const color = opts.color || TEAL;
  const pad = { left: 52, right: 16, top: 14, bottom: 26 };
  const min = Math.min(...values, opts.min ?? Infinity);
  const max = Math.max(...values, opts.max ?? -Infinity);
  const lo = opts.min ?? Math.floor(Math.min(0, min) - 0.5);
  const hi = opts.max ?? Math.ceil(max + 0.5);
  const yTicks = niceTicks(lo, hi);
  const { plotW, plotH } = drawAxes(ctx, pad, w, h, yTicks, (v) => v.toFixed(opts.decimals ?? 1), labels);
  const x = (i) => pad.left + (plotW * i) / (labels.length - 1);
  const y = (v) => pad.top + plotH - ((v - yTicks[0]) / (yTicks[yTicks.length - 1] - yTicks[0])) * plotH;
  ctx.strokeStyle = color;
  ctx.lineWidth = 2.5;
  ctx.lineJoin = 'round';
  ctx.beginPath();
  values.forEach((v, i) => (i === 0 ? ctx.moveTo(x(i), y(v)) : ctx.lineTo(x(i), y(v))));
  ctx.stroke();
  ctx.fillStyle = color;
  values.forEach((v, i) => {
    ctx.beginPath();
    ctx.arc(x(i), y(v), 3.5, 0, Math.PI * 2);
    ctx.fill();
  });
  ctx.fillStyle = NAVY;
  ctx.font = 'bold 11px "Segoe UI", system-ui, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'bottom';
  values.forEach((v, i) => {
    if (i % 2 === 0 || i === values.length - 1) ctx.fillText(v.toFixed(opts.decimals ?? 1), x(i), y(v) - 7);
  });
}

// Vertical bar chart.
export function barChart(canvas, labels, values, opts = {}) {
  const { ctx, w, h } = setupCanvas(canvas);
  const color = opts.color || TEAL;
  const pad = { left: 52, right: 16, top: 22, bottom: 26 };
  const max = Math.max(...values, 1);
  const yTicks = niceTicks(0, max);
  // Headroom above the tallest gridline so the tallest bar's value label fits.
  const scaleMax = yTicks[yTicks.length - 1] * 1.12;
  const { plotW, plotH } = drawAxes(ctx, pad, w, h, yTicks, (v) => v.toFixed(opts.decimals ?? 0), labels);
  const slot = plotW / labels.length;
  const bw = Math.min(46, slot * 0.62);
  values.forEach((v, i) => {
    const bh = (plotH * v) / scaleMax;
    const bx = pad.left + slot * i + (slot - bw) / 2;
    const by = pad.top + plotH - bh;
    ctx.fillStyle = opts.colors ? opts.colors[i % opts.colors.length] : color;
    ctx.beginPath();
    ctx.roundRect(bx, by, bw, bh, [4, 4, 0, 0]);
    ctx.fill();
    ctx.fillStyle = NAVY;
    ctx.font = 'bold 11px "Segoe UI", system-ui, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'bottom';
    ctx.fillText(v.toFixed(opts.decimals ?? 1), bx + bw / 2, by - 4);
  });
}

// Horizontal bar chart — good for ranked lists such as provinces or sectors.
export function hbarChart(canvas, labels, values, opts = {}) {
  const { ctx, w, h } = setupCanvas(canvas);
  const color = opts.color || TEAL;
  const pad = { left: 150, right: 56, top: 8, bottom: 8 };
  const plotW = w - pad.left - pad.right;
  const max = Math.max(...values, 1);
  const rowH = (h - pad.top - pad.bottom) / labels.length;
  const bh = Math.min(20, rowH * 0.58);
  ctx.font = '12px "Segoe UI", system-ui, sans-serif';
  labels.forEach((lab, i) => {
    const y = pad.top + rowH * i + rowH / 2;
    const bw = (plotW * values[i]) / max;
    ctx.fillStyle = opts.colors ? opts.colors[i % opts.colors.length] : color;
    ctx.beginPath();
    ctx.roundRect(pad.left, y - bh / 2, Math.max(2, bw), bh, [0, 4, 4, 0]);
    ctx.fill();
    ctx.fillStyle = NAVY;
    ctx.textAlign = 'right';
    ctx.textBaseline = 'middle';
    ctx.fillText(lab, pad.left - 8, y);
    ctx.textAlign = 'left';
    ctx.font = 'bold 12px "Segoe UI", system-ui, sans-serif';
    ctx.fillText(values[i].toFixed(opts.decimals ?? 1), pad.left + bw + 6, y);
    ctx.font = '12px "Segoe UI", system-ui, sans-serif';
  });
}

// Grouped bars: two series side by side (e.g. exports vs imports).
export function groupedBarChart(canvas, labels, seriesA, seriesB, opts = {}) {
  const { ctx, w, h } = setupCanvas(canvas);
  const pad = { left: 52, right: 16, top: 22, bottom: 26 };
  const max = Math.max(...seriesA, ...seriesB, 1);
  const yTicks = niceTicks(0, max);
  const scaleMax = yTicks[yTicks.length - 1] * 1.12;
  const { plotW, plotH } = drawAxes(ctx, pad, w, h, yTicks, (v) => v.toFixed(0), labels);
  const slot = plotW / labels.length;
  const bw = Math.min(26, slot * 0.32);
  labels.forEach((_, i) => {
    const cx = pad.left + slot * i + slot / 2;
    const pairs = [
      [seriesA[i], opts.colorA || TEAL],
      [seriesB[i], opts.colorB || AMBER],
    ];
    pairs.forEach(([v, col], k) => {
      const bh = (plotH * v) / scaleMax;
      ctx.fillStyle = col;
      ctx.beginPath();
      ctx.roundRect(cx + (k === 0 ? -bw - 2 : 2), pad.top + plotH - bh, bw, bh, [3, 3, 0, 0]);
      ctx.fill();
    });
  });
  ctx.fillStyle = NAVY;
  ctx.font = 'bold 11px "Segoe UI", system-ui, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'bottom';
  labels.forEach((_, i) => {
    const cx = pad.left + slot * i + slot / 2;
    ctx.fillText(seriesA[i].toFixed(0), cx - bw / 2 - 2, pad.top + plotH - (plotH * seriesA[i]) / scaleMax - 4);
  });
}

// Redraw every chart on the page (called after render and on resize).
export function drawAllCharts() {
  document.querySelectorAll('canvas.chart[data-chart]').forEach((cv) => {
    const fn = cv.dataset.chart;
    const labels = JSON.parse(cv.dataset.labels || '[]');
    const values = JSON.parse(cv.dataset.values || '[]');
    const opts = JSON.parse(cv.dataset.opts || '{}');
    if (fn === 'line') lineChart(cv, labels, values, opts);
    else if (fn === 'bar') barChart(cv, labels, values, opts);
    else if (fn === 'hbar') hbarChart(cv, labels, values, opts);
    else if (fn === 'grouped') {
      const valuesB = JSON.parse(cv.dataset.valuesB || '[]');
      groupedBarChart(cv, labels, values, valuesB, opts);
    }
  });
}
