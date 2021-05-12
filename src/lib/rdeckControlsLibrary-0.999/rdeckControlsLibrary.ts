import type { RDeckLayer, RDeckWidget} from "../../@types/rdeck";

// ----- interfaces
export interface RDeckLayerControlProperties {
  targetRdeckId: string;
  layerNames: string[];
  layerGroupNames: string[];
  initialSelection: string | string[];
}

export interface LayerOptionElement extends HTMLOptionElement {
  nameType: "name" | "groupName";
}

// ----- control renderers
export function rdeckLayerDropdown({
  targetRdeckId,
  layerNames,
  layerGroupNames,
  initialSelection,
}: RDeckLayerControlProperties): HTMLElement {
  if (Array.isArray(initialSelection)) {
    throw (Error("rdeckControls dropdown layer control cannot take an array of layer or group names."));
  }

  const controlLayers: RDeckLayer[] = layerNames.
    map((x) => ({ name: x, visible: false } as RDeckLayer)).
    concat(
      layerGroupNames.map((x) => ({ groupName: x, visible: false } as RDeckLayer))
      );
  const allNames = layerNames.concat(layerGroupNames);
  const initialSelectionInd = firstIndexOfString(allNames, initialSelection);
  const orderedControlLayers = moveLayerToHead(
    controlLayers,
    initialSelectionInd
  );
  orderedControlLayers[1].visible = true;
  const selectNode = document.createElement("select");
  const selectionOptions = orderedControlLayers.map((x: RDeckLayer) => {
    const layerOptionElem = document.createElement(
      "option"
    ) as LayerOptionElement;
    if ("groupName" in x) {
      layerOptionElem.value = x.groupName;
      layerOptionElem.innerText = x.groupName;
      layerOptionElem.nameType = "groupName";
    } else {
      layerOptionElem.value = x.name;
      layerOptionElem.innerText = x.name;
      layerOptionElem.nameType = "name";
    }
    return layerOptionElem;
  });
  selectNode.append(...selectionOptions);
  selectNode.id = `${targetRdeckId}_layerDropdownControl`;
  selectNode.onselectionchange = onSelectionChangeFactory(
    selectNode.id,
    targetRdeckId
  );
  return selectNode;
}

// ----- utils
function onSelectionChangeFactory(
  controlId: string,
  targetId: string
): () => void {
  return () => {
    const selectElement = document.getElementById(
      controlId
    ) as HTMLSelectElement | null;
    if (selectElement === null) {
      throw Error(
        `rdeckControls couldn't find the control elment by Id: ${controlId}`
      );
    }
    const selectionValue = selectElement.value;
    const selectChildLayerOptions = Array.from(selectElement.children).filter(
      (x) => x.tagName.toUpperCase() === "OPTION"
    ) as LayerOptionElement[];

    const rdeckLayers = selectChildLayerOptions.map((x) => {
      const layer = {} as any;
      layer.visible = x.value === selectionValue;
      if (x.nameType === "groupName") {
        layer.groupName = x.value;
      } else {
        layer.name = x.value;
      }
      return layer as RDeckLayer;
    });

    const rdeckInstance = rdeck.getWidgetById(targetId) as RDeckWidget | null;
    if (rdeckInstance === null) {
      throw Error(
        `rdeckControls couldn't find the rdeck instance by Id: ${targetId}`
      );
    }
    rdeckInstance.setLayerVisibility(rdeckLayers);
  };
}

function firstIndexOfString(arr: string[], target: string): number {
  return arr.length - (arr.reverse().lastIndexOf(target) + 1);
}

function moveLayerToHead(layers: RDeckLayer[], index: number): RDeckLayer[] {
  const headLayer = layers[index];
  return [headLayer].concat(layers.filter((layer, i) => i !== index));
}
