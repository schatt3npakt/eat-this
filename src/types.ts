export enum Flavors {
  "CHOCOLATE",
  "STRAWBERRY",
  "VANILLA",
  "BLUEBERRY",
}

export enum Durability {
  "DEAD",
  "DYING",
  "HALF",
  "FULL",
}

export type Customer = {
  order: Array<Flavors>;
  sprite: number;
};

export type Scoop = {
  durability: Durability;
  flavor: Flavors;
};