HTMLWidgets.widget({

  name: 'rdeckControls',

  type: 'output',

  factory: function (el, width, height) {

    // TODO: define shared variables for this instance

    return {

      renderValue: function (x) {

        var controlRenderFunction: (arg: rdeckLayerControlProperties) => string;

        switch (x.controlType) {
          case "dropdown":
            controlRenderFunction = rdeckLayerDropdown;
            break;
          default:
            throw(`rdeckControls recieved an unknown control type: {x.controlType}`) 
        };

        el.innerHTML = controlRenderFunction({targetRdeckId: x.targetRdeckId, ...x.controlData})

      },

      resize: function (width, height) {

        // TODO: code to re-render the widget with a new size

      }

    };
  }
});