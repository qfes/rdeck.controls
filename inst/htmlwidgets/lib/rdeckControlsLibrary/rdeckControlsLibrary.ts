
interface rdeckLayerControlProperties {
    targetRdeckId: string[] 
    layerNames: string[],
    layerGroupNames: string[],
    initialSelection: string | string[]
}

function rdeckLayerDropdown(
    {
        targetRdeckId,
        layerNames,
        layerGroupNames,
        initialSelection 
    }: rdeckLayerControlProperties): string {

   if (Array.isArray(initialSelection)) {
       throw("rdeckControls dropdown layer control cannot take an array of layer or group names.")
   }

   var allNames = layerNames.concat(layerGroupNames);
   var firstInitialSelectionInd = firstIndexOfString(allNames, initialSelection);

}

interface rdeckRPayload {
    targetRdeckId: string[],
    controlType: "dropdown",
    controlData: {
        layerNames: string[],
        layerGroupNames: string[],
        initialSelection: string | string[]
    } 
}

// utils
function firstIndexOfString(arr: string[], target:string): number {
  return arr.length - (arr.reverse().lastIndexOf(target) + 1)
}