import { Player, PlayerStatus } from './types';

export const INITIAL_PLAYERS: Player[] = [
  { id: 1, name: 'Sr Rui', status: PlayerStatus.UNCONFIRMED, position: null, ranking: { posicao: 3, assiduidade: 5, espiritoDeEquipe: 4, resistencia: 4, tecnica: 3, fairPlay: 4, bomHumor: 4, pontuacaoTotal: 24 } },
  { id: 2, name: 'Sr Arthur', status: PlayerStatus.UNCONFIRMED, position: null, ranking: { posicao: 2, assiduidade: 3, espiritoDeEquipe: 4, resistencia: 3, tecnica: 4, fairPlay: 3, bomHumor: 4, pontuacaoTotal: 21 } },
  { id: 3, name: 'Toninho', status: PlayerStatus.UNCONFIRMED, position: null, ranking: { posicao: 8, assiduidade: 1, espiritoDeEquipe: 3, resistencia: 3, tecnica: 3, fairPlay: 3, bomHumor: 3, observacoes: 'Liberado pelo Condominio', pontuacaoTotal: 16 } },
  { id: 4, name: 'Badeco', status: PlayerStatus.UNCONFIRMED, position: null, ranking: { posicao: 5, assiduidade: 2, espiritoDeEquipe: 3, resistencia: 4, tecnica: 4, fairPlay: 5, bomHumor: 4, pontuacaoTotal: 22 } },
  { id: 5, name: 'Valdir', status: PlayerStatus.UNCONFIRMED, position: null, ranking: { pontuacaoTotal: 0, observacoes: 'Saci moderno' } },
  { id: 6, name: 'Junior', status: PlayerStatus.UNCONFIRMED, position: null, ranking: { pontuacaoTotal: 0, observacoes: 'anda depressivo e chorando' } },
  { id: 7, name: 'Rodrigo', status: PlayerStatus.UNCONFIRMED, position: null, ranking: { pontuacaoTotal: 0 } },
  { id: 8, name: 'Valter', status: PlayerStatus.UNCONFIRMED, position: null, ranking: { pontuacaoTotal: 0 } },
  { id: 9, name: 'Maurão', status: PlayerStatus.UNCONFIRMED, position: null, ranking: { pontuacaoTotal: 0 } },
  { id: 10, name: 'Jadir do posto', status: PlayerStatus.UNCONFIRMED, position: null, ranking: { pontuacaoTotal: 0 } },
  { id: 11, name: 'Marcio', status: PlayerStatus.UNCONFIRMED, position: null, ranking: { pontuacaoTotal: 0 } },
  { id: 12, name: 'Alencar', status: PlayerStatus.UNCONFIRMED, position: null, ranking: { pontuacaoTotal: 0, observacoes: 'exemplo a ser seguido' } },
  { id: 13, name: 'Sr. Julio', status: PlayerStatus.UNCONFIRMED, position: null, ranking: { pontuacaoTotal: 0, observacoes: 'não sabe se vai ou se vem' } },
  { id: 14, name: 'Giba', status: PlayerStatus.UNCONFIRMED, position: null, ranking: { pontuacaoTotal: 0, observacoes: 'guerreiro' } },
  { id: 15, name: 'Wanderley', status: PlayerStatus.UNCONFIRMED, position: null, ranking: { pontuacaoTotal: 0, observacoes: 'trem sem freio' } },
  { id: 16, name: 'Erivelton', status: PlayerStatus.UNCONFIRMED, position: null, ranking: { pontuacaoTotal: 0 } },
  { id: 17, name: 'Vavazão', status: PlayerStatus.UNCONFIRMED, position: null, ranking: { pontuacaoTotal: 0 } },
  { id: 18, name: 'Fabio', status: PlayerStatus.UNCONFIRMED, position: null, ranking: { pontuacaoTotal: 0, observacoes: 'desprovido de cabelo' } },
  { id: 19, name: 'Deno', status: PlayerStatus.UNCONFIRMED, position: null, ranking: { pontuacaoTotal: 0, observacoes: 'nem fod...' } },
  { id: 20, name: 'Chacrinha', status: PlayerStatus.UNCONFIRMED, position: null, ranking: { pontuacaoTotal: 0 } },
  { id: 21, name: 'Pedrão', status: PlayerStatus.UNCONFIRMED, position: null, ranking: { pontuacaoTotal: 0, observacoes: 'tutor do Bahia' } },
  { id: 22, name: 'Didi', status: PlayerStatus.UNCONFIRMED, position: null, ranking: { pontuacaoTotal: 0 } },
  { id: 23, name: 'Bahia', status: PlayerStatus.UNCONFIRMED, position: null, ranking: { pontuacaoTotal: 0, observacoes: 'Mumm-Rá' } },
];

export const WHATSAPP_MESSAGE = `⚽ Partida dos Boleiros — Domingo, 8h no Campo Verde

Confirme sua presença clicando aqui 👉 ${window.location.href}

Vamos montar o time! 💪`;
