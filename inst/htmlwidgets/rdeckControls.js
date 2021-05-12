System.register(["./lib/rdeckControlsLibrary-0.999/rdeckControlsLibrary"], function (exports_1, context_1) {
    "use strict";
    var rdeckControlsLibrary_1;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (rdeckControlsLibrary_1_1) {
                rdeckControlsLibrary_1 = rdeckControlsLibrary_1_1;
            }
        ],
        execute: function () {
            HTMLWidgets.widget({
                name: "rdeckControls",
                type: "output",
                factory: function (el, width, height) {
                    // TODO: define shared variables for this instance
                    return {
                        renderValue: function (x) {
                            var controlRender;
                            switch (x.controlType) {
                                case "dropdown":
                                    controlRender = rdeckControlsLibrary_1.rdeckLayerDropdown;
                                    break;
                                default:
                                    throw `rdeckControls recieved an unknown control type: {x.controlType}`;
                            }
                            const controlEl = controlRender(Object.assign({ targetRdeckId: x.targetRdeckId }, x.controlData));
                            el.appendChild(controlEl);
                        },
                        resize: function (width, height) {
                            // TODO: code to re-render the widget with a new size
                        },
                    };
                },
            });
        }
    };
});
