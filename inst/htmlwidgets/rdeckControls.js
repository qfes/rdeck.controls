(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["rdeckControls"] = factory();
	else
		root["rdeckControls"] = factory();
})(self, function() {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/lib/rdeckControlsLibrary-0.999/rdeckControlsLibrary.ts":
/*!********************************************************************!*\
  !*** ./src/lib/rdeckControlsLibrary-0.999/rdeckControlsLibrary.ts ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "rdeckLayerDropdown": () => (/* binding */ rdeckLayerDropdown),
/* harmony export */   "isRDeckLayerControlProperties": () => (/* binding */ isRDeckLayerControlProperties)
/* harmony export */ });
// ----- control renderers
function rdeckLayerDropdown({ targetRDeckId, layerNames, layerGroupNames, initialSelection, }) {
    if (Array.isArray(initialSelection)) {
        console.log("rdeckControls dropdown layer control cannot take an array of layer or group names.");
        throw Error("rdeckcontrols error");
    }
    const controlLayers = layerNames
        .map((x) => ({ name: x, groupName: null, visible: false }))
        .concat(layerGroupNames.map((x) => ({ groupName: x, visible: false })));
    const allNames = layerNames.concat(layerGroupNames);
    const initialSelectionInd = firstIndexOfString(allNames, initialSelection);
    const orderedControlLayers = moveLayerToHead(controlLayers, initialSelectionInd);
    orderedControlLayers[0].visible = true;
    const selectNode = document.createElement("select");
    const selectionOptions = orderedControlLayers.map((x) => {
        const layerOptionElem = document.createElement("option");
        if (x.groupName !== null) {
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
    selectNode.id = `${targetRDeckId}_layerDropdownControl`;
    selectNode.addEventListener("change", onSelectionChangeFactory(selectNode.id, targetRDeckId));
    return selectNode;
}
// ----- utils
function onSelectionChangeFactory(controlId, targetId) {
    return () => {
        const selectElement = document.getElementById(controlId);
        if (selectElement === null) {
            console.log(`rdeckControls couldn't find the control element by Id: ${controlId}`);
            throw Error("rdeckcontrols error");
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
                layer.groupName = null;
            }
            return layer;
        });
        const rdeckInstance = rdeck.getWidgetById(targetId);
        if (rdeckInstance === null) {
            console.log(`rdeckControls couldn't find the rdeck instance by Id: ${targetId}`);
            throw Error("rdeckcontrols error");
        }
        rdeckInstance.setLayerVisibility(rdeckLayers);
    };
}
function firstIndexOfString(arr, target) {
    return arr.length - (arr.reverse().lastIndexOf(target) + 1);
}
function moveLayerToHead(layers, index) {
    if (index > layers.length) {
        throw Error("rdeckcontrols got an initial selection index greater than number of layers. R/JS index issue?");
    }
    const headLayer = layers[index];
    return [headLayer].concat(layers.filter((layer, i) => i !== index));
}
function isStringArray(arr) {
    return (Array.isArray(arr) &&
        (arr.length === 0 ||
            arr.map((x) => typeof x === "string").reduce((x, y) => x && y)));
}
function isRDeckLayerControlProperties(controlProperties) {
    return (typeof controlProperties === "object" &&
        "targetRDeckId" in controlProperties &&
        "layerNames" in controlProperties &&
        "layerGroupNames" in controlProperties &&
        "initialSelection" in controlProperties &&
        "label" in controlProperties &&
        typeof controlProperties.targetRDeckId === "string" &&
        isStringArray(controlProperties.layerNames) &&
        isStringArray(controlProperties.layerGroupNames) &&
        (typeof controlProperties.initialSelection === "string" ||
            isStringArray(controlProperties.initialSelection)) &&
        typeof controlProperties.label === "string");
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!******************************!*\
  !*** ./src/rdeckControls.ts ***!
  \******************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _lib_rdeckControlsLibrary_0_999_rdeckControlsLibrary__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lib/rdeckControlsLibrary-0.999/rdeckControlsLibrary */ "./src/lib/rdeckControlsLibrary-0.999/rdeckControlsLibrary.ts");

console.log("Executing rdeckControls.js...");
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
                        controlRender = _lib_rdeckControlsLibrary_0_999_rdeckControlsLibrary__WEBPACK_IMPORTED_MODULE_0__.rdeckLayerDropdown;
                        break;
                    default:
                        console.log(`rdeckControls recieved an unknown control type: {x.controlType}`);
                        throw Error("rdeckControls error");
                }
                const controlProperties = {
                    targetRDeckId: x.targetRDeckId,
                    ...x.controlData,
                };
                if (!_lib_rdeckControlsLibrary_0_999_rdeckControlsLibrary__WEBPACK_IMPORTED_MODULE_0__.isRDeckLayerControlProperties(controlProperties)) {
                    throw Error("rdeckcontrols received data from R that does not conform to control properties schema.");
                }
                const controlEl = controlRender(controlProperties);
                el.innerText = controlProperties.label;
                el.appendChild(controlEl);
            },
            resize: function (width, height) {
                // TODO: code to re-render the widget with a new size
            },
        };
    },
});

})();

