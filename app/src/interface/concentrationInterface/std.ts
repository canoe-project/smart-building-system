// concentration

export type Measurement = 'co2' | 'humidity' | 'light' | 'pir' | 'temperature';

export interface Iconcentration {
  good: number;
  average: number;
  bad: number;
  veryBad: number;
}

export interface IAirContent {
  nameEN: string;
  nameKR: string;
  description: string;
  unit: string;
}

export interface IAirContents extends IAirContent {
  [key: string]: string;
}

export interface Iconcentrations extends Iconcentration {
  [key: string]: number;
}
