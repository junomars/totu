import axios from "axios";
import {GameMessageType} from "@/generated/message/GameMessageType";
import {GameMessage} from "@/generated/message/GameMessage";
import {CreateGamePayload} from "@/generated/message/payloads/CreateGamePayload";
import {GameCreatedPayload} from "@/generated/message/payloads/GameCreatedPayload";
import {Game} from "@/generated/game/Game";
import {PlayerSession} from "@/generated/PlayerSession";
import {ENVIRONMENT} from "@/config/constants";

export default class GameService {
  private socket: WebSocket | null = null;

  connectWebSocket(gameId: string) {
    this.socket = new WebSocket(`ws://${ENVIRONMENT.host}/game/${gameId}`);

    this.socket.onopen = () => {
      console.log("WebSocket connection opened");
    };

    this.socket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      this.handleMessage(message);
    };

    this.socket.onclose = () => {
      console.log("WebSocket connection closed, reconnecting...");
      setTimeout(() => this.connectWebSocket(gameId), 5000);
    };

    this.socket.onerror = (error) => {
      console.error("WebSocket error:", error);
    };
  }

  async createGame(createGameMessagePayload: CreateGamePayload) {
    try {
      const response = await fetch(`https://${ENVIRONMENT.host}/game`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          type: GameMessageType.CREATE_GAME,
          payload: createGameMessagePayload
        })
      });

      if (!response.ok) {
        throw new Error(`Server responded with status ${response.status}`);
      }

      const playerSession: PlayerSession = await response.json();
      sessionStorage.setItem("playerSession", JSON.stringify(playerSession));

      // Connect to the websocket
      this.connectWebSocket(playerSession.gameId);

      if (this.socket && this.socket.readyState === WebSocket.OPEN) {
        const message = {
          type: "JOIN_GAME",
          payload: createGameMessagePayload,
        };
        this.socket.send(JSON.stringify(message));
      } else {
        console.error("WebSocket connection is not open");
      }
    } catch (error) {
      console.error("Error creating game:", error);
    }
  }

  async fetchCurrentGames(): Promise<Game[]> {
    try {
      const response = await axios.get<Game[]>(`https://${ENVIRONMENT.host}/games`);
      // Fetched games
      return response.data;
    } catch (error) {
      console.error("Error fetching games:", error);
      throw error;
    }
  }

  handleMessage(message: any) {
    switch (message.type) {
      case "GAME_CREATED":
        console.log("Game created:", message.payload);
        break;
      case "ERROR":
        console.error("Error:", message.payload);
        break;
      default:
        console.warn("Unhandled message type:", message.type);
    }
  }
}
