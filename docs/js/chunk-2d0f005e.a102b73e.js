(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0f005e"],{"9b32":function(e,n){function a(e){var n="[a-zA-Z_\\-+\\*\\/<=>&#][a-zA-Z0-9_\\-+*\\/<=>&#!]*",a="\\|[^]*?\\|",i="(-|\\+)?\\d+(\\.\\d+|\\/\\d+)?((d|e|f|l|s|D|E|F|L|S)(\\+|-)?\\d+)?",s={className:"literal",begin:"\\b(t{1}|nil)\\b"},b={className:"number",variants:[{begin:i,relevance:0},{begin:"#(b|B)[0-1]+(/[0-1]+)?"},{begin:"#(o|O)[0-7]+(/[0-7]+)?"},{begin:"#(x|X)[0-9a-fA-F]+(/[0-9a-fA-F]+)?"},{begin:"#(c|C)\\("+i+" +"+i,end:"\\)"}]},l=e.inherit(e.QUOTE_STRING_MODE,{illegal:null}),g=e.COMMENT(";","$",{relevance:0}),c={begin:"\\*",end:"\\*"},t={className:"symbol",begin:"[:&]"+n},r={begin:n,relevance:0},o={begin:a},d={begin:"\\(",end:"\\)",contains:["self",s,l,b,r]},v={contains:[b,l,c,t,d,r],variants:[{begin:"['`]\\(",end:"\\)"},{begin:"\\(quote ",end:"\\)",keywords:{name:"quote"}},{begin:"'"+a}]},m={variants:[{begin:"'"+n},{begin:"#'"+n+"(::"+n+")*"}]},u={begin:"\\(\\s*",end:"\\)"},f={endsWithParent:!0,relevance:0};return u.contains=[{className:"name",variants:[{begin:n,relevance:0},{begin:a}]},f],f.contains=[v,m,u,s,b,l,g,c,t,o,r],{name:"Lisp",illegal:/\S/,contains:[b,e.SHEBANG(),s,l,g,v,m,u,r]}}e.exports=a}}]);
//# sourceMappingURL=chunk-2d0f005e.a102b73e.js.map