/* eslint-disable quotes */
/* eslint-disable no-use-before-define */
/* eslint-disable import/prefer-default-export */
import type { RDeckRPayload } from "./@types/R";
import type { RDeckLayerControlProperties } from "./lib/rdeckControlsLibrary-0.999/rdeckControlsLibrary";
import { rdeckLayerDropdown } from "./lib/rdeckControlsLibrary-0.999/rdeckControlsLibrary"

HTMLWidgets.widget({
  name: "rdeckControls",

  type: "output",

  factory: function (el, width, height) {
    // TODO: define shared variables for this instance

    return {
      renderValue: function (x: RDeckRPayload): void {
        var controlRender: (arg: RDeckLayerControlProperties) => HTMLElement;

        switch (x.controlType) {
          case "dropdown":
            controlRender = rdeckLayerDropdown;
            break;
          default:
            throw `rdeckControls recieved an unknown control type: {x.controlType}`;
        }

        const controlEl = controlRender({
          targetRdeckId: x.targetRdeckId,
          ...x.controlData,
        });
        el.appendChild(controlEl);
      },

      resize: function (width, height): void {
        // TODO: code to re-render the widget with a new size
      },
    };
  },
});