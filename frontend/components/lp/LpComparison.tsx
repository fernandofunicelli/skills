import { CheckCircle, XCircle } from 'lucide-react';
import { LpComparisonTable } from '@/lib/types';

interface LpComparisonProps { data: LpComparisonTable; }

export function LpComparison({ data }: LpComparisonProps) {
    if (!data.columns || !data.rows) return null;
    const columns: string[] = data.columns;
    const rows: Record<string, string | boolean>[] = data.rows;

    return (
        <section className="py-16 bg-surface-50">
            <div className="container-custom">
                {data.headline && <h2 className="text-h2 font-heading text-center mb-12">{data.headline}</h2>}
                <div className="max-w-content mx-auto overflow-x-auto">
                    <table className="w-full border-collapse rounded-card overflow-hidden shadow-card">
                        <thead>
                            <tr className="bg-brand-950 text-white">
                                <th className="py-4 px-6 text-left" />
                                {columns.map((col, i) => (
                                    <th key={i} className={`py-4 px-6 text-center font-heading ${i === 0 ? 'text-accent-400' : 'text-surface-400'}`}>{col}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {rows.map((row, i) => {
                                const keys = Object.keys(row);
                                const feature = row[keys[0]];
                                const values = keys.slice(1).map(k => row[k]);
                                return (
                                    <tr key={i} className={`border-b border-surface-200 ${i % 2 === 0 ? 'bg-white' : 'bg-surface-50'} hover:bg-brand-50 transition-colors`}>
                                        <td className="py-4 px-6 font-medium text-surface-800">{String(feature)}</td>
                                        {values.map((val, j) => (
                                            <td key={j} className="py-4 px-6 text-center">
                                                {typeof val === 'boolean' ? (
                                                    val ? <CheckCircle className={`w-5 h-5 mx-auto ${j === 0 ? 'text-success-500' : 'text-surface-400'}`} /> : <XCircle className="w-5 h-5 mx-auto text-danger-400" />
                                                ) : (
                                                    <span className={`text-body ${j === 0 ? 'font-semibold text-brand-600' : 'text-surface-500'}`}>{String(val)}</span>
                                                )}
                                            </td>
                                        ))}
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    );
}
