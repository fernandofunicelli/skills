import { CheckCircle, XCircle } from 'lucide-react';
import { LpComparisonTable } from '@/lib/types';

interface LpComparisonProps { data: LpComparisonTable; }

export function LpComparison({ data }: LpComparisonProps) {
    if (!data.columns || !data.rows) return null;
    const columns: string[] = data.columns;
    const rows: Record<string, string | boolean>[] = data.rows;

    return (
        <section className="py-16 bg-surface-900 text-white">
            <div className="container-custom">
                {data.headline && <h2 className="text-h2 font-heading text-center mb-12">{data.headline}</h2>}
                <div className="max-w-content mx-auto overflow-x-auto">
                    <table className="w-full border-collapse rounded-card overflow-hidden shadow-card border border-surface-800">
                        <thead>
                            <tr className="bg-brand-950 text-white border-b border-surface-800">
                                <th className="py-4 px-6 text-left" />
                                {columns.map((col, i) => (
                                    <th key={i} className={`py-4 px-6 text-center font-heading ${i === 0 ? 'text-brand-500' : 'text-surface-400'}`}>{col}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {rows.map((row, i) => {
                                const keys = Object.keys(row);
                                const feature = row[keys[0]];
                                const values = keys.slice(1).map(k => row[k]);
                                return (
                                    <tr key={i} className={`border-b border-surface-800 ${i % 2 === 0 ? 'bg-surface-900' : 'bg-surface-800'} hover:bg-surface-800/80 transition-colors`}>
                                        <td className="py-4 px-6 font-medium text-surface-200">{String(feature)}</td>
                                        {values.map((val, j) => (
                                            <td key={j} className="py-4 px-6 text-center">
                                                {typeof val === 'boolean' ? (
                                                    val ? <CheckCircle className={`w-5 h-5 mx-auto ${j === 0 ? 'text-success-500' : 'text-surface-600'}`} /> : <XCircle className="w-5 h-5 mx-auto text-surface-600" />
                                                ) : (
                                                    <span className={`text-body ${j === 0 ? 'font-semibold text-brand-500' : 'text-surface-500'}`}>{String(val)}</span>
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