/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9yZGVja0NvbnRyb2xzL3dlYnBhY2svdW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbiIsIndlYnBhY2s6Ly9yZGVja0NvbnRyb2xzLy4vc3JjL2xpYi9yZGVja0NvbnRyb2xzTGlicmFyeS0wLjk5OS9yZGVja0NvbnRyb2xzTGlicmFyeS50cyIsIndlYnBhY2s6Ly9yZGVja0NvbnRyb2xzL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3JkZWNrQ29udHJvbHMvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3JkZWNrQ29udHJvbHMvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9yZGVja0NvbnRyb2xzL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vcmRlY2tDb250cm9scy8uL3NyYy9yZGVja0NvbnRyb2xzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRCxPOzs7Ozs7Ozs7Ozs7Ozs7QUNWQTtBQUNPLDZCQUE2QixnRUFBZ0U7QUFDcEc7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNCQUFzQiwyQ0FBMkM7QUFDakUsNkNBQTZDLCtCQUErQjtBQUM1RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSx1QkFBdUIsY0FBYztBQUNyQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0ZBQWtGLFVBQVU7QUFDNUY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxpRkFBaUYsU0FBUztBQUMxRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztVQzNGQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHdDQUF3Qyx5Q0FBeUM7V0FDakY7V0FDQTtXQUNBLEU7Ozs7O1dDUEEsd0Y7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0Esc0RBQXNELGtCQUFrQjtXQUN4RTtXQUNBLCtDQUErQyxjQUFjO1dBQzdELEU7Ozs7Ozs7Ozs7OztBQ04wRjtBQUMxRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0NBQXdDLG9HQUFtQztBQUMzRTtBQUNBO0FBQ0Esc0ZBQXNGLGNBQWM7QUFDcEc7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLCtHQUE4QztBQUNuRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQSxLQUFLO0FBQ0wsQ0FBQyIsImZpbGUiOiJyZGVja0NvbnRyb2xzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoW10sIGZhY3RvcnkpO1xuXHRlbHNlIGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jylcblx0XHRleHBvcnRzW1wicmRlY2tDb250cm9sc1wiXSA9IGZhY3RvcnkoKTtcblx0ZWxzZVxuXHRcdHJvb3RbXCJyZGVja0NvbnRyb2xzXCJdID0gZmFjdG9yeSgpO1xufSkoc2VsZiwgZnVuY3Rpb24oKSB7XG5yZXR1cm4gIiwiLy8gLS0tLS0gY29udHJvbCByZW5kZXJlcnNcclxuZXhwb3J0IGZ1bmN0aW9uIHJkZWNrTGF5ZXJEcm9wZG93bih7IHRhcmdldFJEZWNrSWQsIGxheWVyTmFtZXMsIGxheWVyR3JvdXBOYW1lcywgaW5pdGlhbFNlbGVjdGlvbiwgfSkge1xyXG4gICAgaWYgKEFycmF5LmlzQXJyYXkoaW5pdGlhbFNlbGVjdGlvbikpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcInJkZWNrQ29udHJvbHMgZHJvcGRvd24gbGF5ZXIgY29udHJvbCBjYW5ub3QgdGFrZSBhbiBhcnJheSBvZiBsYXllciBvciBncm91cCBuYW1lcy5cIik7XHJcbiAgICAgICAgdGhyb3cgRXJyb3IoXCJyZGVja2NvbnRyb2xzIGVycm9yXCIpO1xyXG4gICAgfVxyXG4gICAgY29uc3QgY29udHJvbExheWVycyA9IGxheWVyTmFtZXNcclxuICAgICAgICAubWFwKCh4KSA9PiAoeyBuYW1lOiB4LCBncm91cE5hbWU6IG51bGwsIHZpc2libGU6IGZhbHNlIH0pKVxyXG4gICAgICAgIC5jb25jYXQobGF5ZXJHcm91cE5hbWVzLm1hcCgoeCkgPT4gKHsgZ3JvdXBOYW1lOiB4LCB2aXNpYmxlOiBmYWxzZSB9KSkpO1xyXG4gICAgY29uc3QgYWxsTmFtZXMgPSBsYXllck5hbWVzLmNvbmNhdChsYXllckdyb3VwTmFtZXMpO1xyXG4gICAgY29uc3QgaW5pdGlhbFNlbGVjdGlvbkluZCA9IGZpcnN0SW5kZXhPZlN0cmluZyhhbGxOYW1lcywgaW5pdGlhbFNlbGVjdGlvbik7XHJcbiAgICBjb25zdCBvcmRlcmVkQ29udHJvbExheWVycyA9IG1vdmVMYXllclRvSGVhZChjb250cm9sTGF5ZXJzLCBpbml0aWFsU2VsZWN0aW9uSW5kKTtcclxuICAgIG9yZGVyZWRDb250cm9sTGF5ZXJzWzBdLnZpc2libGUgPSB0cnVlO1xyXG4gICAgY29uc3Qgc2VsZWN0Tm9kZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzZWxlY3RcIik7XHJcbiAgICBjb25zdCBzZWxlY3Rpb25PcHRpb25zID0gb3JkZXJlZENvbnRyb2xMYXllcnMubWFwKCh4KSA9PiB7XHJcbiAgICAgICAgY29uc3QgbGF5ZXJPcHRpb25FbGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcIm9wdGlvblwiKTtcclxuICAgICAgICBpZiAoeC5ncm91cE5hbWUgIT09IG51bGwpIHtcclxuICAgICAgICAgICAgbGF5ZXJPcHRpb25FbGVtLnZhbHVlID0geC5ncm91cE5hbWU7XHJcbiAgICAgICAgICAgIGxheWVyT3B0aW9uRWxlbS5pbm5lclRleHQgPSB4Lmdyb3VwTmFtZTtcclxuICAgICAgICAgICAgbGF5ZXJPcHRpb25FbGVtLm5hbWVUeXBlID0gXCJncm91cE5hbWVcIjtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGxheWVyT3B0aW9uRWxlbS52YWx1ZSA9IHgubmFtZTtcclxuICAgICAgICAgICAgbGF5ZXJPcHRpb25FbGVtLmlubmVyVGV4dCA9IHgubmFtZTtcclxuICAgICAgICAgICAgbGF5ZXJPcHRpb25FbGVtLm5hbWVUeXBlID0gXCJuYW1lXCI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBsYXllck9wdGlvbkVsZW07XHJcbiAgICB9KTtcclxuICAgIHNlbGVjdE5vZGUuYXBwZW5kKC4uLnNlbGVjdGlvbk9wdGlvbnMpO1xyXG4gICAgc2VsZWN0Tm9kZS5pZCA9IGAke3RhcmdldFJEZWNrSWR9X2xheWVyRHJvcGRvd25Db250cm9sYDtcclxuICAgIHNlbGVjdE5vZGUuYWRkRXZlbnRMaXN0ZW5lcihcImNoYW5nZVwiLCBvblNlbGVjdGlvbkNoYW5nZUZhY3Rvcnkoc2VsZWN0Tm9kZS5pZCwgdGFyZ2V0UkRlY2tJZCkpO1xyXG4gICAgcmV0dXJuIHNlbGVjdE5vZGU7XHJcbn1cclxuLy8gLS0tLS0gdXRpbHNcclxuZnVuY3Rpb24gb25TZWxlY3Rpb25DaGFuZ2VGYWN0b3J5KGNvbnRyb2xJZCwgdGFyZ2V0SWQpIHtcclxuICAgIHJldHVybiAoKSA9PiB7XHJcbiAgICAgICAgY29uc3Qgc2VsZWN0RWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGNvbnRyb2xJZCk7XHJcbiAgICAgICAgaWYgKHNlbGVjdEVsZW1lbnQgPT09IG51bGwpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coYHJkZWNrQ29udHJvbHMgY291bGRuJ3QgZmluZCB0aGUgY29udHJvbCBlbGVtZW50IGJ5IElkOiAke2NvbnRyb2xJZH1gKTtcclxuICAgICAgICAgICAgdGhyb3cgRXJyb3IoXCJyZGVja2NvbnRyb2xzIGVycm9yXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCBzZWxlY3Rpb25WYWx1ZSA9IHNlbGVjdEVsZW1lbnQudmFsdWU7XHJcbiAgICAgICAgY29uc3Qgc2VsZWN0Q2hpbGRMYXllck9wdGlvbnMgPSBBcnJheS5mcm9tKHNlbGVjdEVsZW1lbnQuY2hpbGRyZW4pLmZpbHRlcigoeCkgPT4geC50YWdOYW1lLnRvVXBwZXJDYXNlKCkgPT09IFwiT1BUSU9OXCIpO1xyXG4gICAgICAgIGNvbnN0IHJkZWNrTGF5ZXJzID0gc2VsZWN0Q2hpbGRMYXllck9wdGlvbnMubWFwKCh4KSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IGxheWVyID0ge307XHJcbiAgICAgICAgICAgIGxheWVyLnZpc2libGUgPSB4LnZhbHVlID09PSBzZWxlY3Rpb25WYWx1ZTtcclxuICAgICAgICAgICAgaWYgKHgubmFtZVR5cGUgPT09IFwiZ3JvdXBOYW1lXCIpIHtcclxuICAgICAgICAgICAgICAgIGxheWVyLmdyb3VwTmFtZSA9IHgudmFsdWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBsYXllci5uYW1lID0geC52YWx1ZTtcclxuICAgICAgICAgICAgICAgIGxheWVyLmdyb3VwTmFtZSA9IG51bGw7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIGxheWVyO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGNvbnN0IHJkZWNrSW5zdGFuY2UgPSByZGVjay5nZXRXaWRnZXRCeUlkKHRhcmdldElkKTtcclxuICAgICAgICBpZiAocmRlY2tJbnN0YW5jZSA9PT0gbnVsbCkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhgcmRlY2tDb250cm9scyBjb3VsZG4ndCBmaW5kIHRoZSByZGVjayBpbnN0YW5jZSBieSBJZDogJHt0YXJnZXRJZH1gKTtcclxuICAgICAgICAgICAgdGhyb3cgRXJyb3IoXCJyZGVja2NvbnRyb2xzIGVycm9yXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZGVja0luc3RhbmNlLnNldExheWVyVmlzaWJpbGl0eShyZGVja0xheWVycyk7XHJcbiAgICB9O1xyXG59XHJcbmZ1bmN0aW9uIGZpcnN0SW5kZXhPZlN0cmluZyhhcnIsIHRhcmdldCkge1xyXG4gICAgcmV0dXJuIGFyci5sZW5ndGggLSAoYXJyLnJldmVyc2UoKS5sYXN0SW5kZXhPZih0YXJnZXQpICsgMSk7XHJcbn1cclxuZnVuY3Rpb24gbW92ZUxheWVyVG9IZWFkKGxheWVycywgaW5kZXgpIHtcclxuICAgIGlmIChpbmRleCA+IGxheWVycy5sZW5ndGgpIHtcclxuICAgICAgICB0aHJvdyBFcnJvcihcInJkZWNrY29udHJvbHMgZ290IGFuIGluaXRpYWwgc2VsZWN0aW9uIGluZGV4IGdyZWF0ZXIgdGhhbiBudW1iZXIgb2YgbGF5ZXJzLiBSL0pTIGluZGV4IGlzc3VlP1wiKTtcclxuICAgIH1cclxuICAgIGNvbnN0IGhlYWRMYXllciA9IGxheWVyc1tpbmRleF07XHJcbiAgICByZXR1cm4gW2hlYWRMYXllcl0uY29uY2F0KGxheWVycy5maWx0ZXIoKGxheWVyLCBpKSA9PiBpICE9PSBpbmRleCkpO1xyXG59XHJcbmZ1bmN0aW9uIGlzU3RyaW5nQXJyYXkoYXJyKSB7XHJcbiAgICByZXR1cm4gKEFycmF5LmlzQXJyYXkoYXJyKSAmJlxyXG4gICAgICAgIChhcnIubGVuZ3RoID09PSAwIHx8XHJcbiAgICAgICAgICAgIGFyci5tYXAoKHgpID0+IHR5cGVvZiB4ID09PSBcInN0cmluZ1wiKS5yZWR1Y2UoKHgsIHkpID0+IHggJiYgeSkpKTtcclxufVxyXG5leHBvcnQgZnVuY3Rpb24gaXNSRGVja0xheWVyQ29udHJvbFByb3BlcnRpZXMoY29udHJvbFByb3BlcnRpZXMpIHtcclxuICAgIHJldHVybiAodHlwZW9mIGNvbnRyb2xQcm9wZXJ0aWVzID09PSBcIm9iamVjdFwiICYmXHJcbiAgICAgICAgXCJ0YXJnZXRSRGVja0lkXCIgaW4gY29udHJvbFByb3BlcnRpZXMgJiZcclxuICAgICAgICBcImxheWVyTmFtZXNcIiBpbiBjb250cm9sUHJvcGVydGllcyAmJlxyXG4gICAgICAgIFwibGF5ZXJHcm91cE5hbWVzXCIgaW4gY29udHJvbFByb3BlcnRpZXMgJiZcclxuICAgICAgICBcImluaXRpYWxTZWxlY3Rpb25cIiBpbiBjb250cm9sUHJvcGVydGllcyAmJlxyXG4gICAgICAgIFwibGFiZWxcIiBpbiBjb250cm9sUHJvcGVydGllcyAmJlxyXG4gICAgICAgIHR5cGVvZiBjb250cm9sUHJvcGVydGllcy50YXJnZXRSRGVja0lkID09PSBcInN0cmluZ1wiICYmXHJcbiAgICAgICAgaXNTdHJpbmdBcnJheShjb250cm9sUHJvcGVydGllcy5sYXllck5hbWVzKSAmJlxyXG4gICAgICAgIGlzU3RyaW5nQXJyYXkoY29udHJvbFByb3BlcnRpZXMubGF5ZXJHcm91cE5hbWVzKSAmJlxyXG4gICAgICAgICh0eXBlb2YgY29udHJvbFByb3BlcnRpZXMuaW5pdGlhbFNlbGVjdGlvbiA9PT0gXCJzdHJpbmdcIiB8fFxyXG4gICAgICAgICAgICBpc1N0cmluZ0FycmF5KGNvbnRyb2xQcm9wZXJ0aWVzLmluaXRpYWxTZWxlY3Rpb24pKSAmJlxyXG4gICAgICAgIHR5cGVvZiBjb250cm9sUHJvcGVydGllcy5sYWJlbCA9PT0gXCJzdHJpbmdcIik7XHJcbn1cclxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgKiBhcyByZGVja0NvbnRyb2xzTGliIGZyb20gXCIuL2xpYi9yZGVja0NvbnRyb2xzTGlicmFyeS0wLjk5OS9yZGVja0NvbnRyb2xzTGlicmFyeVwiO1xyXG5jb25zb2xlLmxvZyhcIkV4ZWN1dGluZyByZGVja0NvbnRyb2xzLmpzLi4uXCIpO1xyXG5IVE1MV2lkZ2V0cy53aWRnZXQoe1xyXG4gICAgbmFtZTogXCJyZGVja0NvbnRyb2xzXCIsXHJcbiAgICB0eXBlOiBcIm91dHB1dFwiLFxyXG4gICAgZmFjdG9yeTogZnVuY3Rpb24gKGVsLCB3aWR0aCwgaGVpZ2h0KSB7XHJcbiAgICAgICAgLy8gVE9ETzogZGVmaW5lIHNoYXJlZCB2YXJpYWJsZXMgZm9yIHRoaXMgaW5zdGFuY2VcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICByZW5kZXJWYWx1ZTogZnVuY3Rpb24gKHgpIHtcclxuICAgICAgICAgICAgICAgIHZhciBjb250cm9sUmVuZGVyO1xyXG4gICAgICAgICAgICAgICAgc3dpdGNoICh4LmNvbnRyb2xUeXBlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBcImRyb3Bkb3duXCI6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRyb2xSZW5kZXIgPSByZGVja0NvbnRyb2xzTGliLnJkZWNrTGF5ZXJEcm9wZG93bjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coYHJkZWNrQ29udHJvbHMgcmVjaWV2ZWQgYW4gdW5rbm93biBjb250cm9sIHR5cGU6IHt4LmNvbnRyb2xUeXBlfWApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBFcnJvcihcInJkZWNrQ29udHJvbHMgZXJyb3JcIik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBjb25zdCBjb250cm9sUHJvcGVydGllcyA9IHtcclxuICAgICAgICAgICAgICAgICAgICB0YXJnZXRSRGVja0lkOiB4LnRhcmdldFJEZWNrSWQsXHJcbiAgICAgICAgICAgICAgICAgICAgLi4ueC5jb250cm9sRGF0YSxcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICBpZiAoIXJkZWNrQ29udHJvbHNMaWIuaXNSRGVja0xheWVyQ29udHJvbFByb3BlcnRpZXMoY29udHJvbFByb3BlcnRpZXMpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgRXJyb3IoXCJyZGVja2NvbnRyb2xzIHJlY2VpdmVkIGRhdGEgZnJvbSBSIHRoYXQgZG9lcyBub3QgY29uZm9ybSB0byBjb250cm9sIHByb3BlcnRpZXMgc2NoZW1hLlwiKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGNvbnN0IGNvbnRyb2xFbCA9IGNvbnRyb2xSZW5kZXIoY29udHJvbFByb3BlcnRpZXMpO1xyXG4gICAgICAgICAgICAgICAgZWwuaW5uZXJUZXh0ID0gY29udHJvbFByb3BlcnRpZXMubGFiZWw7XHJcbiAgICAgICAgICAgICAgICBlbC5hcHBlbmRDaGlsZChjb250cm9sRWwpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICByZXNpemU6IGZ1bmN0aW9uICh3aWR0aCwgaGVpZ2h0KSB7XHJcbiAgICAgICAgICAgICAgICAvLyBUT0RPOiBjb2RlIHRvIHJlLXJlbmRlciB0aGUgd2lkZ2V0IHdpdGggYSBuZXcgc2l6ZVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgIH07XHJcbiAgICB9LFxyXG59KTtcclxuIl0sInNvdXJjZVJvb3QiOiIifQ==