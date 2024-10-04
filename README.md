# Desafio Baseworks

Desafio técnico de front-end da Baseworks.

## Índice

- [Instalação](#instalação)
- [Funcionalidades](#funcionalidades)
- [Decisões Técnicas](#decisões-técnicas)
- [Funcionalidades Adicionais](#funcionalidades-adicionais)

## Instalação

Para instalar as dependências e executar a aplicação, siga os passos abaixo:

1. **Clone o repositório**:
    ```
    git clone https://github.com/JeanLimaa/teste-baseworks.git
    cd nome-do-projeto
    ```

2. **Instale as dependências**:
    ```
    npm install
    ```

3. **Inicie a aplicação**:
    ```
    npm run dev
    ```

4. **Acesse a aplicação**:
   Abra o navegador e acesse `http://localhost:5173`.

## Funcionalidades

- **Listagem de Pokémon**: Visualização de uma lista de Pokémon com imagens e informações básicas.
- **Filtro de Pokémon**: Filtragem da lista de Pokémon por nome ou ID.
- **Carregamento de mais Pokémon**: Carregamento incremental de Pokémon ao clicar no botão "Carregar mais".
- **Navegação para detalhes**: Redirecionamento para uma página de detalhes de cada Pokémon ao clicar na imagem ou nome.

## Decisões Técnicas

- **Framework**: Utilizei o Vue.js para construir a interface do usuário devido à sua flexibilidade e facilidade de uso na construção de aplicações reativas.
- **Gerenciamento de Estado**: Para gerenciar o estado da aplicação, utilizei o Pinia, que oferece uma API simples e poderosa para lidar com o estado global.
- **API de Pokémon**: A aplicação faz chamadas para uma API externa para buscar informações sobre Pokémon. A estratégia de paginar os resultados melhora a performance e a experiência do usuário.
- **Estilo**: O design responsivo foi implementado utilizando CSS Grid e Flexbox, garantindo que a interface se adapte a diferentes tamanhos de tela.