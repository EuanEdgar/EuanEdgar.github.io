(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0b727b"],{"1fe5":function(e,n){function t(e){return e?"string"===typeof e?e:e.source:null}function s(e){return r("(?:",e,")?")}function r(...e){const n=e.map(e=>t(e)).join("");return n}function i(e){const n=e.COMMENT("//","$",{contains:[{begin:/\\\n/}]}),t="decltype\\(auto\\)",r="[a-zA-Z_]\\w*::",i="<[^<>]+>",a="("+t+"|"+s(r)+"[a-zA-Z_]\\w*"+s(i)+")",c={className:"type",variants:[{begin:"\\b[a-z\\d_]*_t\\b"},{match:/\batomic_[a-z]{3,6}\b/}]},l="\\\\(x[0-9A-Fa-f]{2}|u[0-9A-Fa-f]{4,8}|[0-7]{3}|\\S)",o={className:"string",variants:[{begin:'(u8?|U|L)?"',end:'"',illegal:"\\n",contains:[e.BACKSLASH_ESCAPE]},{begin:"(u8?|U|L)?'("+l+"|.)",end:"'",illegal:"."},e.END_SAME_AS_BEGIN({begin:/(?:u8?|U|L)?R"([^()\\ ]{0,16})\(/,end:/\)([^()\\ ]{0,16})"/})]},d={className:"number",variants:[{begin:"\\b(0b[01']+)"},{begin:"(-?)\\b([\\d']+(\\.[\\d']*)?|\\.[\\d']+)((ll|LL|l|L)(u|U)?|(u|U)(ll|LL|l|L)?|f|F|b|B)"},{begin:"(-?)(\\b0[xX][a-fA-F0-9']+|(\\b[\\d']+(\\.[\\d']*)?|\\.[\\d']+)([eE][-+]?[\\d']+)?)"}],relevance:0},u={className:"meta",begin:/#\s*[a-z]+\b/,end:/$/,keywords:{keyword:"if else elif endif define undef warning error line pragma _Pragma ifdef ifndef include"},contains:[{begin:/\\\n/,relevance:0},e.inherit(o,{className:"string"}),{className:"string",begin:/<.*?>/},n,e.C_BLOCK_COMMENT_MODE]},g={className:"title",begin:s(r)+e.IDENT_RE,relevance:0},p=s(r)+e.IDENT_RE+"\\s*\\(",m=["asm","auto","break","case","const","continue","default","do","else","enum","extern","for","fortran","goto","if","inline","register","restrict","return","sizeof","static","struct","switch","typedef","union","volatile","while","_Alignas","_Alignof","_Atomic","_Generic","_Noreturn","_Static_assert","_Thread_local","alignas","alignof","noreturn","static_assert","thread_local","_Pragma"],_=["float","double","signed","unsigned","int","short","long","char","void","_Bool","_Complex","_Imaginary","_Decimal32","_Decimal64","_Decimal128","complex","bool","imaginary"],f={keyword:m,type:_,literal:"true false NULL",built_in:"std string wstring cin cout cerr clog stdin stdout stderr stringstream istringstream ostringstream auto_ptr deque list queue stack vector map set pair bitset multiset multimap unordered_set unordered_map unordered_multiset unordered_multimap priority_queue make_pair array shared_ptr abort terminate abs acos asin atan2 atan calloc ceil cosh cos exit exp fabs floor fmod fprintf fputs free frexp fscanf future isalnum isalpha iscntrl isdigit isgraph islower isprint ispunct isspace isupper isxdigit tolower toupper labs ldexp log10 log malloc realloc memchr memcmp memcpy memset modf pow printf putchar puts scanf sinh sin snprintf sprintf sqrt sscanf strcat strchr strcmp strcpy strcspn strlen strncat strncmp strncpy strpbrk strrchr strspn strstr tanh tan vfprintf vprintf vsprintf endl initializer_list unique_ptr"},b=[u,c,n,e.C_BLOCK_COMMENT_MODE,d,o],w={variants:[{begin:/=/,end:/;/},{begin:/\(/,end:/\)/},{beginKeywords:"new throw return else",end:/;/}],keywords:f,contains:b.concat([{begin:/\(/,end:/\)/,keywords:f,contains:b.concat(["self"]),relevance:0}]),relevance:0},y={begin:"("+a+"[\\*&\\s]+)+"+p,returnBegin:!0,end:/[{;=]/,excludeEnd:!0,keywords:f,illegal:/[^\w\s\*&:<>.]/,contains:[{begin:t,keywords:f,relevance:0},{begin:p,returnBegin:!0,contains:[e.inherit(g,{className:"title.function"})],relevance:0},{relevance:0,match:/,/},{className:"params",begin:/\(/,end:/\)/,keywords:f,relevance:0,contains:[n,e.C_BLOCK_COMMENT_MODE,o,d,c,{begin:/\(/,end:/\)/,keywords:f,relevance:0,contains:["self",n,e.C_BLOCK_COMMENT_MODE,o,d,c]}]},c,n,e.C_BLOCK_COMMENT_MODE,u]};return{name:"C",aliases:["h"],keywords:f,disableAutodetect:!0,illegal:"</",contains:[].concat(w,y,b,[u,{begin:e.IDENT_RE+"::",keywords:f},{className:"class",beginKeywords:"enum class struct union",end:/[{;:<>=]/,contains:[{beginKeywords:"final class struct"},e.TITLE_MODE]}]),exports:{preprocessor:u,strings:o,keywords:f}}}e.exports=i}}]);
//# sourceMappingURL=chunk-2d0b727b.ede5be7e.js.map