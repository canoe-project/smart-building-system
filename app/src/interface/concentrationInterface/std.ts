// concentration

export type Measurement = 'co2' | 'humidity' | 'light' | 'pir' | 'temperature';

export interface Iconcentration {
  good: number;
  average: number;
  bad: number;
  veryBad: number;
}

export interface Iconcentrations extends Iconcentration {
  [key: string]: number;
}
