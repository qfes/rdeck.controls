/* eslint-disable quotes */
/* eslint-disable no-use-before-define */
/* eslint-disable import/prefer-default-export */
import type { RDeckRPayload } from "./@types/R";
import * as rdeckControlsLib from "./lib/rdeckControlsLibrary-0.999/rdeckControlsLibrary" 
console.log("Executing rdeckControls.js...")


  HTMLWidgets.widget({
  name: "rdeckControls",

  type: "output",

  factory: function (el, width, height) {

    // TODO: define shared variables for this instance

    return {
      renderValue: function (x: RDeckRPayload): void {
        var controlRender: (arg: rdeckControlsLib.RDeckLayerControlProperties) => HTMLElement;

        switch (x.controlType) {
          case "dropdown":
            controlRender = rdeckControlsLib.rdeckLayerDropdown;
            break;
          default:
             console.log(`rdeckControls recieved an unknown control type: {x.controlType}`);
             throw Error("rdeckControls error")
        } 

        const controlProperties = {
          targetRDeckId: x.targetRDeckId,
          ...x.controlData,
        };
        if (!rdeckControlsLib.isRDeckLayerControlProperties(controlProperties)) {
          throw Error("rdeckcontrols received data from R that does not conform to control properties schema.")
        }
        const controlEl = controlRender(controlProperties);
        el.appendChild(controlEl);
        
      },

      resize: function (width, height): void {
        // TODO: code to re-render the widget with a new size
      },
    };
  },
});

