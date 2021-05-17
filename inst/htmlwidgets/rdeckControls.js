!function(e,r){"object"==typeof exports&&"object"==typeof module?module.exports=r():"function"==typeof define&&define.amd?define([],r):"object"==typeof exports?exports.rdeckControls=r():e.rdeckControls=r()}(self,(function(){return(()=>{"use strict";var e={};function r({targetRDeckId:e,layerNames:r,layerGroupNames:o,initialSelection:t}){if(Array.isArray(t))throw console.log("rdeckControls dropdown layer control cannot take an array of layer or group names."),Error("rdeckcontrols error");var n,a;const l=function(e,r){if(r>e.length)throw Error("rdeckcontrols got an initial selection index greater than number of layers. R/JS index issue?");return[e[r]].concat(e.filter(((e,o)=>o!==r)))}(r.map((e=>({name:e,groupName:null,visible:!1}))).concat(o.map((e=>({groupName:e,visible:!1})))),(a=t,(n=r.concat(o)).length-(n.reverse().lastIndexOf(a)+1)));l[0].visible=!0;const c=document.createElement("select"),i=l.map((e=>{const r=document.createElement("option");return null!==e.groupName?(r.value=e.groupName,r.innerText=e.groupName,r.nameType="groupName"):(r.value=e.name,r.innerText=e.name,r.nameType="name"),r}));var s;return c.append(...i),c.id=`${e}_layerDropdownControl`,c.addEventListener("change",(s=e,e=>{const r=e.currentTarget;if(null===r)throw console.log("rdeckControls couldn't find the control element in onChange callback."),Error("rdeckcontrols error");const o=r.value,t=Array.from(r.children).filter((e=>"OPTION"===e.tagName.toUpperCase())).map((e=>{const r={};return r.visible=e.value===o,"groupName"===e.nameType?r.groupName=e.value:(r.name=e.value,r.groupName=null),r})),n=rdeck.getWidgetById(s);if(null===n)throw console.log(`rdeckControls couldn't find the rdeck instance by Id: ${s}`),Error("rdeckcontrols error");n.setLayerVisibility(t)})),c}function o(e){return Array.isArray(e)&&(0===e.length||e.map((e=>"string"==typeof e)).reduce(((e,r)=>e&&r)))}return(e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})})(e),console.log("Executing rdeckControls.js..."),HTMLWidgets.widget({name:"rdeckControls",type:"output",factory:function(e,t,n){return{renderValue:function(t){var n;switch(t.controlType){case"dropdown":n=r;break;default:throw console.log("rdeckControls recieved an unknown control type: {x.controlType}"),Error("rdeckControls error")}const a={targetRDeckId:t.targetRDeckId,...t.controlData};if(!function(e){return"object"==typeof e&&"targetRDeckId"in e&&"layerNames"in e&&"layerGroupNames"in e&&"initialSelection"in e&&"label"in e&&"string"==typeof e.targetRDeckId&&o(e.layerNames)&&o(e.layerGroupNames)&&("string"==typeof e.initialSelection||o(e.initialSelection))&&"string"==typeof e.label}(a))throw Error("rdeckcontrols received data from R that does not conform to control properties schema.");const l=n(a);e.innerText=a.label,e.appendChild(l)},resize:function(e,r){}}}}),e})()}));