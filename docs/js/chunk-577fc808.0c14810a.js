(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-577fc808","chunk-2d0ab4ba"],{1555:function(e,n){function a(e){return e?"string"===typeof e?e:e.source:null}function t(e){const n=e[e.length-1];return"object"===typeof n&&n.constructor===Object?(e.splice(e.length-1,1),n):{}}function i(...e){const n=t(e),i="("+(n.capture?"":"?:")+e.map(e=>a(e)).join("|")+")";return i}function r(e){const n=i(...["(?:NeedsTeXFormat|RequirePackage|GetIdInfo)","Provides(?:Expl)?(?:Package|Class|File)","(?:DeclareOption|ProcessOptions)","(?:documentclass|usepackage|input|include)","makeat(?:letter|other)","ExplSyntax(?:On|Off)","(?:new|renew|provide)?command","(?:re)newenvironment","(?:New|Renew|Provide|Declare)(?:Expandable)?DocumentCommand","(?:New|Renew|Provide|Declare)DocumentEnvironment","(?:(?:e|g|x)?def|let)","(?:begin|end)","(?:part|chapter|(?:sub){0,2}section|(?:sub)?paragraph)","caption","(?:label|(?:eq|page|name)?ref|(?:paren|foot|super)?cite)","(?:alpha|beta|[Gg]amma|[Dd]elta|(?:var)?epsilon|zeta|eta|[Tt]heta|vartheta)","(?:iota|(?:var)?kappa|[Ll]ambda|mu|nu|[Xx]i|[Pp]i|varpi|(?:var)rho)","(?:[Ss]igma|varsigma|tau|[Uu]psilon|[Pp]hi|varphi|chi|[Pp]si|[Oo]mega)","(?:frac|sum|prod|lim|infty|times|sqrt|leq|geq|left|right|middle|[bB]igg?)","(?:[lr]angle|q?quad|[lcvdi]?dots|d?dot|hat|tilde|bar)"].map(e=>e+"(?![a-zA-Z@:_])")),a=new RegExp(["(?:__)?[a-zA-Z]{2,}_[a-zA-Z](?:_?[a-zA-Z])+:[a-zA-Z]*","[lgc]__?[a-zA-Z](?:_?[a-zA-Z])*_[a-zA-Z]{2,}","[qs]__?[a-zA-Z](?:_?[a-zA-Z])+","use(?:_i)?:[a-zA-Z]*","(?:else|fi|or):","(?:if|cs|exp):w","(?:hbox|vbox):n","::[a-zA-Z]_unbraced","::[a-zA-Z:]"].map(e=>e+"(?![a-zA-Z:_])").join("|")),t=[{begin:/[a-zA-Z@]+/},{begin:/[^a-zA-Z@]?/}],r=[{begin:/\^{6}[0-9a-f]{6}/},{begin:/\^{5}[0-9a-f]{5}/},{begin:/\^{4}[0-9a-f]{4}/},{begin:/\^{3}[0-9a-f]{3}/},{begin:/\^{2}[0-9a-f]{2}/},{begin:/\^{2}[\u0000-\u007f]/}],s={className:"keyword",begin:/\\/,relevance:0,contains:[{endsParent:!0,begin:n},{endsParent:!0,begin:a},{endsParent:!0,variants:r},{endsParent:!0,relevance:0,variants:t}]},c={className:"params",relevance:0,begin:/#+\d?/},o={variants:r},l={className:"built_in",relevance:0,begin:/[$&^_]/},d={className:"meta",begin:/% ?!(T[eE]X|tex|BIB|bib)/,end:"$",relevance:10},g=e.COMMENT("%","$",{relevance:0}),p=[s,c,o,l,d,g],u={begin:/\{/,end:/\}/,relevance:0,contains:["self",...p]},b=e.inherit(u,{relevance:0,endsParent:!0,contains:[u,...p]}),m={begin:/\[/,end:/\]/,endsParent:!0,relevance:0,contains:[u,...p]},f={begin:/\s+/,relevance:0},v=[b],h=[m],w=function(e,n){return{contains:[f],starts:{relevance:0,contains:e,starts:n}}},A=function(e,n){return{begin:"\\\\"+e+"(?![a-zA-Z@:_])",keywords:{$pattern:/\\[a-zA-Z]+/,keyword:"\\"+e},relevance:0,contains:[f],starts:n}},_=function(n,a){return e.inherit({begin:"\\\\begin(?=[ \t]*(\\r?\\n[ \t]*)?\\{"+n+"\\})",keywords:{$pattern:/\\[a-zA-Z]+/,keyword:"\\begin"},relevance:0},w(v,a))},z=(n="string")=>e.END_SAME_AS_BEGIN({className:n,begin:/(.|\r?\n)/,end:/(.|\r?\n)/,excludeBegin:!0,excludeEnd:!0,endsParent:!0}),x=function(e){return{className:"string",end:"(?=\\\\end\\{"+e+"\\})"}},Z=(e="string")=>({relevance:0,begin:/\{/,starts:{endsParent:!0,contains:[{className:e,end:/(?=\})/,endsParent:!0,contains:[{begin:/\{/,end:/\}/,relevance:0,contains:["self"]}]}]}}),k=[...["verb","lstinline"].map(e=>A(e,{contains:[z()]})),A("mint",w(v,{contains:[z()]})),A("mintinline",w(v,{contains:[Z(),z()]})),A("url",{contains:[Z("link"),Z("link")]}),A("hyperref",{contains:[Z("link")]}),A("href",w(h,{contains:[Z("link")]})),...[].concat(...["","\\*"].map(e=>[_("verbatim"+e,x("verbatim"+e)),_("filecontents"+e,w(v,x("filecontents"+e))),...["","B","L"].map(n=>_(n+"Verbatim"+e,w(h,x(n+"Verbatim"+e))))])),_("minted",w(h,w(v,x("minted"))))];return{name:"LaTeX",aliases:["tex"],contains:[...k,...p]}}e.exports=r},8175:function(e,n,a){function t(){t.warned||(t.warned=!0,console.log('Deprecation (warning): Using file extension in specifier is deprecated, use "highlight.js/lib/languages/latex" instead of "highlight.js/lib/languages/latex.js"'))}t(),e.exports=a("1555")}}]);
//# sourceMappingURL=chunk-577fc808.0c14810a.js.map