import React from 'react';
import { Player } from '../types';
import BarChart from './BarChart';

interface AutomaticRankingProps {
    players: Player[];
}

const AutomaticRanking: React.FC<AutomaticRankingProps> = ({ players }) => {
    const sortedPlayers = React.useMemo(() => 
        [...players].sort((a, b) => b.ranking.pontuacaoTotal - a.ranking.pontuacaoTotal),
    [players]);

    const chartData = React.useMemo(() =>
        sortedPlayers
            .filter(p => p.ranking.pontuacaoTotal > 0)
            .map(p => ({ label: p.name, value: p.ranking.pontuacaoTotal })),
    [sortedPlayers]);

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Ranked List */}
            <div className="lg:col-span-1 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg">
                <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white border-b pb-2 border-gray-200 dark:border-gray-700">Classificação Geral</h2>
                <ul className="space-y-2 max-h-[60vh] overflow-y-auto">
                    {sortedPlayers.map((player, index) => (
                        <li key={player.id} className="flex items-center justify-between p-2 rounded-md bg-gray-50 dark:bg-gray-700/50">
                           <div className="flex items-center">
                                <span className="text-lg font-bold w-8 text-center text-gray-500 dark:text-gray-400">{index + 1}</span>
                                <span className="text-gray-800 dark:text-gray-200 ml-2">{player.name}</span>
                           </div>
                           <span className="font-bold text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/50 px-3 py-1 rounded-full text-sm">
                                {player.ranking.pontuacaoTotal} pts
                           </span>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Bar Chart */}
            <div className="lg:col-span-2 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg">
                <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white border-b pb-2 border-gray-200 dark:border-gray-700">Gráfico de Performance</h2>
                {chartData.length > 0 ? (
                    <BarChart data={chartData} />
                ) : (
                    <div className="flex items-center justify-center h-full text-gray-500 dark:text-gray-400">
                        <p>Nenhuma pontuação para exibir no gráfico.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AutomaticRanking;
