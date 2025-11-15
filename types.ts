export enum PlayerStatus {
  UNCONFIRMED = 'UNCONFIRMED',
  CONFIRMED = 'CONFIRMED',
  MAYBE = 'MAYBE',
  DECLINED = 'DECLINED',
}

export interface Position {
  x: number;
  y: number;
}

export interface Player {
  id: number;
  name: string;
  status: PlayerStatus;
  position: Position | null;
  role?: 'coach';
  team?: 'BRANCO' | 'AZUL' | null;
  ranking: {
    posicao?: number;
    assiduidade?: number;
    espiritoDeEquipe?: number;
    resistencia?: number;
    tecnica?: number;
    fairPlay?: number;
    bomHumor?: number;
    observacoes?: string;
    pontuacaoTotal: number;
  };
}
