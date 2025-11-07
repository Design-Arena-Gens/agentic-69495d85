import firms from "../data/propfirms.json";
import { getCheapestForSize, formatCurrency } from "../utils/calc";

const SIZES = [5000, 10000, 25000, 50000, 100000, 200000, 250000];

function Badge({ children }) {
  return <span className="badge">{children}</span>;
}

export default function Page() {
  const defaultSize = 100000;
  return (
    <Content defaultSize={defaultSize} />
  );
}

function Content({ defaultSize }) {
  const [size, setSize] = React.useState(defaultSize);
  const [modelFilter, setModelFilter] = React.useState("all");

  const entries = React.useMemo(() => {
    const base = getCheapestForSize(firms, size);
    if (modelFilter === "all") return base;
    return base.filter((e) => e.model === modelFilter);
  }, [size, modelFilter]);

  const best = entries[0];

  return (
    <div className="card">
      <div className="controls">
        <label>
          <span className="small">Account size</span>
          <select value={size} onChange={(e) => setSize(parseInt(e.target.value))}>
            {SIZES.map((s) => (
              <option value={s} key={s}>{s.toLocaleString()} USD</option>
            ))}
          </select>
        </label>
        <label>
          <span className="small">Model</span>
          <select value={modelFilter} onChange={(e) => setModelFilter(e.target.value)}>
            <option value="all">All</option>
            <option value="two-step">Two-step</option>
            <option value="multi-step">Multi-step</option>
            <option value="instant">Instant funding</option>
          </select>
        </label>
        {best && (
          <span className="badge">Cheapest: <strong className="highlight">{best.name}</strong> at {formatCurrency(best.fee)}</span>
        )}
      </div>

      <table className="table">
        <thead>
          <tr>
            <th style={{width: '34%'}}>Firm</th>
            <th style={{width: '16%'}}>Model</th>
            <th style={{width: '16%'}}>Fee</th>
            <th style={{width: '16%'}}>Per $10k</th>
            <th style={{width: '18%'}}>Details</th>
          </tr>
        </thead>
        <tbody>
          {entries.map((e, idx) => (
            <tr className={`row ${idx === 0 ? 'best' : ''}`} key={e.name}>
              <td>
                <div className="firm">
                  <a href={e.url} target="_blank" rel="noreferrer">{e.name}</a>
                </div>
              </td>
              <td>
                <Badge>{e.model}</Badge>
                {e.refundable && <span style={{marginLeft: 8}} className="badge">fee refundable</span>}
              </td>
              <td>{formatCurrency(e.fee)}</td>
              <td>{formatCurrency(Math.round(e.feePer10k))}</td>
              <td className="small">{e.notes}</td>
            </tr>
          ))}
          {entries.length === 0 && (
            <tr className="row"><td colSpan={5} className="small">No data for this size/model.</td></tr>
          )}
        </tbody>
      </table>

      <div className="kpi">
        <span>Sorted by up-front challenge fee (lower is cheaper).</span>
        <span>Default size: {defaultSize.toLocaleString()} USD</span>
      </div>
    </div>
  );
}

// Ensure React in scope for Next.js Server Components using client-side hooks
import * as React from 'react';
