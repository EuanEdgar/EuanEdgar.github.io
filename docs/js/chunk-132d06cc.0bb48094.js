(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-132d06cc","chunk-2d0e93d4"],{"5f4d":function(e,n,s){function i(){i.warned||(i.warned=!0,console.log('Deprecation (warning): Using file extension in specifier is deprecated, use "highlight.js/lib/languages/smalltalk" instead of "highlight.js/lib/languages/smalltalk.js"'))}i(),e.exports=s("8d4f")},"8d4f":function(e,n){function s(e){const n="[a-z][a-zA-Z0-9_]*",s={className:"string",begin:"\\$.{1}"},i={className:"symbol",begin:"#"+e.UNDERSCORE_IDENT_RE};return{name:"Smalltalk",aliases:["st"],keywords:["self","super","nil","true","false","thisContext"],contains:[e.COMMENT('"','"'),e.APOS_STRING_MODE,{className:"type",begin:"\\b[A-Z][A-Za-z0-9_]*",relevance:0},{begin:n+":",relevance:0},e.C_NUMBER_MODE,i,s,{begin:"\\|[ ]*"+n+"([ ]+"+n+")*[ ]*\\|",returnBegin:!0,end:/\|/,illegal:/\S/,contains:[{begin:"(\\|[ ]*)?"+n}]},{begin:"#\\(",end:"\\)",contains:[e.APOS_STRING_MODE,s,e.C_NUMBER_MODE,i]}]}}e.exports=s}}]);
//# sourceMappingURL=chunk-132d06cc.0bb48094.js.map