(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-cb50c47e","chunk-2d0e5731"],{9510:function(e,n){function t(e,...n){const t=Object.create(null);for(const i in e)t[i]=e[i];return n.forEach((function(e){for(const n in e)t[n]=e[n]})),t}function i(e){return e?"string"===typeof e?e:e.source:null}function s(e){return a("(?=",e,")")}function a(...e){const n=e.map(e=>i(e)).join("");return n}function r(e){const n=e[e.length-1];return"object"===typeof n&&n.constructor===Object?(e.splice(e.length-1,1),n):{}}function o(...e){const n=r(e),t="("+(n.capture?"":"?:")+e.map(e=>i(e)).join("|")+")";return t}const c="[a-zA-Z_]\\w*",l=function(e,n,i={}){const s=t({scope:"comment",begin:e,end:n,contains:[]},i);s.contains.push({scope:"doctag",begin:"[ ]*(?=(TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):)",end:/(TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):/,excludeBegin:!0,relevance:0});const r=o("I","a","is","so","us","to","at","if","in","it","on",/[A-Za-z]+['](d|ve|re|ll|t|s|n)/,/[A-Za-z]+[-][a-z]+/,/[A-Za-z][a-z]{2,}/);return s.contains.push({begin:a(/[ ]+/,"(",r,/[.]?[:]?([.][ ]|[ ])/,"){3}")}),s};function b(e){const n=["and","as","assert","async","await","break","class","continue","def","del","elif","else","except","finally","for","from","global","if","import","in","is","lambda","nonlocal|10","not","or","pass","raise","return","try","while","with","yield"],t=["__import__","abs","all","any","ascii","bin","bool","breakpoint","bytearray","bytes","callable","chr","classmethod","compile","complex","delattr","dict","dir","divmod","enumerate","eval","exec","filter","float","format","frozenset","getattr","globals","hasattr","hash","help","hex","id","input","int","isinstance","issubclass","iter","len","list","locals","map","max","memoryview","min","next","object","oct","open","ord","pow","print","property","range","repr","reversed","round","set","setattr","slice","sorted","staticmethod","str","sum","super","tuple","type","vars","zip"],i=["__debug__","Ellipsis","False","None","NotImplemented","True"],a=["Any","Callable","Coroutine","Dict","List","Literal","Generic","Optional","Sequence","Set","Tuple","Type","Union"],r={$pattern:/[A-Za-z]\w+|__\w+__/,keyword:n,built_in:t,literal:i,type:a},o={className:"meta",begin:/^(>>>|\.\.\.) /},l={className:"subst",begin:/\{/,end:/\}/,keywords:r,illegal:/#/},b={begin:/\{\{/,relevance:0},d={className:"string",contains:[e.BACKSLASH_ESCAPE],variants:[{begin:/([uU]|[bB]|[rR]|[bB][rR]|[rR][bB])?'''/,end:/'''/,contains:[e.BACKSLASH_ESCAPE,o],relevance:10},{begin:/([uU]|[bB]|[rR]|[bB][rR]|[rR][bB])?"""/,end:/"""/,contains:[e.BACKSLASH_ESCAPE,o],relevance:10},{begin:/([fF][rR]|[rR][fF]|[fF])'''/,end:/'''/,contains:[e.BACKSLASH_ESCAPE,o,b,l]},{begin:/([fF][rR]|[rR][fF]|[fF])"""/,end:/"""/,contains:[e.BACKSLASH_ESCAPE,o,b,l]},{begin:/([uU]|[rR])'/,end:/'/,relevance:10},{begin:/([uU]|[rR])"/,end:/"/,relevance:10},{begin:/([bB]|[bB][rR]|[rR][bB])'/,end:/'/},{begin:/([bB]|[bB][rR]|[rR][bB])"/,end:/"/},{begin:/([fF][rR]|[rR][fF]|[fF])'/,end:/'/,contains:[e.BACKSLASH_ESCAPE,b,l]},{begin:/([fF][rR]|[rR][fF]|[fF])"/,end:/"/,contains:[e.BACKSLASH_ESCAPE,b,l]},e.APOS_STRING_MODE,e.QUOTE_STRING_MODE]},u="[0-9](_?[0-9])*",p=`(\\b(${u}))?\\.(${u})|\\b(${u})\\.`,g={className:"number",relevance:0,variants:[{begin:`(\\b(${u})|(${p}))[eE][+-]?(${u})[jJ]?\\b`},{begin:`(${p})[jJ]?`},{begin:"\\b([1-9](_?[0-9])*|0+(_?0)*)[lLjJ]?\\b"},{begin:"\\b0[bB](_?[01])+[lL]?\\b"},{begin:"\\b0[oO](_?[0-7])+[lL]?\\b"},{begin:"\\b0[xX](_?[0-9a-fA-F])+[lL]?\\b"},{begin:`\\b(${u})[jJ]\\b`}]},f={className:"comment",begin:s(/# type:/),end:/$/,keywords:r,contains:[{begin:/# type:/},{begin:/#/,end:/\b\B/,endsWithParent:!0}]},m={className:"params",variants:[{className:"",begin:/\(\s*\)/,skip:!0},{begin:/\(/,end:/\)/,excludeBegin:!0,excludeEnd:!0,keywords:r,contains:["self",o,g,d,e.HASH_COMMENT_MODE]}]};return l.contains=[d,g,o],{name:"Python",aliases:["py","gyp","ipython"],keywords:r,illegal:/(<\/|->|\?)|=>/,contains:[o,g,{begin:/\bself\b/},{beginKeywords:"if",relevance:0},d,f,e.HASH_COMMENT_MODE,{match:[/def/,/\s+/,c],scope:{1:"keyword",3:"title.function"},contains:[m]},{variants:[{match:[/class/,/\s+/,c,/\s*/,/\(\s*/,c,/\s*\)/]},{match:[/class/,/\s+/,c]}],scope:{1:"keyword",3:"title.class",6:"title.class.inherited"}},{className:"meta",begin:/^[\t ]*@/,end:/(?=#)|$/,contains:[g,m,d]}]}}l("//","$"),l("/\\*","\\*/"),l("#","$"),e.exports=b},ebb8:function(e,n,t){function i(){i.warned||(i.warned=!0,console.log('Deprecation (warning): Using file extension in specifier is deprecated, use "highlight.js/lib/languages/python" instead of "highlight.js/lib/languages/python.js"'))}i(),e.exports=t("9510")}}]);
//# sourceMappingURL=chunk-cb50c47e.b8d6d361.js.map