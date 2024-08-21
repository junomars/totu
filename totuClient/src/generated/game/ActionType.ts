// Code generated by protoc-gen-ts_proto. DO NOT EDIT.
// versions:
//   protoc-gen-ts_proto  v2.0.2
//   protoc               v3.21.7
// source: game/ActionType.proto

/* eslint-disable */

export const protobufPackage = "space.junodev.model.game";

export enum ActionType {
  JOINED_GAME = 0,
  LEFT_GAME = 1,
  STARTED_GAME = 2,
  PLAY_CARD = 3,
  UNRECOGNIZED = -1,
}

export function actionTypeFromJSON(object: any): ActionType {
  switch (object) {
    case 0:
    case "JOINED_GAME":
      return ActionType.JOINED_GAME;
    case 1:
    case "LEFT_GAME":
      return ActionType.LEFT_GAME;
    case 2:
    case "STARTED_GAME":
      return ActionType.STARTED_GAME;
    case 3:
    case "PLAY_CARD":
      return ActionType.PLAY_CARD;
    case -1:
    case "UNRECOGNIZED":
    default:
      return ActionType.UNRECOGNIZED;
  }
}

export function actionTypeToJSON(object: ActionType): string {
  switch (object) {
    case ActionType.JOINED_GAME:
      return "JOINED_GAME";
    case ActionType.LEFT_GAME:
      return "LEFT_GAME";
    case ActionType.STARTED_GAME:
      return "STARTED_GAME";
    case ActionType.PLAY_CARD:
      return "PLAY_CARD";
    case ActionType.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}
