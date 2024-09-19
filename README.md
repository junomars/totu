
# Tyrants of the Underdark: Juno Edition

A webapp version of the popular deck-building game *Tyrants of the Underdark*, this passion project aims 
to provide a multiplayer experience for fans of strategic card games.

## Project Structure
- **Client**: The frontend (`totuClient`) built with Vue.js provides the game's user interface.
- **Server**: The backend (`totuServer`) is powered by Java and handles game logic, user interactions, 
and multiplayer connections.
- **Model**: Shared data models in `totuModel`, built with TypeScript and `ts-proto` for 
client-server communication.

## Features
- Map has been created using d3 and custom vue nodes
- Lobby has loosely been created with map selection. Map selection allows for the number of players and
map side to be chosen.

## Features in Development
- **Multiplayer Functionality**: Enabling multiplayer support for online gameplay.
  - Lobby
  - Room Creation
  - Room Management
  - Game rules

## License
This project is licensed under the MIT License.
