HTMLWidgets.widget({

  name: 'rdeckControls',

  type: 'output',

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
            throw(`rdeckControls recieved an unknown control type: {x.controlType}`) 
        };

        const controlEl = controlRender({targetRdeckId: x.targetRdeckId, ...x.controlData})
        el.appendChild(controlEl);
      },

      resize: function (width, height): void {

        // TODO: code to re-render the widget with a new size

      }

    };
  }
});



let widget: RDeckWidget = { layers: [], setLayerVisibility(layers) { return; } };

widget.setLayerVisibility([{ groupName: null, name: null, visible: true }])
