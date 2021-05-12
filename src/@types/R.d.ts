export interface RDeckRPayload {
  targetRdeckId: string;
  controlType: "dropdown";
  controlData: {
    layerNames: string[];
    layerGroupNames: string[];
    initialSelection: string | string[];
  };
}