// Code generated by protoc-gen-ts_proto. DO NOT EDIT.
// versions:
//   protoc-gen-ts_proto  v2.0.2
//   protoc               v5.28.1
// source: game/PlayCard.proto

/* eslint-disable */
import { BinaryReader, BinaryWriter } from "@bufbuild/protobuf/wire";
import { Card } from "./Card";
import { Player } from "./Player";

export const protobufPackage = "space.junodev.model.game";

export interface PlayCard {
  player: Player | undefined;
  card: Card | undefined;
}

function createBasePlayCard(): PlayCard {
  return { player: undefined, card: undefined };
}

export const PlayCard = {
  encode(message: PlayCard, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
    if (message.player !== undefined) {
      Player.encode(message.player, writer.uint32(10).fork()).join();
    }
    if (message.card !== undefined) {
      Card.encode(message.card, writer.uint32(18).fork()).join();
    }
    return writer;
  },

  decode(input: BinaryReader | Uint8Array, length?: number): PlayCard {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePlayCard();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.player = Player.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.card = Card.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): PlayCard {
    return {
      player: isSet(object.player) ? Player.fromJSON(object.player) : undefined,
      card: isSet(object.card) ? Card.fromJSON(object.card) : undefined,
    };
  },

  toJSON(message: PlayCard): unknown {
    const obj: any = {};
    if (message.player !== undefined) {
      obj.player = Player.toJSON(message.player);
    }
    if (message.card !== undefined) {
      obj.card = Card.toJSON(message.card);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<PlayCard>, I>>(base?: I): PlayCard {
    return PlayCard.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<PlayCard>, I>>(object: I): PlayCard {
    const message = createBasePlayCard();
    message.player = (object.player !== undefined && object.player !== null)
      ? Player.fromPartial(object.player)
      : undefined;
    message.card = (object.card !== undefined && object.card !== null) ? Card.fromPartial(object.card) : undefined;
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
