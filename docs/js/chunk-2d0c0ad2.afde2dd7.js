(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0c0ad2"],{4396:function(n,e){function a(n){const e={begin:/[a-z][A-Za-z0-9_]*/,relevance:0},a={className:"symbol",variants:[{begin:/[A-Z][a-zA-Z0-9_]*/},{begin:/_[A-Za-z0-9_]*/}],relevance:0},s={begin:/\(/,end:/\)/,relevance:0},i={begin:/\[/,end:/\]/},c={className:"comment",begin:/%/,end:/$/,contains:[n.PHRASAL_WORDS_MODE]},o={className:"string",begin:/`/,end:/`/,contains:[n.BACKSLASH_ESCAPE]},t={className:"string",begin:/0'(\\'|.)/},_={className:"string",begin:/0'\\s/},g={begin:/:-/},b=[e,a,s,g,i,c,n.C_BLOCK_COMMENT_MODE,n.QUOTE_STRING_MODE,n.APOS_STRING_MODE,o,t,_,n.C_NUMBER_MODE];return s.contains=b,i.contains=b,{name:"Prolog",contains:b.concat([{begin:/\.$/}])}}n.exports=a}}]);
//# sourceMappingURL=chunk-2d0c0ad2.afde2dd7.js.map