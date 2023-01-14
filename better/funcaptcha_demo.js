(async()=>{const h={linkedin:"3117BF26-4762-4F5A-8ED9-A85E69209A46",rockstar:"A5A70501-FCDE-4065-AF18-D9FAF06EF479",github:"20782B4C-05D0-45D7-97A0-41641055B6F6",paypal:"9409E63B-D2A5-9CBD-DBC0-5095707D0090",blizzard:"E8A75615-1CBA-5DFF-8032-D16BCF234E10",twitch:"E5554D43-23CC-1982-971D-6A2262A2CA24",demo1:"804380F4-6844-FFA1-ED4E-5877CA1F1EA4",demo2:"D39B0EE3-2973-4147-98EF-C92F93451E2D","ea signup":"73BEC076-3E53-30F5-B1EB-84F494D43DBA","ea signin":"0F5FE186-B3CA-4EDB-A39B-9B9A3397D01D"},w={outlook:"https://iframe.arkoselabs.com/B7D8911C-5CC8-A9A3-35B0-554ACEE604DA/index.html?mkt=en","outlook auth":"https://iframe-auth.arkoselabs.com/B7D8911C-5CC8-A9A3-35B0-554ACEE604DA/index.html?mkt=en"};let g=7;function E(){b("linkedin",0,1),b("rockstar",0,1),b("demo1",0,1),b("blizzard",0,1),b("twitch",0,1),b("paypal",0,1),A("outlook auth",1,1),b("github",1,1),b("demo2",1,1),A("outlook",1,1),b("ea signup",1,1),b("ea signin",1,1)}function b(t,n,o){o=o||g;for(let e=0;e<o;e++)!async function(e,t){var n=h[e],o="https://api.funcaptcha.com/fc/gt2/public_key/"+n,o=await Net.fetch(o,{headers:{accept:"*/*","accept-language":"en-US,en;q=0.9","cache-control":"no-cache","content-type":"application/x-www-form-urlencoded; charset=UTF-8",pragma:"no-cache","sec-ch-ua":'"Google Chrome";v="105", "Not)A;Brand";v="8", "Chromium";v="105"',"sec-ch-ua-mobile":"?0","sec-ch-ua-platform":'"Linux"',"sec-fetch-dest":"empty","sec-fetch-mode":"cors","sec-fetch-site":"cross-site"},referrer:"",referrerPolicy:"strict-origin-when-cross-origin",body:`bda=&public_key=${n}&site=${encodeURIComponent("")}&language=en&userbrowser=Mozilla%2F5.0%20(X11%3B%20Linux%20x86_64)%20AppleWebKit%2F537.36%20(KHTML%2C%20like%20Gecko)%20Chrome%2F105.0.0.0%20Safari%2F537.36&rnd=`+Math.random(),method:"POST",mode:"cors",credentials:"omit"}),n=JSON.parse(o),r={};for(const i of n.token.split("|")){var a=i.split("=");let e=a[0],t=a[1];a[1]||(e="token",t=a[0]),e.endsWith("url")&&(t=decodeURIComponent(t)),r[e]=t}o=new URLSearchParams(r).toString(),n="https://api.funcaptcha.com/fc/gc/?"+o;c(e,t,n)}(t,n)}function A(t,n,o){o=o||g;for(let e=0;e<o;e++)c(t,n,w[t])}function c(e,t,n){var o=document.createElement("div"),r=(o.classList.add("iframe_wrap"),document.createElement("iframe"));o.append(r),r.frameborder=0,r.scrolling="no",r.src=n;let a=document.querySelector("#iframe_row_"+t);a||((a=document.createElement("div")).classList.add("iframe_row"),a.id="iframe_row_"+t,document.body.append(a));r=document.createElement("div"),r.classList.add("name"),r.innerHTML=e,n=document.createElement("div");n.append(r),n.append(o),a.append(n)}!function e(){document.body.innerHTML="";const t=[`body, html {
                background-color: #212121;
            }`,`.input_row {
                display: flex;
                flex-direction: row;
                flex-wrap: wrap;
                justify-content: center;
            }`,`.input_row > * {
                height: 20px;
                line-height: 20px;
                padding: 0;
                border: 0;
                font-size: 12px;
            }`,`.input_row > input[type="button"] {
                width: 100px;
                cursor: pointer;
                transition: 200ms all;
            }`,`.input_row > input[type="button"]:hover {
                opacity: 0.8;
            }`,`#nframes_label {
                background-color: #fff;
                color: #222;
                width: 70px;
                text-align: center;
            }`,`#nframes, #nframes:active {
                width: 30px;
                border: none;
                outline: none;
            }`,`.name {
                color: #fff;
            }`,`.iframe_row {
                display: flex;
                flex-direction: row;
                flex-wrap: wrap;
                justify-content: center;
            }`,`.iframe_wrap {
                background-color: #eee;
                width: 175px;
                height: 150px;
                padding: 0;
                overflow: hidden;
            }`,`iframe {
                width: 350px;
                height: 300px;
                border: none;
                -ms-zoom: 0.5;
                -moz-transform: scale(0.5);
                -moz-transform-origin: 0 0;
                -o-transform: scale(0.5);
                -o-transform-origin: 0 0;
                -webkit-transform: scale(0.5);
                -webkit-transform-origin: 0 0;
            }`];const n=document.body.appendChild(document.createElement("style")).sheet;for(const r in t)n.insertRule(t[r],r);const o=6;let r=0;let a=1;const i={};i[0]=document.createElement("div");i[0].classList.add("input_row");document.body.append(i[0]);const c=document.createElement("div");c.id="nframes_label";c.innerText="# iframes";i[0].append(c);const s=document.createElement("input");s.id="nframes";s.placeholder="Number of iframes";s.value=g;s.addEventListener("input",()=>{g=parseInt(s.value)});i[0].append(s);const d={reset:{row:0,fn:e,args:[]},all:{row:0,fn:E,args:[]}};for(const l in h)r++%6==0&&a++,d[l]={row:a,fn:b,args:[l,0]};for(const p in w)r++%6==0&&a++,d[p]={row:a,fn:A,args:[p,0]};for(const[m,u]of Object.entries(d)){const a=u.row,f=(u.row in i||(i[u.row]=document.createElement("div"),i[u.row].classList.add("input_row"),document.body.append(i[u.row])),document.createElement("input"));f.type="button",f.value=m,f.addEventListener("click",()=>{e(),u.fn(...u.args)}),i[u.row].append(f)}}(),b("ea signup",0,g)})();
