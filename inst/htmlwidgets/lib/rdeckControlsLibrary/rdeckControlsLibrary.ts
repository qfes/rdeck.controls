
interface RDeckLayerControlProperties {
    targetRdeckId: string[]
    layerNames: string[],
    layerGroupNames: string[],
    initialSelection: string | string[]
}

interface LayerOptionElement extends HTMLOptionElement {
    nameType: "name" | "groupName"
}

function rdeckLayerDropdown(
    {
        targetRdeckId,
        layerNames,
        layerGroupNames,
        initialSelection
    }: RDeckLayerControlProperties): HTMLElement {

    if (Array.isArray(initialSelection)) {
        throw ("rdeckControls dropdown layer control cannot take an array of layer or group names.")
    }

    const controlLayers: RDeckLayer[] =
        layerNames.
            map((x) => { return { name: x, visible: false } as RDeckLayer }).
            concat(
                layerGroupNames.
                    map((x) => { return { groupName: x, visible: false } as RDeckLayer })
            );
    const allNames = layerNames.concat(layerGroupNames);
    const initialSelectionInd = firstIndexOfString(allNames, initialSelection);
    const orderedControlLayers = moveLayerToHead(controlLayers, initialSelectionInd);
    orderedControlLayers[1].visible = true;
    const selectNode = document.createElement("select");
    const selectionOptions = 
      orderedControlLayers.
      map((x: RDeckLayer) => {
          let layerOptionElem = document.createElement("option") as LayerOptionElement
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
        }
      )
    selectNode.append(...selectionOptions);
    selectNode.id = targetRdeckId + "_layerDropdownControl";
    selectNode.onselectionchange = 
    return selectNode;
}

interface RDeckRPayload {
    targetRdeckId: string[],
    controlType: "dropdown",
    controlData: {
        layerNames: string[],
        layerGroupNames: string[],
        initialSelection: string | string[]
    }
}

// utils
function onSelectionChangeFactory(controlId: string, targetId: string): (event: Event) => void {
  return  function(event: Event) {
      const selectElement = document.getElementById(controlId) as HTMLSelectElement | null;

    };
}

function firstIndexOfString(arr: string[], target: string): number {
    return arr.length - (arr.reverse().lastIndexOf(target) + 1)
}

function moveLayerToHead(layers: RDeckLayer[], index: number): RDeckLayer[] {
    const headLayer = layers[index];
    return [headLayer].concat(
        layers.
            filter((layer, i) => i !== index)
    );
}