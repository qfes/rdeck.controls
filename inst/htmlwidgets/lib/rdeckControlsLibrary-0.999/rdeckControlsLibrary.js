System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    // ----- control renderers
    function rdeckLayerDropdown({ targetRdeckId, layerNames, layerGroupNames, initialSelection, }) {
        if (Array.isArray(initialSelection)) {
            throw (Error("rdeckControls dropdown layer control cannot take an array of layer or group names."));
        }
        const controlLayers = layerNames.
            map((x) => ({ name: x, visible: false })).
            concat(layerGroupNames.map((x) => ({ groupName: x, visible: false })));
        const allNames = layerNames.concat(layerGroupNames);
        const initialSelectionInd = firstIndexOfString(allNames, initialSelection);
        const orderedControlLayers = moveLayerToHead(controlLayers, initialSelectionInd);
        orderedControlLayers[1].visible = true;
        const selectNode = document.createElement("select");
        const selectionOptions = orderedControlLayers.map((x) => {
            const layerOptionElem = document.createElement("option");
            if ("groupName" in x) {
                layerOptionElem.value = x.groupName;
                layerOptionElem.innerText = x.groupName;
                layerOptionElem.nameType = "groupName";
            }
            else {
                layerOptionElem.value = x.name;
                layerOptionElem.innerText = x.name;
                layerOptionElem.nameType = "name";
            }
            return layerOptionElem;
        });
        selectNode.append(...selectionOptions);
        selectNode.id = `${targetRdeckId}_layerDropdownControl`;
        selectNode.onselectionchange = onSelectionChangeFactory(selectNode.id, targetRdeckId);
        return selectNode;
    }
    exports_1("rdeckLayerDropdown", rdeckLayerDropdown);
    // ----- utils
    function onSelectionChangeFactory(controlId, targetId) {
        return () => {
            const selectElement = document.getElementById(controlId);
            if (selectElement === null) {
                throw Error(`rdeckControls couldn't find the control elment by Id: ${controlId}`);
            }
            const selectionValue = selectElement.value;
            const selectChildLayerOptions = Array.from(selectElement.children).filter((x) => x.tagName.toUpperCase() === "OPTION");
            const rdeckLayers = selectChildLayerOptions.map((x) => {
                const layer = {};
                layer.visible = x.value === selectionValue;
                if (x.nameType === "groupName") {
                    layer.groupName = x.value;
                }
                else {
                    layer.name = x.value;
                }
                return layer;
            });
            const rdeckInstance = rdeck.getWidgetById(targetId);
            if (rdeckInstance === null) {
                throw Error(`rdeckControls couldn't find the rdeck instance by Id: ${targetId}`);
            }
            rdeckInstance.setLayerVisibility(rdeckLayers);
        };
    }
    function firstIndexOfString(arr, target) {
        return arr.length - (arr.reverse().lastIndexOf(target) + 1);
    }
    function moveLayerToHead(layers, index) {
        const headLayer = layers[index];
        return [headLayer].concat(layers.filter((layer, i) => i !== index));
    }
    return {
        setters: [],
        execute: function () {
        }
    };
});
