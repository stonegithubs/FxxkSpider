(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{20:function(e,t,n){n(21),e.exports=n(27)},21:function(e,t,n){"use strict";"undefined"==typeof Promise&&(n(22).enable(),window.Promise=n(25)),n(26),Object.assign=n(8)},27:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const a=n(1),r=n(29),l=n(17),s=n(36),o=n(56),c=n(57),u=n(58);r.render(a.createElement(l.HashRouter,null,a.createElement(l.Switch,null,a.createElement(c.default,null,a.createElement(l.Route,{path:"/",exact:!0,component:o.default}),a.createElement(l.Route,{path:"/create",component:s.default}),a.createElement(l.Route,{path:"/subscribe",component:u.default})))),document.getElementById("root"),()=>console.log("Page 服务已启动"))},36:function(e,t,n){"use strict";var a=this&&this.__decorate||function(e,t,n,a){var r,l=arguments.length,s=l<3?t:null===a?a=Object.getOwnPropertyDescriptor(t,n):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(e,t,n,a);else for(var o=e.length-1;o>=0;o--)(r=e[o])&&(s=(l<3?r(s):l>3?r(t,n,s):r(t,n))||s);return l>3&&s&&Object.defineProperty(t,n,s),s},r=this&&this.__metadata||function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};Object.defineProperty(t,"__esModule",{value:!0});const l=n(1),s=n(18),o=n(11);let c=class extends l.Component{constructor(e){super(e),this.state={gameName:"",startPage:1,endPage:void 0,task:null,selectType:"1"}}runPoll(e){this.sto=setTimeout(()=>{e&&e(),this.runPoll(e)},1e3)}handleSubmit(e){const{gameName:t,startPage:n,endPage:a}=this.state;e.preventDefault(),o.default.post("/api/task",{gameName:t,startPage:n,endPage:a}).then(e=>{0===e.data.error&&(alert("创建成功，请等待任务单运行"),this.props.history.push("/"))})}handleValueChange(e){const t={};t[e.target.name]=e.target.value,this.setState(t)}render(){return l.createElement("section",{style:{textAlign:"center"}},l.createElement("h1",null,"创建任务单"),l.createElement("form",{onSubmit:this.handleSubmit},l.createElement("label",null,"游戏名：（请输入 dota2 或者 csgo）"),l.createElement("input",{type:"text",onChange:this.handleValueChange,name:"gameName"}),l.createElement("br",null),l.createElement("br",null),l.createElement("label",null,"开始页数：（爬取开始的页数，一般为 1，平均一页1500条数据）"),l.createElement("input",{type:"number",onChange:this.handleValueChange,name:"startPage"}),l.createElement("br",null),l.createElement("br",null),l.createElement("label",null,"结束页数：（爬取开始的页数，填-1为最后一页）"),l.createElement("input",{type:"number",onChange:this.handleValueChange,name:"endPage"}),l.createElement("br",null),l.createElement("br",null),l.createElement("button",{type:"onSubmit"},"开始    ！")))}};c=a([s.autobind,r("design:paramtypes",[Object])],c),t.default=c},56:function(e,t,n){"use strict";var a=this&&this.__decorate||function(e,t,n,a){var r,l=arguments.length,s=l<3?t:null===a?a=Object.getOwnPropertyDescriptor(t,n):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(e,t,n,a);else for(var o=e.length-1;o>=0;o--)(r=e[o])&&(s=(l<3?r(s):l>3?r(t,n,s):r(t,n))||s);return l>3&&s&&Object.defineProperty(t,n,s),s},r=this&&this.__metadata||function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};Object.defineProperty(t,"__esModule",{value:!0});const l=n(1),s=n(11);let o=class extends l.Component{constructor(e){super(e),this.state={dataSource:[],progressString:""}}componentDidMount(){s.default.get("/api/task").then(e=>{const t=e.data[0];-1===t.status&&(this.runPoll(this.getTaskDetail(t._id)),this.progressInterval=setInterval(()=>{this.setState(e=>({progressString:e.progressString+"."}))},1e3)),this.setState({dataSource:e.data})})}componentWillUnmount(){clearInterval(this.progressInterval),clearTimeout(this.poll)}runPoll(e){this.poll=setTimeout(()=>{e&&e(),this.runPoll(e)},2e3)}getTaskDetail(e){return()=>{s.default.get(`/api/task/${e}`).then(e=>{1===e.data.status&&(clearTimeout(this.poll),clearInterval(this.progressInterval),this.componentDidMount())})}}renderStatus(e){switch(e){case-1:return"运行中";case 0:return"运行失败";case 1:return"成功！"}}handleExport(e){s.default.get(`/api/task/${e._id}/export`).then(e=>{0===e.data.error&&location.reload()})}renderResultUrl(e){if(1===e.status)return e.resultUrl?l.createElement("p",null,"数据下载链接：",l.createElement("a",{href:`/${e.resultUrl}`},e.resultUrl)):l.createElement("p",null,l.createElement("button",{onClick:this.handleExport.bind(this,e)},"导出数据"))}render(){const{dataSource:e,progressString:t}=this.state;return l.createElement("section",null,l.createElement("h1",null,"任务单列表："),e.length>0?e.map((e,n)=>l.createElement("section",{style:{background:"#818181",margin:"20px 20px",color:"white"}},l.createElement("p",null,"描述：",e.desc),l.createElement("p",null,"创建时间：",new Date(e.createdAt).toLocaleTimeString()),l.createElement("p",null,"状态：",this.renderStatus(e.status),0===n?t:null),1===e.status?l.createElement("p",null,"耗时：",e.timeConsuming):null,this.renderResultUrl(e))):"还没有任务单或者任务单已经过期自动删除，点击右上方去创建吧！")}};o=a([n(18).autobind,r("design:paramtypes",[Object])],o),t.default=o},57:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const a=n(1),r=n(17);t.default=class extends a.Component{render(){return a.createElement("div",null,a.createElement("nav",{style:{textAlign:"center",width:"100vw",margin:"0 0 50px 0"}},a.createElement(r.Link,{to:"/",style:{margin:"0 30px "}},"当前任务单"),a.createElement(r.Link,{to:"/create",style:{margin:"0 30px "}},"创建新任务单"),a.createElement(r.Link,{to:"/subscribe",style:{margin:"0 30px "}},"饰品监听")),this.props.children)}}},58:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const a=n(1);t.default=class extends a.Component{render(){return"开发中！"}}}},[[20,2,1]]]);