// Code generated by protoc-gen-ts_proto. DO NOT EDIT.
// versions:
//   protoc-gen-ts_proto  v2.0.2
//   protoc               v3.21.7
// source: game/GameEvent.proto

/* eslint-disable */
import { BinaryReader, BinaryWriter } from "@bufbuild/protobuf/wire";
import { GameAction } from "./GameAction";

export const protobufPackage = "space.junodev.model.game";

export interface GameEvent {
  playerId: string;
  gameAction: GameAction | undefined;
}

function createBaseGameEvent(): GameEvent {
  return { playerId: "", gameAction: undefined };
}

export const GameEvent = {
  encode(message: GameEvent, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
    if (message.playerId !== "") {
      writer.uint32(10).string(message.playerId);
    }
    if (message.gameAction !== undefined) {
      GameAction.encode(message.gameAction, writer.uint32(18).fork()).join();
    }
    return writer;
  },

  decode(input: BinaryReader | Uint8Array, length?: number): GameEvent {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGameEvent();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.playerId = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.gameAction = GameAction.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GameEvent {
    return {
      playerId: isSet(object.playerId) ? globalThis.String(object.playerId) : "",
      gameAction: isSet(object.gameAction) ? GameAction.fromJSON(object.gameAction) : undefined,
    };
  },

  toJSON(message: GameEvent): unknown {
    const obj: any = {};
    if (message.playerId !== "") {
      obj.playerId = message.playerId;
    }
    if (message.gameAction !== undefined) {
      obj.gameAction = GameAction.toJSON(message.gameAction);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GameEvent>, I>>(base?: I): GameEvent {
    return GameEvent.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GameEvent>, I>>(object: I): GameEvent {
    const message = createBaseGameEvent();
    message.playerId = object.playerId ?? "";
    message.gameAction = (object.gameAction !== undefined && object.gameAction !== null)
      ? GameAction.fromPartial(object.gameAction)
      : undefined;
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
