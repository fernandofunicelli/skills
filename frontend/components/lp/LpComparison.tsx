import { CheckCircle, XCircle } from 'lucide-react';
import { LpComparisonTable } from '@/lib/types';

interface LpComparisonProps { data: LpComparisonTable; }

export function LpComparison({ data }: LpComparisonProps) {
    if (!data.columns || !data.rows) return null;
    const columns: string[] = data.columns;
    const rows: Record<string, string | boolean>[] = data.rows;

    return (
        <section className="py-20 bg-background-dark">
            <div className="max-w-7xl mx-auto px-4">
                {data.headline && <h2 className="text-4xl font-black mb-16 text-center text-white">{data.headline}</h2>}
                <div className="overflow-x-auto pb-4">
                    <table className="w-full min-w-[600px]">
                        <thead>
                            <tr className="border-b border-white/10">
                                <th className="text-left py-4 px-6 text-slate-400 font-normal" />
                                {columns.map((col, i) => (
                                    <th key={i} className={`py-4 px-6 font-bold text-center ${i === 0 ? 'text-white bg-white/5 rounded-t-xl' : 'text-slate-400 font-normal'}`}>{col}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {rows.map((row, i) => {
                                const keys = Object.keys(row);
                                const feature = row[keys[0]];
                                const values = keys.slice(1).map(k => row[k]);
                                return (
                                    <tr key={i} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                                        <td className="py-4 px-6 font-medium text-slate-300">{String(feature)}</td>
                                        {values.map((val, j) => (
                                            <td key={j} className={`py-4 px-6 text-center ${j === 0 ? 'bg-white/5' : ''}`}>
                                                {typeof val === 'boolean' ? (
                                                    val ? <CheckCircle className={`w-5 h-5 mx-auto ${j === 0 ? 'text-primary' : 'text-slate-600'}`} /> : <XCircle className="w-5 h-5 mx-auto text-slate-600" />
                                                ) : (
                                                    <span className={`${j === 0 ? 'font-bold text-primary' : 'text-slate-500'}`}>{String(val)}</span>
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
