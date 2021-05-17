import type { RDeckLayer, RDeckWidget } from "../../@types/rdeck";

// ----- interfaces
export interface RDeckLayerControlProperties {
  targetRDeckId: string;
  layerNames: string[];
  layerGroupNames: string[];
  initialSelection: string | string[];
  label: string;
}

export interface LayerOptionElement extends HTMLOptionElement {
  nameType: "name" | "groupName";
}

// ----- control renderers
export function rdeckLayerDropdown({
  targetRDeckId,
  layerNames,
  layerGroupNames,
  initialSelection,
}: RDeckLayerControlProperties): HTMLElement {
  if (Array.isArray(initialSelection)) {
    console.log(
      "rdeckControls dropdown layer control cannot take an array of layer or group names."
    );
    throw Error("rdeckcontrols error");
  }

  const controlLayers: RDeckLayer[] = layerNames
    .map((x) => ({ name: x, groupName: null, visible: false } as RDeckLayer))
    .concat(
      layerGroupNames.map(
        (x) => ({ groupName: x, visible: false } as RDeckLayer)
      )
    );
  const allNames = layerNames.concat(layerGroupNames);
  const initialSelectionInd = firstIndexOfString(allNames, initialSelection);
  const orderedControlLayers = moveLayerToHead(
    controlLayers,
    initialSelectionInd
  );
  orderedControlLayers[0].visible = true;
  const selectNode = document.createElement("select");
  const selectionOptions = orderedControlLayers.map((x: RDeckLayer) => {
    const layerOptionElem = document.createElement(
      "option"
    ) as LayerOptionElement;
    if (x.groupName !== null) {
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
  selectNode.id = `${targetRDeckId}_layerDropdownControl`;
  selectNode.addEventListener(
    "change",
    onSelectionChangeFactory(selectNode.id, targetRDeckId)
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
      console.log(
        `rdeckControls couldn't find the control element by Id: ${controlId}`
      );
      throw Error("rdeckcontrols error");
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
        layer.groupName = null;
      }
      return layer as RDeckLayer;
    });

    const rdeckInstance = rdeck.getWidgetById(targetId) as RDeckWidget | null;
    if (rdeckInstance === null) {
      console.log(
        `rdeckControls couldn't find the rdeck instance by Id: ${targetId}`
      );
      throw Error("rdeckcontrols error");
    }
    rdeckInstance.setLayerVisibility(rdeckLayers);
  };
}

function firstIndexOfString(arr: string[], target: string): number {
  return arr.length - (arr.reverse().lastIndexOf(target) + 1);
}

function moveLayerToHead(layers: RDeckLayer[], index: number): RDeckLayer[] {
  if (index > layers.length) {
    throw Error(
      "rdeckcontrols got an initial selection index greater than number of layers. R/JS index issue?"
    );
  }
  const headLayer = layers[index];
  return [headLayer].concat(layers.filter((layer, i) => i !== index));
}

function isStringArray(arr: any): arr is Array<string> {
  return (
    Array.isArray(arr) &&
    (arr.length === 0 ||
      arr.map((x) => typeof x === "string").reduce((x, y) => x && y))
  );
}

export function isRDeckLayerControlProperties(
  controlProperties: any
): controlProperties is RDeckLayerControlProperties {
  return (
    typeof controlProperties === "object" &&
    "targetRDeckId" in controlProperties &&
    "layerNames" in controlProperties &&
    "layerGroupNames" in controlProperties &&
    "initialSelection" in controlProperties &&
    "label" in controlProperties &&
    typeof controlProperties.targetRDeckId === "string" &&
    isStringArray(controlProperties.layerNames) &&
    isStringArray(controlProperties.layerGroupNames) &&
    (typeof controlProperties.initialSelection === "string" ||
      isStringArray(controlProperties.initialSelection)) &&
    typeof controlProperties.label === "string" 
  );
}
