(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-0686959d","chunk-2d0a36d9"],{"01ac":function(e,n){function s(e){const n="\\d(_|\\d)*",s="[eE][-+]?"+n,a=n+"(\\."+n+")?("+s+")?",i="\\w+",r=n+"#"+i+"(\\."+i+")?#("+s+")?",t="\\b("+r+"|"+a+")",o="[A-Za-z](_?[A-Za-z0-9.])*",c="[]\\{\\}%#'\"",d=e.COMMENT("--","$"),l={begin:"\\s+:\\s+",end:"\\s*(:=|;|\\)|=>|$)",illegal:c,contains:[{beginKeywords:"loop for declare others",endsParent:!0},{className:"keyword",beginKeywords:"not null constant access function procedure in out aliased exception"},{className:"type",begin:o,endsParent:!0,relevance:0}]},g=["abort","else","new","return","abs","elsif","not","reverse","abstract","end","accept","entry","select","access","exception","of","separate","aliased","exit","or","some","all","others","subtype","and","for","out","synchronized","array","function","overriding","at","tagged","generic","package","task","begin","goto","pragma","terminate","body","private","then","if","procedure","type","case","in","protected","constant","interface","is","raise","use","declare","range","delay","limited","record","when","delta","loop","rem","while","digits","renames","with","do","mod","requeue","xor"];return{name:"Ada",case_insensitive:!0,keywords:{keyword:g,literal:["True","False"]},contains:[d,{className:"string",begin:/"/,end:/"/,contains:[{begin:/""/,relevance:0}]},{className:"string",begin:/'.'/},{className:"number",begin:t,relevance:0},{className:"symbol",begin:"'"+o},{className:"title",begin:"(\\bwith\\s+)?(\\bprivate\\s+)?\\bpackage\\s+(\\bbody\\s+)?",end:"(is|$)",keywords:"package body",excludeBegin:!0,excludeEnd:!0,illegal:c},{begin:"(\\b(with|overriding)\\s+)?\\b(function|procedure)\\s+",end:"(\\bis|\\bwith|\\brenames|\\)\\s*;)",keywords:"overriding function procedure with is renames return",returnBegin:!0,contains:[d,{className:"title",begin:"(\\bwith\\s+)?\\b(function|procedure)\\s+",end:"(\\(|\\s+|$)",excludeBegin:!0,excludeEnd:!0,illegal:c},l,{className:"type",begin:"\\breturn\\s+",end:"(\\s+|;|$)",keywords:"return",excludeBegin:!0,excludeEnd:!0,endsParent:!0,illegal:c}]},{className:"type",begin:"\\b(sub)?type\\s+",end:"\\s+",keywords:"type",excludeBegin:!0,illegal:c},l]}}e.exports=s},"3f15":function(e,n,s){function a(){a.warned||(a.warned=!0,console.log('Deprecation (warning): Using file extension in specifier is deprecated, use "highlight.js/lib/languages/ada" instead of "highlight.js/lib/languages/ada.js"'))}a(),e.exports=s("01ac")}}]);
//# sourceMappingURL=chunk-0686959d.13bf20cb.js.map