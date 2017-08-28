declare module 'uuid/v4' {
  export type OutputBuffer = ArrayLike<number> | Buffer;
  export type V4Options = {random: number[]} | {rng(): number[]};
  export type v4String = (options?: V4Options) => string;
  export type v4Buffer = <T extends OutputBuffer>(
    options: V4Options | null | undefined,
    buffer: T,
    offset?: number,
  ) => T;
  export type v4 = v4String & v4Buffer;
  const v4: v4;
  export default v4;
}
