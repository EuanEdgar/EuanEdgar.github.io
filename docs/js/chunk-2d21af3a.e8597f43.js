(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d21af3a"],{be67:function(o,t,e){"use strict";e.r(t);var n=e("5530"),a=e("d65e"),l=e("ade3"),s=(e("b0c0"),e("159b"),{namespaced:!0,state:{global:{},tool:{}},mutations:{setOption:function(o,t){var e=t.namespace,a=t.key,s=t.value;o[e]=Object(n["a"])(Object(n["a"])({},o[e]),{},Object(l["a"])({},a,s))},clearToolOptions:function(o){o.tool={}}},actions:{setOption:function(o,t){var e=o.getters,a=o.commit,l=o.dispatch,s=o.state,i=t.name,c=t.value,u=t.global,p=void 0!==u&&u,r=e.namespace(p);a("setOption",{namespace:r,key:i,value:c}),l("paint/setToolOptions",Object(n["a"])(Object(n["a"])({},s.global),s.tool),{root:!0})},selectTool:function(o,t){var e=o.commit,n=o.getters;e("clearToolOptions"),t.forEach((function(o){var t=o.value||n.optionValue(o)||o.default;e("setOption",{namespace:n.namespace(o.global),key:o.name,value:t})}))}},getters:{namespace:function(){return function(o){return o?"global":"tool"}},optionValue:function(o,t){return function(e){var n=e.name,a=e.global;return o[t.namespace(a)][n]}}}});t["default"]={state:{tool:null,toolClass:null,toolSettings:{}},mutations:{setToolSettings:function(o,t){o.toolSettings=t},setToolClass:function(o,t){o.toolClass=t},setTool:function(o,t){o.tool=t}},actions:{selectTool:function(o,t){var e=o.state,l=o.dispatch,s=o.commit,i=a["a"][t];if(!e.tool||!(e.tool instanceof i)){e.tool&&(e.tool.cancel(),s("setTool",null)),s("setToolClass",i),l("options/selectTool",i.options);var c=new i(Object(n["a"])(Object(n["a"])(Object(n["a"])({},e.toolSettings),e.options.global),e.options.tool));s("setTool",c)}},setToolSettings:function(o,t){var e=o.commit;e("setToolSettings",t)},setToolOptions:function(o,t){var e=o.state;e.tool.setOptions(t)}},modules:{options:s}}}}]);
//# sourceMappingURL=chunk-2d21af3a.e8597f43.js.map