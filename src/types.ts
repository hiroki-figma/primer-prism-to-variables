import { EventHandler } from "@create-figma-plugin/utilities";

export type importDataType = {
  name: string;
  step: string;
  value: string;
};

export type prismColorType = {
  [colorName: string]: string[] | string;
};

export interface CreateVariablesHandler extends EventHandler {
  name: "CREATE_VARIABLES";
  handler: (data: importDataType) => void;
}

export interface CloseHandler extends EventHandler {
  name: "CLOSE";
  handler: () => void;
}
