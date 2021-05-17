export interface RDeckRPayload {
  targetRDeckId: string;
  controlType: "dropdown";
  controlData: {
    layerNames: string[];
    layerGroupNames: string[];
    initialSelection: string | string[];
    label: string;
  };
}