import React from 'react';
import { Player } from '../types';

interface PerformanceRankingProps {
    players: Player[];
    isCoachMode: boolean;
    updatePlayerRanking: (playerId: number, field: keyof Omit<Player['ranking'], 'pontuacaoTotal'>, value: string) => void;
}

const PerformanceRanking: React.FC<PerformanceRankingProps> = ({ players, isCoachMode, updatePlayerRanking }) => {
    
    const numericFields: (keyof Player['ranking'])[] = ['assiduidade', 'espiritoDeEquipe', 'resistencia', 'tecnica', 'fairPlay', 'bomHumor'];

    const headers: { key: (keyof Player['ranking']) | 'name', label: string }[] = [
        { key: 'name', label: 'Apelido' },
        { key: 'posicao', label: 'Posição' },
        { key: 'assiduidade', label: 'Assiduidade' },
        { key: 'espiritoDeEquipe', label: 'Espírito de Equipe' },
        { key: 'resistencia', label: 'Resistência' },
        { key: 'tecnica', label: 'Técnica' },
        { key: 'fairPlay', label: 'Fair Play' },
        { key: 'bomHumor', label: 'Bom Humor' },
        { key: 'observacoes', label: 'Observações' },
        { key: 'pontuacaoTotal', label: 'Pontuação Total' },
    ];

    return (
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white border-b pb-2 border-gray-200 dark:border-gray-700">Ranking de Performance</h2>
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-50 dark:bg-gray-700">
                        <tr>
                            {headers.map(({ key, label }) => (
                                <th
                                    key={key}
                                    scope="col"
                                    className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider select-none"
                                >
                                    {label}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                        {players.map((player) => (
                            <tr key={player.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                                <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">{player.name}</td>
                                {headers.slice(1, -1).map(({ key }) => (
                                    <td key={key} className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                                        {isCoachMode ? (
                                            <input
                                                type={numericFields.includes(key as any) || key === 'posicao' ? "number" : "text"}
                                                {...(numericFields.includes(key as any) && {min: 0, max: 5})}
                                                value={player.ranking[key as keyof Player['ranking']] ?? ''}
                                                onChange={(e) => updatePlayerRanking(player.id, key as any, e.target.value)}
                                                className="w-24 p-1 bg-gray-100 dark:bg-gray-700 rounded-md border-gray-300 dark:border-gray-600 focus:ring-green-500 focus:border-green-500"
                                            />
                                        ) : (
                                           <span>{player.ranking[key as keyof Player['ranking']] ?? '-'}</span>
                                        )}
                                    </td>
                                ))}
                                <td className={`px-4 py-4 whitespace-nowrap text-sm font-bold ${player.ranking.pontuacaoTotal > 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                                    {player.ranking.pontuacaoTotal}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PerformanceRanking;