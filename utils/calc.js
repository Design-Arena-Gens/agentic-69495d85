export function getCheapestForSize(firms, accountSize) {
  const sizeStr = String(accountSize);
  const entries = firms
    .map((f) => {
      const fee = f.accountFees[sizeStr];
      if (fee == null) return null;
      const feePer10k = fee / (accountSize / 10000);
      return {
        name: f.name,
        url: f.url,
        model: f.model,
        refundable: f.refundable,
        fee,
        accountSize,
        feePer10k,
        notes: f.notes ?? ''
      };
    })
    .filter(Boolean)
    .sort((a, b) => a.fee - b.fee);
  return entries;
}

export function formatCurrency(amount) {
  try {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(amount);
  } catch {
    return `$${Math.round(amount)}`;
  }
}
