export function formatDate(iso: string): string { try { return new Date(iso).toLocaleDateString('en-NG', { day: 'numeric', month: 'short', year: 'numeric' }); } catch { return iso; } }
