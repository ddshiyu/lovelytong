(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-07da6f1e"],{"0bf5":function(t,e,r){},aa88:function(t,e,r){"use strict";var n=r("0bf5"),a=r.n(n);a.a},b36b:function(t,e,r){"use strict";r.r(e);var n=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"app-container"},[r("el-form",{ref:"form",attrs:{model:t.form,"label-width":"120px"}},[r("el-form-item",{attrs:{label:"标题："}},[r("el-input",{model:{value:t.form.title,callback:function(e){t.$set(t.form,"title",e)},expression:"form.title"}})],1),t._v(" "),r("el-form-item",{attrs:{label:"权重："}},[r("el-input",{model:{value:t.form.priority,callback:function(e){t.$set(t.form,"priority",e)},expression:"form.priority"}})],1),t._v(" "),r("el-form-item",[r("el-button",{attrs:{type:"primary"},on:{click:t.onSubmit}},[t._v("Create")]),t._v(" "),r("el-button",{on:{click:t.onCancel}},[t._v("Cancel")])],1)],1)],1)},a=[],c=(r("96cf"),r("3b8d")),o=r("c405"),i={name:"AddCategory",data:function(){return{form:{title:"",priority:""}}},props:{id:String},created:function(){this.id&&this.fetchData()},methods:{fetchData:function(){var t=Object(c["a"])(regeneratorRuntime.mark((function t(){var e;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,Object(o["d"])(this.id);case 2:e=t.sent,this.form=e.data;case 4:case"end":return t.stop()}}),t,this)})));function e(){return t.apply(this,arguments)}return e}(),onSubmit:function(){var t=Object(c["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(!this.id){t.next=6;break}return t.next=3,Object(o["e"])(this.form,this.id);case 3:t.sent,t.next=9;break;case 6:return t.next=8,Object(o["a"])(this.form);case 8:t.sent;case 9:this.$router.push("/category/showCategory");case 10:case"end":return t.stop()}}),t,this)})));function e(){return t.apply(this,arguments)}return e}(),onCancel:function(){this.$message({message:"cancel!",type:"warning"})}}},u=i,s=(r("aa88"),r("2877")),f=Object(s["a"])(u,n,a,!1,null,"b58470b0",null);e["default"]=f.exports},c405:function(t,e,r){"use strict";r.d(e,"a",(function(){return a})),r.d(e,"c",(function(){return c})),r.d(e,"b",(function(){return o})),r.d(e,"d",(function(){return i})),r.d(e,"e",(function(){return u}));var n=r("b775");function a(t){return Object(n["a"])({url:"/rest/category",method:"post",data:t})}function c(){return Object(n["a"])({url:"/rest/category",method:"get"})}function o(t){return Object(n["a"])({url:"/rest/category/".concat(t),method:"delete"})}function i(t){return Object(n["a"])({url:"/rest/category/".concat(t),method:"get"})}function u(t,e){return Object(n["a"])({url:"/rest/category/".concat(e),method:"put",data:t})}}}]);