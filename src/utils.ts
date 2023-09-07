import { prismColorType } from "./types";

export function isValidJSON(jsonString: string): boolean {
  try {
    JSON.parse(jsonString);
    return true;
  } catch (error) {
    return false;
  }
}

export function isPrismColorObject(obj: any): obj is prismColorType {
  if (typeof obj !== "object" || obj === null) {
    return false;
  }

  for (const colorName in obj) {
    const colorValue = obj[colorName];

    if (!Array.isArray(colorValue) && typeof colorValue !== "string") {
      return false;
    }

    if (Array.isArray(colorValue)) {
      for (const color of colorValue) {
        if (
          typeof color !== "string" ||
          !/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(color)
        ) {
          return false;
        }
      }
    } else {
      if (
        typeof colorValue !== "string" ||
        !/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(colorValue)
      ) {
        return false;
      }
    }
  }

  return true;
}
