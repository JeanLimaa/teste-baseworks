export const getImageUrl = (pokemonId: string | number): string => {
    const baseURL = "https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full"
    const imageUrl = `${baseURL}/${pokemonId.toString().padStart(3, '0')}.png`;
    return imageUrl;
}