// Code generated by protoc-gen-ts_proto. DO NOT EDIT.
// versions:
//   protoc-gen-ts_proto  v2.0.2
//   protoc               v3.21.12
// source: message/GameMessageType.proto

/* eslint-disable */

export const protobufPackage = "space.junodev.model.message";

export enum GameMessageType {
  ERROR = 0,
  LOG = 1,
  CREATE_GAME = 2,
  GAME_CREATED = 3,
  GAME_UPDATED = 4,
  GAME_EVENT = 5,
  UNRECOGNIZED = -1,
}

export function gameMessageTypeFromJSON(object: any): GameMessageType {
  switch (object) {
    case 0:
    case "ERROR":
      return GameMessageType.ERROR;
    case 1:
    case "LOG":
      return GameMessageType.LOG;
    case 2:
    case "CREATE_GAME":
      return GameMessageType.CREATE_GAME;
    case 3:
    case "GAME_CREATED":
      return GameMessageType.GAME_CREATED;
    case 4:
    case "GAME_UPDATED":
      return GameMessageType.GAME_UPDATED;
    case 5:
    case "GAME_EVENT":
      return GameMessageType.GAME_EVENT;
    case -1:
    case "UNRECOGNIZED":
    default:
      return GameMessageType.UNRECOGNIZED;
  }
}

export function gameMessageTypeToJSON(object: GameMessageType): string {
  switch (object) {
    case GameMessageType.ERROR:
      return "ERROR";
    case GameMessageType.LOG:
      return "LOG";
    case GameMessageType.CREATE_GAME:
      return "CREATE_GAME";
    case GameMessageType.GAME_CREATED:
      return "GAME_CREATED";
    case GameMessageType.GAME_UPDATED:
      return "GAME_UPDATED";
    case GameMessageType.GAME_EVENT:
      return "GAME_EVENT";
    case GameMessageType.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}
