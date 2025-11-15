import { useState, useEffect, useCallback } from 'react';
import { Player, PlayerStatus, Position } from '../types';
import { INITIAL_PLAYERS } from '../constants';

const LOCAL_STORAGE_KEY = 'amigos_da_bola_lineup_v3';

export const usePlayers = () => {
  const [players, setPlayers] = useState<Player[]>([]);

  useEffect(() => {
    let initialValue = INITIAL_PLAYERS;
    try {
      const storedData = window.localStorage.getItem(LOCAL_STORAGE_KEY);
      if (storedData) {
        const parsedData = JSON.parse(storedData);
        if (Array.isArray(parsedData) && parsedData.length > 0) {
            initialValue = parsedData;
        }
      }
    } catch (error) {
      console.error("Failed to load from localStorage:", error);
    }
    setPlayers(initialValue);
  }, []);

  useEffect(() => {
    if (players.length > 0) {
      try {
        window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(players));
      } catch (error) {
        console.error("Failed to save to localStorage:", error);
      }
    }
  }, [players]);

  const updatePlayerStatus = useCallback((playerId: number, status: PlayerStatus) => {
    setPlayers(prevPlayers =>
      prevPlayers.map(p => {
        if (p.id === playerId) {
          const newPosition = status === PlayerStatus.CONFIRMED ? (p.position || { x: 50, y: 50 }) : null;
          const newTeam = status !== PlayerStatus.CONFIRMED ? null : p.team;
          return { ...p, status, position: newPosition, team: newTeam };
        }
        return p;
      })
    );
  }, []);

  const updatePlayerPosition = useCallback((playerId: number, position: Position) => {
    setPlayers(prevPlayers =>
      prevPlayers.map(p =>
        p.id === playerId ? { ...p, position } : p
      )
    );
  }, []);
  
  const addPlayer = useCallback((name: string) => {
    setPlayers(prevPlayers => {
        const newPlayer: Player = {
            id: Date.now(),
            name,
            status: PlayerStatus.UNCONFIRMED,
            position: null,
            team: null,
            ranking: {
                pontuacaoTotal: 0,
            },
        };
        return [...prevPlayers, newPlayer];
    });
  }, []);

  const removePlayer = useCallback((playerId: number) => {
    if (window.confirm("Tem certeza que deseja remover este jogador da lista?")) {
        setPlayers(prevPlayers => prevPlayers.filter(p => p.id !== playerId));
    }
  }, []);

  const updatePlayerName = useCallback((playerId: number, newName: string) => {
    setPlayers(prevPlayers => prevPlayers.map(p =>
        p.id === playerId ? { ...p, name: newName } : p
    ));
  }, []);

  const setPlayerAsCoach = useCallback((playerId: number) => {
    setPlayers(prevPlayers => prevPlayers.map(p => {
        if (p.id === playerId) {
            return { ...p, role: 'coach' };
        }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { role, ...playerWithoutRole } = p;
        return playerWithoutRole;
    }));
  }, []);

  const updatePlayerTeam = useCallback((playerId: number, team: 'BRANCO' | 'AZUL' | null) => {
    setPlayers(prevPlayers => {
        const teamBrancoCount = prevPlayers.filter(p => p.team === 'BRANCO' && p.id !== playerId).length;
        const teamAzulCount = prevPlayers.filter(p => p.team === 'AZUL' && p.id !== playerId).length;

        if (team === 'BRANCO' && teamBrancoCount >= 11) {
            alert('O Time Branco já está completo com 11 jogadores.');
            return prevPlayers;
        }
        if (team === 'AZUL' && teamAzulCount >= 11) {
            alert('O Time Azul já está completo com 11 jogadores.');
            return prevPlayers;
        }

        return prevPlayers.map(p => p.id === playerId ? { ...p, team } : p);
    });
  }, []);

  const updatePlayerRanking = useCallback((
    playerId: number,
    field: keyof Omit<Player['ranking'], 'pontuacaoTotal'>,
    value: string
  ) => {
    setPlayers(prevPlayers => {
        return prevPlayers.map(p => {
            if (p.id === playerId) {
                const newRanking = { ...p.ranking };

                if (field === 'observacoes' || field === 'posicao') {
                  const numValue = parseInt(value, 10);
                  if (field === 'observacoes') {
                     newRanking.observacoes = value;
                  } else {
                     newRanking.posicao = isNaN(numValue) ? undefined : numValue;
                  }
                } else {
                    const numValue = parseInt(value, 10);
                    // Ensure value is between 0 and 5, or undefined if empty/invalid
                    const cleanValue = isNaN(numValue) ? undefined : Math.max(0, Math.min(5, numValue));
                    // The type assertion is needed here because TS can't infer that 'field' is one of the numeric keys.
                    (newRanking as any)[field] = cleanValue;
                }
                
                const total = 
                    (newRanking.assiduidade ?? 0) +
                    (newRanking.espiritoDeEquipe ?? 0) +
                    (newRanking.resistencia ?? 0) +
                    (newRanking.tecnica ?? 0) +
                    (newRanking.fairPlay ?? 0) +
                    (newRanking.bomHumor ?? 0);
                
                newRanking.pontuacaoTotal = total;

                return { ...p, ranking: newRanking };
            }
            return p;
        });
    });
  }, []);


  const clearField = useCallback(() => {
    setPlayers(prevPlayers => {
      const allPlayers = [...prevPlayers];
      const lastConfirmedIndex = allPlayers.map(p => p.status).lastIndexOf(PlayerStatus.CONFIRMED);
      
      if (lastConfirmedIndex === -1) {
        return prevPlayers;
      }
      
      const playerToUpdate = allPlayers[lastConfirmedIndex];
      allPlayers[lastConfirmedIndex] = {
        ...playerToUpdate,
        status: PlayerStatus.UNCONFIRMED,
        position: null,
        team: null,
      };
      
      return allPlayers;
    });
  }, []);

  const resetMatch = useCallback(() => {
    if (window.confirm("Isso irá limpar todas as confirmações e posições do campo. A lista de jogadores será mantida. Deseja continuar?")) {
      setPlayers(prevPlayers =>
        prevPlayers.map(p => ({
          ...p,
          status: PlayerStatus.UNCONFIRMED,
          position: null,
          team: null,
        }))
      );
    }
  }, []);

  return { players, updatePlayerStatus, updatePlayerPosition, clearField, resetMatch, addPlayer, removePlayer, updatePlayerName, setPlayerAsCoach, updatePlayerTeam, updatePlayerRanking };
};
