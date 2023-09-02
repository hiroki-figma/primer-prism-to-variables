import { on, once, showUI } from "@create-figma-plugin/utilities";

import { importDataType, CloseHandler, CreateVariablesHandler } from "./types";

export default function () {
  on<CreateVariablesHandler>(
    "CREATE_VARIABLES",
    function (data: importDataType) {
      if (data.value !== "") {
        const colors = JSON.parse(data.value);
        const newCollectionName = data.name;
        const step = Number(data.step);

        const localCollectionsNames = figma.variables
          .getLocalVariableCollections()
          .map((collection) => collection.name);

        if (!localCollectionsNames.includes(newCollectionName)) {
          const collection =
            figma.variables.createVariableCollection(newCollectionName);
          const modeId = collection.modes[0].modeId;

          for (const colorGroup in colors) {
            if (Array.isArray(colors[colorGroup])) {
              for (let i = 0; i < colors[colorGroup].length; i++) {
                const key = `${colorGroup}/${(i + 1) * step}`;
                const colorVariable = figma.variables.createVariable(
                  key,
                  collection.id,
                  "COLOR"
                );

                colorVariable.name = key;
                colorVariable.setValueForMode(
                  modeId,
                  figma.util.rgba(colors[colorGroup][i])
                );
              }
            } else {
              const colorVariable = figma.variables.createVariable(
                colorGroup,
                collection.id,
                "COLOR"
              );

              colorVariable.setValueForMode(
                modeId,
                figma.util.rgba(colors[colorGroup])
              );
            }
          }
          figma.closePlugin("Create new collection");
        } else {
          figma.notify("⚠️ Exist same name collection");
        }
      } else {
        figma.notify("⚠️ Set Primer Prism JSON");
      }
    }
  );

  once<CloseHandler>("CLOSE", function () {
    figma.closePlugin();
  });
  showUI({
    height: 476,
    width: 480,
  });
}
