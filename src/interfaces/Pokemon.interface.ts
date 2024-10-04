export interface PokemonType {
    type: {
      name: string;
    };
}

export interface PokemonEvolution {
    name: string;
    imageUrl: string;
}
export interface PokemonEvolution {
    name: string; 
    value: number;
}

export interface PokemonStats {
    hp: number;
    attack: number;
    defense: number;
}

export interface Pokemon {
    id: number;
    name: string;
    image: string;
    height: string;
    weight: string;
    types: PokemonType[];
    evolutions: PokemonEvolution[];
}