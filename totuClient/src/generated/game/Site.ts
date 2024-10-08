// Code generated by protoc-gen-ts_proto. DO NOT EDIT.
// versions:
//   protoc-gen-ts_proto  v2.0.2
//   protoc               v5.28.1
// source: game/Site.proto

/* eslint-disable */
import { BinaryReader, BinaryWriter } from "@bufbuild/protobuf/wire";
import { TroopSpace } from "./TroopSpace";

export const protobufPackage = "space.junodev.model.game";

export interface Site {
  name: string;
  value: number;
  spaces: TroopSpace[];
  hasMarker: boolean;
  isStartingNode: boolean;
  alignment: string;
}

function createBaseSite(): Site {
  return { name: "", value: 0, spaces: [], hasMarker: false, isStartingNode: false, alignment: "" };
}

export const Site = {
  encode(message: Site, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
    if (message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    if (message.value !== 0) {
      writer.uint32(16).int32(message.value);
    }
    for (const v of message.spaces) {
      TroopSpace.encode(v!, writer.uint32(26).fork()).join();
    }
    if (message.hasMarker !== false) {
      writer.uint32(32).bool(message.hasMarker);
    }
    if (message.isStartingNode !== false) {
      writer.uint32(40).bool(message.isStartingNode);
    }
    if (message.alignment !== "") {
      writer.uint32(50).string(message.alignment);
    }
    return writer;
  },

  decode(input: BinaryReader | Uint8Array, length?: number): Site {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSite();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.name = reader.string();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.value = reader.int32();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.spaces.push(TroopSpace.decode(reader, reader.uint32()));
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.hasMarker = reader.bool();
          continue;
        case 5:
          if (tag !== 40) {
            break;
          }

          message.isStartingNode = reader.bool();
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.alignment = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Site {
    return {
      name: isSet(object.name) ? globalThis.String(object.name) : "",
      value: isSet(object.value) ? globalThis.Number(object.value) : 0,
      spaces: globalThis.Array.isArray(object?.spaces) ? object.spaces.map((e: any) => TroopSpace.fromJSON(e)) : [],
      hasMarker: isSet(object.hasMarker) ? globalThis.Boolean(object.hasMarker) : false,
      isStartingNode: isSet(object.isStartingNode) ? globalThis.Boolean(object.isStartingNode) : false,
      alignment: isSet(object.alignment) ? globalThis.String(object.alignment) : "",
    };
  },

  toJSON(message: Site): unknown {
    const obj: any = {};
    if (message.name !== "") {
      obj.name = message.name;
    }
    if (message.value !== 0) {
      obj.value = Math.round(message.value);
    }
    if (message.spaces?.length) {
      obj.spaces = message.spaces.map((e) => TroopSpace.toJSON(e));
    }
    if (message.hasMarker !== false) {
      obj.hasMarker = message.hasMarker;
    }
    if (message.isStartingNode !== false) {
      obj.isStartingNode = message.isStartingNode;
    }
    if (message.alignment !== "") {
      obj.alignment = message.alignment;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Site>, I>>(base?: I): Site {
    return Site.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Site>, I>>(object: I): Site {
    const message = createBaseSite();
    message.name = object.name ?? "";
    message.value = object.value ?? 0;
    message.spaces = object.spaces?.map((e) => TroopSpace.fromPartial(e)) || [];
    message.hasMarker = object.hasMarker ?? false;
    message.isStartingNode = object.isStartingNode ?? false;
    message.alignment = object.alignment ?? "";
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
