// Code generated by protoc-gen-ts_proto. DO NOT EDIT.
// versions:
//   protoc-gen-ts_proto  v2.0.2
//   protoc               v5.28.1
// source: game/Game.proto

/* eslint-disable */
import { BinaryReader, BinaryWriter } from "@bufbuild/protobuf/wire";
import { Board } from "./Board";
import { GameEvent } from "./GameEvent";
import { GameStatus, gameStatusFromJSON, gameStatusToJSON } from "./GameStatus";
import { Player } from "./Player";

export const protobufPackage = "space.junodev.model.game";

export interface Game {
  id: string;
  gameStatus: GameStatus;
  currentPlayer: number;
  winner: number;
  board: Board | undefined;
  players: Player[];
  events: GameEvent[];
}

function createBaseGame(): Game {
  return { id: "", gameStatus: 0, currentPlayer: 0, winner: 0, board: undefined, players: [], events: [] };
}

export const Game = {
  encode(message: Game, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.gameStatus !== 0) {
      writer.uint32(16).int32(message.gameStatus);
    }
    if (message.currentPlayer !== 0) {
      writer.uint32(24).int32(message.currentPlayer);
    }
    if (message.winner !== 0) {
      writer.uint32(32).int32(message.winner);
    }
    if (message.board !== undefined) {
      Board.encode(message.board, writer.uint32(42).fork()).join();
    }
    for (const v of message.players) {
      Player.encode(v!, writer.uint32(50).fork()).join();
    }
    for (const v of message.events) {
      GameEvent.encode(v!, writer.uint32(58).fork()).join();
    }
    return writer;
  },

  decode(input: BinaryReader | Uint8Array, length?: number): Game {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGame();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.id = reader.string();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.gameStatus = reader.int32() as any;
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.currentPlayer = reader.int32();
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.winner = reader.int32();
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.board = Board.decode(reader, reader.uint32());
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.players.push(Player.decode(reader, reader.uint32()));
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.events.push(GameEvent.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Game {
    return {
      id: isSet(object.id) ? globalThis.String(object.id) : "",
      gameStatus: isSet(object.gameStatus) ? gameStatusFromJSON(object.gameStatus) : 0,
      currentPlayer: isSet(object.currentPlayer) ? globalThis.Number(object.currentPlayer) : 0,
      winner: isSet(object.winner) ? globalThis.Number(object.winner) : 0,
      board: isSet(object.board) ? Board.fromJSON(object.board) : undefined,
      players: globalThis.Array.isArray(object?.players) ? object.players.map((e: any) => Player.fromJSON(e)) : [],
      events: globalThis.Array.isArray(object?.events) ? object.events.map((e: any) => GameEvent.fromJSON(e)) : [],
    };
  },

  toJSON(message: Game): unknown {
    const obj: any = {};
    if (message.id !== "") {
      obj.id = message.id;
    }
    if (message.gameStatus !== 0) {
      obj.gameStatus = gameStatusToJSON(message.gameStatus);
    }
    if (message.currentPlayer !== 0) {
      obj.currentPlayer = Math.round(message.currentPlayer);
    }
    if (message.winner !== 0) {
      obj.winner = Math.round(message.winner);
    }
    if (message.board !== undefined) {
      obj.board = Board.toJSON(message.board);
    }
    if (message.players?.length) {
      obj.players = message.players.map((e) => Player.toJSON(e));
    }
    if (message.events?.length) {
      obj.events = message.events.map((e) => GameEvent.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Game>, I>>(base?: I): Game {
    return Game.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Game>, I>>(object: I): Game {
    const message = createBaseGame();
    message.id = object.id ?? "";
    message.gameStatus = object.gameStatus ?? 0;
    message.currentPlayer = object.currentPlayer ?? 0;
    message.winner = object.winner ?? 0;
    message.board = (object.board !== undefined && object.board !== null) ? Board.fromPartial(object.board) : undefined;
    message.players = object.players?.map((e) => Player.fromPartial(e)) || [];
    message.events = object.events?.map((e) => GameEvent.fromPartial(e)) || [];
    return message;
  },
};

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

export type DeepPartial<T> = T extends Builtin ? T
  : T extends globalThis.Array<infer U> ? globalThis.Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends {} ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & { [K in Exclude<keyof I, KeysOfUnion<P>>]: never };

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
