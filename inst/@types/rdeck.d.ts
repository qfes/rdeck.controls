export as namespace rdeck;

export interface NamedRDeckLayer {
  name: string,
  visible: boolean
}

export interface GroupNamedRDeckLayer {
    groupName: string,
    visible: boolean
}

export type RDeckLayer = NamedRDeckLayer | GroupNamedRDeckLayer;


export interface RDeckWidget {
  layers: RDeckLayer[],
  setLayerVisibility(layers: RDeckLayer[]): void
}

export function getWidgetById(id: string): RDeckWidget
