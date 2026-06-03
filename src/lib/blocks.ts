import type { PartialBlock } from "@blocknote/core";

export function asBlocks(content: unknown): PartialBlock[] | undefined {
  if (
    Array.isArray(content) &&
    content.length > 0 &&
    content.every((b) => b && typeof b === "object" && "id" in b)
  ) {
    return content as PartialBlock[];
  }
  return undefined;
}
