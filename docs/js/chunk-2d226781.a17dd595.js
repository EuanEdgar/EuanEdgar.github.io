(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d226781"],{e990:function(e,n){function a(e){function n(e){return e.map((function(e){return e.split("").map((function(e){return"\\"+e})).join("")})).join("|")}const a="~?[a-z$_][0-9a-zA-Z$_]*",s="`?[A-Z$_][0-9a-zA-Z$_]*",i="'?[a-z$_][0-9a-z$_]*",r="\\s*:\\s*[a-z$_][0-9a-z$_]*(\\(\\s*("+i+"\\s*(,"+i+"\\s*)*)?\\))?",l=a+"("+r+"){0,2}",t="("+n(["||","++","**","+.","*","/","*.","/.","..."])+"|\\|>|&&|==|===)",c="\\s+"+t+"\\s+",o={keyword:"and as asr assert begin class constraint do done downto else end exception external for fun function functor if in include inherit initializer land lazy let lor lsl lsr lxor match method mod module mutable new nonrec object of open or private rec sig struct then to try type val virtual when while with",built_in:"array bool bytes char exn|5 float int int32 int64 list lazy_t|5 nativeint|5 ref string unit ",literal:"true false"},b="\\b(0[xX][a-fA-F0-9_]+[Lln]?|0[oO][0-7_]+[Lln]?|0[bB][01_]+[Lln]?|[0-9][0-9_]*([Lln]|(\\.[0-9_]*)?([eE][-+]?[0-9_]+)?)?)",g={className:"number",relevance:0,variants:[{begin:b},{begin:"\\(-"+b+"\\)"}]},d={className:"operator",relevance:0,begin:t},u=[{className:"identifier",relevance:0,begin:a},d,g],m=[e.QUOTE_STRING_MODE,d,{className:"module",begin:"\\b"+s,returnBegin:!0,relevance:0,end:".",contains:[{className:"identifier",begin:s,relevance:0}]}],v=[{className:"module",begin:"\\b"+s,returnBegin:!0,end:".",relevance:0,contains:[{className:"identifier",begin:s,relevance:0}]}],N={begin:a,end:"(,|\\n|\\))",relevance:0,contains:[d,{className:"typing",begin:":",end:"(,|\\n)",returnBegin:!0,relevance:0,contains:v}]},_={className:"function",relevance:0,keywords:o,variants:[{begin:"\\s(\\(\\.?.*?\\)|"+a+")\\s*=>",end:"\\s*=>",returnBegin:!0,relevance:0,contains:[{className:"params",variants:[{begin:a},{begin:l},{begin:/\(\s*\)/}]}]},{begin:"\\s\\(\\.?[^;\\|]*\\)\\s*=>",end:"\\s=>",returnBegin:!0,relevance:0,contains:[{className:"params",relevance:0,variants:[N]}]},{begin:"\\(\\.\\s"+a+"\\)\\s*=>"}]};m.push(_);const p={className:"constructor",begin:s+"\\(",end:"\\)",illegal:"\\n",keywords:o,contains:[e.QUOTE_STRING_MODE,d,{className:"params",begin:"\\b"+a}]},f={className:"pattern-match",begin:"\\|",returnBegin:!0,keywords:o,end:"=>",relevance:0,contains:[p,d,{relevance:0,className:"constructor",begin:s}]},w={className:"module-access",keywords:o,returnBegin:!0,variants:[{begin:"\\b("+s+"\\.)+"+a},{begin:"\\b("+s+"\\.)+\\(",end:"\\)",returnBegin:!0,contains:[_,{begin:"\\(",end:"\\)",relevance:0,skip:!0}].concat(m)},{begin:"\\b("+s+"\\.)+\\{",end:/\}/}],contains:m};return v.push(w),{name:"ReasonML",aliases:["re"],keywords:o,illegal:"(:-|:=|\\$\\{|\\+=)",contains:[e.COMMENT("/\\*","\\*/",{illegal:"^(#,\\/\\/)"}),{className:"character",begin:"'(\\\\[^']+|[^'])'",illegal:"\\n",relevance:0},e.QUOTE_STRING_MODE,{className:"literal",begin:"\\(\\)",relevance:0},{className:"literal",begin:"\\[\\|",end:"\\|\\]",relevance:0,contains:u},{className:"literal",begin:"\\[",end:"\\]",relevance:0,contains:u},p,{className:"operator",begin:c,illegal:"--\x3e",relevance:0},g,e.C_LINE_COMMENT_MODE,f,_,{className:"module-def",begin:"\\bmodule\\s+"+a+"\\s+"+s+"\\s+=\\s+\\{",end:/\}/,returnBegin:!0,keywords:o,relevance:0,contains:[{className:"module",relevance:0,begin:s},{begin:/\{/,end:/\}/,relevance:0,skip:!0}].concat(m)},w]}}e.exports=a}}]);
//# sourceMappingURL=chunk-2d226781.a17dd595.js.map