(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[0],{117:function(e,t,a){e.exports=a(187)},122:function(e,t,a){},142:function(e,t,a){e.exports=a.p+"static/media/text-logo.e32e0431.svg"},147:function(e,t,a){e.exports=a.p+"static/media/av0.22d5a756.svg"},148:function(e,t,a){e.exports=a.p+"static/media/av1.cba8f370.svg"},149:function(e,t,a){e.exports=a.p+"static/media/av2.bb606bf5.svg"},150:function(e,t,a){e.exports=a.p+"static/media/av3.0893151d.svg"},151:function(e,t,a){e.exports=a.p+"static/media/av4.62fb6254.svg"},152:function(e,t,a){e.exports=a.p+"static/media/av5.36081bb6.svg"},183:function(e,t){},187:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),s=a(9),c=a.n(s),o=(a(122),a(13)),i=a.n(o),l=a(28),m=a(8),u=a(33),d=a(19),f=a.n(d),p=a(102),v=Object(p.a)(),g=a(103),b=a.n(g),E=a(226),h=function(e){var t=function(t){e.history.push(t)};return r.a.createElement("div",{className:"home"},r.a.createElement("div",{className:"big-text-container"},r.a.createElement("div",{className:"big-text"},"make friends "),r.a.createElement("div",{className:"swiper-container"},r.a.createElement(b.a,{direction:"vertical",spaceBetween:30,centeredSlides:!0,autoplay:{delay:1500,disableOnInteraction:!1},loop:!0,containerClass:".swiper-container",ContainerEl:"div",noSwiping:!0},r.a.createElement("div",{className:"swiper-slide"},r.a.createElement("div",{className:"blue-text"},"by interest")),r.a.createElement("div",{className:"swiper-slide"},r.a.createElement("div",{className:"red-text"},"randomly")),r.a.createElement("div",{className:"swiper-slide"},r.a.createElement("div",{className:"green-text"},"worldwide"))))),r.a.createElement("div",{className:"home-bottom"},r.a.createElement("img",{style:{},src:a(142)}),r.a.createElement("div",{className:"home-buttons"},r.a.createElement(E.a,{onClick:function(){return t("/login")},style:{color:"#4F4F4F",padding:"0.3rem 0.9rem",fontSize:"20px"}},"Log in"),r.a.createElement(E.a,{onClick:function(){return t("/register")},variant:"contained",style:{backgroundColor:"#4F4F4F",padding:"0.3rem 0.9rem",color:"white",margin:"0 0 0 3rem",fontSize:"20px"}},"Register"))))},y=a(12),O=a(18),j=a(31),w=a(235),N=function(e){var t=e.userDataState,n=t.userData,s=t.setUserData,c=e.messageState,o=c.message,i=c.setMessage,l=e.accessState,m=(l.access,l.setAccess),u=function(e){var t=e.target,a=t.value,r=t.name;s(Object(O.a)({},n,Object(y.a)({},r,a)))};return r.a.createElement("div",{className:"auth-wrap"},r.a.createElement("div",{className:"split left"},r.a.createElement("div",{className:"auth-title"},r.a.createElement("span",{style:{fontWeight:"400"}},"Chattitude |"),"  LOG IN"),r.a.createElement("div",{className:"centered"},r.a.createElement("p",{style:{backgroundColor:"#f28182",color:"white"}},o),r.a.createElement("form",{className:"form-wrap",onSubmit:function(t){t.preventDefault(),f.a.post("".concat(e.url,"/login"),{username:n.username,password:n.password}).then((function(t){var a=t.data;200===t.status&&(localStorage.setItem("accessToken",a.data.jwt),s({username:a.data.user.username,bio:a.data.user.bio,rep:a.data.user.rep}),e.history.push("/dashboard")),m(a.success),i(a.message)})).catch((function(e){i(e.message)}))}},r.a.createElement(w.a,{style:{margin:"0 0 1rem 0"},fullWidth:!0,required:!0,id:"outlined-basic",variant:"outlined",label:"username",type:"text",name:"username",onChange:u}),r.a.createElement(w.a,{style:{margin:"0 0 1rem 0"},fullWidth:!0,required:!0,id:"outlined-basic",variant:"outlined",label:"password",type:"password",name:"password",onChange:u}),r.a.createElement("div",null,r.a.createElement(E.a,{style:{backgroundColor:"#74D69D"},fullWidth:!0,variant:"contained",type:"submit",color:"primary"}," Submit"))),r.a.createElement("div",null,"Don't have an account yet? ",r.a.createElement(j.a,{to:"/register"},"Register")))),r.a.createElement("div",{className:"split right split-rect"},r.a.createElement("div",{className:"centered"},r.a.createElement("img",{style:{height:"20rem"},src:a(86)}))))},S=function(e){var t=e.accessState,a=(t.access,t.setAccess);return r.a.createElement("div",{className:"logout-button-container"},r.a.createElement(E.a,{style:{backgroundColor:"#FF8383",padding:"0.25rem 0.75rem",color:"white"},variant:"contained",type:"submit",onClick:function(){localStorage.removeItem("accessToken"),a(!1),e.history.push("/")}},"Log out"))},k=function(e){var t,n=e.userDataState,s=n.userData,c=n.setUserData,o=e.messageState,i=o.message,l=o.setMessage,m=function(e){var t=e.target,a=t.value,n=t.name;c(Object(O.a)({},s,Object(y.a)({},n,a)))};return r.a.createElement("div",{className:"auth-wrap"},r.a.createElement("div",{className:"split right"},r.a.createElement("div",{className:"auth-title",style:{marginTop:"4rem"}},r.a.createElement("span",{style:{fontWeight:"400"}},"Chattitude |")," REGISTER"),r.a.createElement("div",{className:"centered"},r.a.createElement("p",{style:{backgroundColor:"#f28182",color:"white"}},i),r.a.createElement("form",{className:"form-wrap",onSubmit:function(t){t.preventDefault(),f.a.post("".concat(e.url,"/register"),{username:s.username,bio:s.bio,password:s.password}).then((function(t){var a=t.data;200===t.status&&(localStorage.setItem("accessToken",a.data.jwt),c({username:a.data.user.username,bio:a.data.user.bio,rep:a.data.user.rep}),console.log("gonna push to dash"),e.history.push("/dashboard")),l(a.message)})).catch((function(e){l(e.message)}))}},r.a.createElement(w.a,{style:{margin:"0 0 1rem 0"},fullWidth:!0,required:!0,id:"outlined-basic",variant:"outlined",label:"username",type:"text",name:"username",onChange:m}),r.a.createElement(w.a,{style:{margin:"0 0 1rem 0"},fullWidth:!0,required:!0,id:"outlined-basic",variant:"outlined",label:"password",type:"password",name:"password",onChange:m}),r.a.createElement(w.a,(t={style:{margin:"0 0 1rem 0"},fullWidth:!0,required:!0,id:"outlined-multiline-static",label:"Multiline",multiline:!0,rows:3},Object(y.a)(t,"label","short bio"),Object(y.a)(t,"type","bio"),Object(y.a)(t,"name","bio"),Object(y.a)(t,"inputProps",{maxLength:80}),Object(y.a)(t,"variant","outlined"),Object(y.a)(t,"onChange",m),t)),r.a.createElement("div",null,r.a.createElement("div",{style:{marginBottom:"10px"}},"By clicking submit you are agreeing to the ",r.a.createElement("a",{target:"_blank",rel:"noopener noreferrer",href:"https://www.privacypolicygenerator.info/live.php?token=rSVBZEcB5WAFTWtpcB1AJnzhOE8tPpUu"},"Privacy policy")),r.a.createElement(E.a,{style:{backgroundColor:"#74D69D"},fullWidth:!0,variant:"contained",type:"submit",color:"primary"}," Submit"))),r.a.createElement("div",null,"Already registered? ",r.a.createElement(j.a,{to:"/login"},"Login")))),r.a.createElement("div",{className:"split left split-rect"},r.a.createElement("div",{className:"centered"},r.a.createElement("img",{style:{height:"20rem"},src:a(86)}))))},x=a(110),D=function(e){var t=e.children,a=e.verifyToken,s=e.access,c=e.loading,o=Object(x.a)(e,["children","verifyToken","access","loading"]);return Object(n.useEffect)((function(){a()}),[]),r.a.createElement("div",null,r.a.createElement(u.b,Object.assign({},o,{render:function(e){return c?r.a.createElement("div",{className:"loading"},"Loading..."):!0===s?t:!1===s?r.a.createElement(u.a,{to:{pathname:"/login",state:{from:e.location}}}):void 0}})))},C=function(e){var t=e.username.substring(0,1),n=e.size,s=["abcde","fghij","klmn","opqr","stuv","wxyz"],c=function(){for(var e,a=0;a<s.length;a++)if(s[a].includes(t)){e=a;break}return e};return r.a.createElement("div",null,"large"===n&&r.a.createElement("img",{style:{height:"6rem",margin:"0 1.2rem 1.2rem 0"},src:a(87)("./av".concat(c(),".svg"))})," ","small"===n&&r.a.createElement("img",{style:{height:"2.7rem"},src:a(87)("./av".concat(c(),".svg"))}))},R=function(e){var t=["random","programming","design","history","sport","politics","foreign_languages","media","anime","art","music","business","rap_music","rock_music","drawing","movies","health_care","news","mathematics","literature"].sort(),a=e.roomState,s=a.room,c=a.setRoom,o=Object(n.useState)([]),i=Object(m.a)(o,2),l=i[0],u=i[1],d=Object(n.useState)(""),f=Object(m.a)(d,2),p=f[0],v=f[1],g=function(e){e.preventDefault();var t=e.target.value.slice(1);console.log("e "+t),c(Object(O.a)({},s,{topic:t}))};Object(n.useEffect)((function(){console.log(s)}),[s]),Object(n.useEffect)((function(){u(""===p?t:t.filter((function(e){return e.includes(p)})))}),[p]);return r.a.createElement("div",{className:"topic-selection"},r.a.createElement("input",{className:"search-input",placeholder:"search...",onChange:function(e){e.preventDefault(),v(e.target.value)}}),r.a.createElement("div",{className:"topics"},l.map((function(e){return r.a.createElement("input",{className:"topic",type:"button",value:"#"+e,onClick:g})}))))};var F=function(e,t){var a=Object(n.useRef)();Object(n.useEffect)((function(){a.current=e}),[e]),Object(n.useEffect)((function(){if(null!==t){var e=setInterval((function(){a.current()}),t);return function(){return clearInterval(e)}}}),[t])},I=function(e){var t=e.isSearching,a=Object(n.useState)({mins:0,secs:0}),s=Object(m.a)(a,2),c=s[0],o=s[1];return F((function(){59===c.secs?o({mins:c.mins+1,secs:0}):o({mins:c.mins,secs:c.secs+1})}),t?1e3:null),r.a.createElement("div",null,c.mins,":",c.secs)},W=function(e){var t=e.accessState,s=(t.access,t.setAccess,e.userDataState),c=s.userData,o=s.setUserData,d=e.roomState,p=d.room,g=d.setRoom,b=Object(n.useState)(!1),h=Object(m.a)(b,2),y=h[0],j=h[1],w=Object(n.useState)(!1),N=Object(m.a)(w,2),k=N[0],x=N[1],D=Object(n.useState)(),W=Object(m.a)(D,2),T=W[0],U=W[1],A=Object(n.useState)(3e3),z=Object(m.a)(A,2),L=z[0];z[1];F(Object(l.a)(i.a.mark((function e(){return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,B();case 2:if(k){e.next=8;break}return e.next=5,M();case 5:console.log("i found it"),e.next=12;break;case 8:if(p.isReady){e.next=12;break}return e.next=11,_();case 11:console.log("i checked it");case 12:case"end":return e.stop()}}),e)}))),y?L:null),Object(n.useEffect)((function(){console.log(p)}),[]),Object(n.useEffect)((function(){console.log("room id after set "+p.id),console.log("LOG:\nuserdata: ".concat(a(44).inspect(c),"\nroom: ").concat(a(44).inspect(p),"\nflags: ").concat(a(44).inspect({search:y,found:k,ready:p.isReady}))),""!==p.id&&(j(!1),g(Object(O.a)({},p,{isReady:!0})),o(Object(O.a)({},c,{roomId:p.id})))}),[p]);var B=function(){var t=Object(l.a)(i.a.mark((function t(){return i.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:f.a.get("".concat(e.url,"/mm/get-users-searching")).then((function(e){return e.data.data})).then((function(e){U(e.usersSearching)}));case 1:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}(),M=function(){var t=Object(l.a)(i.a.mark((function t(){return i.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:f.a.post("".concat(e.url,"/mm/find-room"),{topic:p.topic.toLowerCase()}).then((function(e){console.log(e);var t=e.data.data;console.log("fr "+t.isRoomFound),x(t.isRoomFound)}));case 1:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}(),_=function(){var t=Object(l.a)(i.a.mark((function t(){var n,r;return i.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,f.a.post("".concat(e.url,"/mm/confirm-room-readiness"),{topic:p.topic.toLowerCase()});case 2:n=t.sent,r=n.data.data,console.log(r),console.log("we are here"),r.isRoomReady&&(console.log("room id before set"+a(44).inspect(p.id)),g(r.room),g(Object(O.a)({},p,{isReady:!1})));case 7:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}(),q=function(){var t=Object(l.a)(i.a.mark((function t(a){return i.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return console.log("i was called! (break)"),a.preventDefault(),j(!1),x(!1),t.next=6,f.a.post("".concat(e.url,"/mm/break-search"));case 6:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}();return r.a.createElement("div",{className:"background-main"},r.a.createElement("div",{className:"main-container"},console.log("from dash "+e.access),r.a.createElement("div",{className:"split-mm left"},r.a.createElement("div",{className:"userdata-container"},r.a.createElement("div",{className:"userdata-inner"},r.a.createElement(C,{username:c.username,size:"large"}),r.a.createElement("div",{className:"userdata-right-from-pic"},r.a.createElement("div",{className:"username"},"@",c.username),r.a.createElement("div",{className:"rep"},"reputation: ",r.a.createElement("span",{className:"rep-count"},c.rep)))),r.a.createElement("div",{className:"bio"},c.bio)),r.a.createElement(S,{history:v,accessState:e.accessState})),r.a.createElement("div",{className:"mm-settings-container split-mm right-mm"},r.a.createElement("div",{className:"mm-inner"},p.topic?r.a.createElement("div",null,"selected topic: #",p.topic):r.a.createElement("div",null,"select topic to chat"),r.a.createElement(R,{roomState:e.roomState}),r.a.createElement(E.a,{fullWidth:!0,style:{backgroundColor:null===p.topic?"#d5dce3":y?"#FF8383":"#74D69D",color:"white"},variant:"contained",type:"submit",onClick:y?q:function(){return j(!0)},disabled:null===p.topic},y?r.a.createElement("div",null,"break"):r.a.createElement("div",null,"start")),y&&r.a.createElement(I,{isSearching:y}),y&&r.a.createElement("div",null,"users searching: ",T))),p.isReady&&r.a.createElement(u.a,{to:"/room"})))},T=a(109),U=a(105),A=a.n(U),z=a(231),L=a(238),B=a(234),M=a(232),_=a(233),q=Object(z.a)((function(e){return{heading:{display:"flex",flexDirection:"row"},panel:{margin:"0 0 0.5rem 8%",padding:"0"},smth:{width:"90%","&:hover":{background:"#d5dce3"}}}}));function V(e){var t,a=q(),n=r.a.useState(!1),s=Object(m.a)(n,2),c=s[0],o=s[1];return r.a.createElement("div",{className:a.panel},r.a.createElement(L.a,{className:a.smth,style:{overflow:"hidden"},expanded:"panel"===c,onChange:(t="panel",function(e,a){o(!!a&&t)})},r.a.createElement(M.a,{className:a.smth,style:{overflow:"hidden"},"aria-controls":"panel4bh-content",id:"panel4bh-header"},r.a.createElement(_.a,{style:{overflow:"hidden"},className:a.heading},r.a.createElement("div",{className:"flexx"},r.a.createElement(C,{username:e.user.username,size:"small"}),r.a.createElement("div",{className:"member-username"},"@",e.user.username)))),r.a.createElement(B.a,null,r.a.createElement(_.a,null,r.a.createElement("div",null,r.a.createElement("span",{style:{color:"#74d69d"}},"reputation:")," ",e.user.rep),r.a.createElement("div",null,r.a.createElement("span",{style:{color:"#74d69d"}},"bio:")," ",e.user.bio)))))}var G,J=a(108),P=a.n(J),H=a(189),Z=a(237),$=a(106),K=a.n($),Q=a(107),X=a.n(Q),Y=function(e){e.userData;var t=e.roomState,a=t.room,s=t.setRoom,c=Object(n.useState)(0),o=Object(m.a)(c,2),d=o[0],p=o[1],v=Object(n.useState)(!1),g=Object(m.a)(v,2),b=g[0],E=g[1],h=function(){var t=Object(l.a)(i.a.mark((function t(n,r){var c,o;return i.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:p(d+1),c=a.users,o=0;case 3:if(!(o<c.length)){t.next=11;break}if(c[o].username!==r.username){t.next=7;break}return c[o].isRated=!0,t.abrupt("break",11);case 7:case 8:o++,t.next=3;break;case 11:return s(Object(O.a)({},a,{users:c})),t.next=15,f.a.post("".concat(e.url,"/room/add-rep"),{valueToAdd:n,username:r.username});case 15:case"end":return t.stop()}}),t)})));return function(e,a){return t.apply(this,arguments)}}();return r.a.createElement("div",{className:"rate-users-container"},r.a.createElement("div",{className:"rate-title"},"How do you like these guys?"),r.a.createElement("div",{className:"rating"},a.users.map((function(e){return r.a.createElement("div",{className:"user-to-rate"},r.a.createElement("div",{className:"user-data-rate"},r.a.createElement(C,{username:e.username,size:"small"}),r.a.createElement("div",{className:"member-username"},"@",e.username)),e.isRated?r.a.createElement("div",{style:{marginRight:"2rem"}},"rated"):r.a.createElement("div",{className:"rate-buttons-container"},r.a.createElement(H.a,{color:"primary",style:{color:"#74D69D"},onClick:function(){return h(1,e)}},r.a.createElement(K.a,null)),r.a.createElement(H.a,{color:"primary",style:{color:"#FF8383"},onClick:function(){return h(-1,e)}},r.a.createElement(X.a,null))))})),b&&r.a.createElement(u.a,{to:"/dashboard"})),3===d&&r.a.createElement("input",{type:"button",value:"go back",onClick:function(){return E(!0)}}))};function ee(e){var t=e.openModalState,a=t.open;t.setOpen;return r.a.createElement("div",null,r.a.createElement(Z.a,{open:a,"aria-labelledby":"alert-dialog-title","aria-describedby":"alert-dialog-description"},r.a.createElement(Y,{url:e.url,userData:e.userData,roomState:e.roomState})))}var te=function(e){var t=Object(n.useState)(!1),a=Object(m.a)(t,2),s=a[0],c=a[1],o=e.userDataState,i=o.userData,l=o.setUserData,u=e.roomState,d=u.room,f=u.setRoom,p=Object(n.useState)(""),v=Object(m.a)(p,2),g=v[0],b=v[1],E=Object(n.useState)([]),h=Object(m.a)(E,2),y=h[0],j=h[1],w=Object(n.useState)(!1),N=Object(m.a)(w,2),S=N[0],k=N[1];Object(n.useEffect)((function(){return G=A.a.connect("".concat(e.url)),console.log(i),G.emit("connectRoom",i.roomId),G.emit("init"),G.on("init",(function(e){j(e.messages)})),function(){x()}}),[]),Object(n.useEffect)((function(){G.on("message",(function(e){j([].concat(Object(T.a)(y),[e]))}))})),Object(n.useEffect)((function(){S&&x()}),[S]);var x=function(){d.users.length<=2&&G.emit("disconnectRoom");var e=d.users;console.log("we are leaving"),e=(e=d.users.filter((function(e){return e.username!==i.username}))).map((function(e){return e.isRated=!1,e})),f(Object(O.a)({},d,{id:"",users:e,isReady:!1})),l(Object(O.a)({},i,{roomId:""})),G.emit("disconnectUser",i.username)};return r.a.createElement("div",{className:"background-main"},r.a.createElement("div",{className:"main-container"},r.a.createElement("div",{className:"room-members"},r.a.createElement("div",{className:"title"},r.a.createElement(H.a,{color:"primary",style:{color:"white"},onClick:function(){k(!0),c(!0)}},r.a.createElement(P.a,null)),r.a.createElement(ee,{url:e.url,openModalState:{open:s,setOpen:c},userData:i,roomState:e.roomState}),r.a.createElement("div",{className:"title-text"},"#",d.topic)),r.a.createElement("div",{className:"members-container"},d.users.map((function(e){return r.a.createElement(V,{user:e})})))),r.a.createElement("div",{className:"messenger"},r.a.createElement("div",{className:"messages"},r.a.createElement("ul",null,0===y.length?r.a.createElement("div",{className:"empty-msgs"},'Say something, e.g. "Hi"'):y.map((function(e){return r.a.createElement("li",{className:e.sender.username===i.username?"msg-me":"msg-not-me"},e.sender.username!==i.username&&r.a.createElement("div",{className:"msg-sender-username"},"@"+e.sender.username!==i.username&&e.sender.username),r.a.createElement("div",{className:"message-text"},e.message))})))),r.a.createElement("form",{className:"msg-form",onSubmit:function(e){e.preventDefault();var t={message:g,sender:i};G.emit("message",t),b("")}},r.a.createElement("input",{placeholder:"type here",className:"msg-input",onChange:function(e){e.preventDefault(),b(e.target.value)},value:g}),r.a.createElement("button",{className:"msg-send"},">")))))},ae=function(e){return r.a.createElement("div",null,r.a.createElement(te,{url:e.url,userDataState:e.userDataState,roomState:e.roomState}))},ne=function(){f.a.defaults.headers.common.Authorization="Bearer ".concat(localStorage.getItem("accessToken"));var e=window.location.origin,t=Object(n.useState)({username:null,password:null,bio:null,roomId:null,rep:null}),a=Object(m.a)(t,2),s=a[0],c=a[1],o=Object(n.useState)({id:"",topic:null,users:[],isReady:!1}),d=Object(m.a)(o,2),p=d[0],g=d[1],b=Object(n.useState)(!1),E=Object(m.a)(b,2),y=E[0],O=E[1],j=Object(n.useState)(!0),w=Object(m.a)(j,2),S=w[0],x=w[1],C=Object(n.useState)(),R=Object(m.a)(C,2),F=R[0],I=R[1],T=function(){var t=Object(l.a)(i.a.mark((function t(){return i.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return console.log('access before verification" '+y),console.log(f.a.defaults.headers.common.Authorization),t.next=4,f.a.post("".concat(e,"/token")).then((function(e){return e.data.data})).then((function(e){console.log(e),e.tokenVerificationData.access?c(e.tokenVerificationData.user):v.push("/login"),O(e.tokenVerificationData.access),I(e.tokenVerificationData.message),console.log("access from verification: "+e.tokenVerificationData.access),x(!1),console.log("access after verification: "+y)}));case 4:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}();return r.a.createElement(u.c,{history:v},r.a.createElement(u.d,null,r.a.createElement(u.b,{exact:!0,path:"/"},r.a.createElement(h,{history:v})),r.a.createElement(u.b,{exact:!0,path:"/login",render:function(t){return y?(console.log("a l "+y),r.a.createElement(u.a,{to:"/dashboard"})):(console.log("a l "+y),r.a.createElement(N,Object.assign({},t,{url:e,accessState:{access:y,setAccess:O},userDataState:{userData:s,setUserData:c},messageState:{message:F,setMessage:I}})))}}),r.a.createElement(u.b,{exact:!0,path:"/register",render:function(t){return y?r.a.createElement(u.a,{to:"/dashboard"}):r.a.createElement(k,Object.assign({},t,{url:e,history:v,userDataState:{userData:s,setUserData:c},messageState:{message:F,setMessage:I}}))}}),r.a.createElement(D,{exact:!0,path:"/dashboard",verifyToken:T,access:y,loading:S},r.a.createElement(W,{url:e,accessState:{access:y,setAccess:O},userDataState:{userData:s,setUserData:c},roomState:{room:p,setRoom:g}})),r.a.createElement(D,{exact:!0,path:"/room",verifyToken:T,access:y,loading:S},r.a.createElement(ae,{url:e,history:v,userDataState:{userData:s,setUserData:c},roomState:{room:p,setRoom:g}}))))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(r.a.createElement(ne,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))},86:function(e,t,a){e.exports=a.p+"static/media/auth.e53d42c7.svg"},87:function(e,t,a){var n={"./av0.svg":147,"./av1.svg":148,"./av2.svg":149,"./av3.svg":150,"./av4.svg":151,"./av5.svg":152};function r(e){var t=s(e);return a(t)}function s(e){if(!a.o(n,e)){var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}return n[e]}r.keys=function(){return Object.keys(n)},r.resolve=s,e.exports=r,r.id=87}},[[117,1,2]]]);
//# sourceMappingURL=main.8cf55411.chunk.js.map