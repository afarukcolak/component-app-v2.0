export interface BaseComponent {
  id: string; // User-facing ID, e.g., "R-1"
  uid: string; // Internal unique ID for React keys
  value: string;
  taken: boolean;
}

export interface Resistor extends BaseComponent {
  type: 'resistor';
}

export interface Capacitor extends BaseComponent {
  type: 'capacitor';
}

export type Component = Resistor | Capacitor;
