import{d as c,r as u,o as l,c as a,a as d,b as p}from"./vendor-3ac685e1.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))s(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const i of r.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&s(i)}).observe(document,{childList:!0,subtree:!0});function o(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function s(e){if(e.ep)return;e.ep=!0;const r=o(e);fetch(e.href,r)}})();const m=window.Cesium.Camera,f=window.Cesium.Rectangle,_=()=>{m.DEFAULT_VIEW_RECTANGLE=f.fromDegrees(75,0,140,60)};const w=window.Cesium.TileMapServiceImageryProvider,v=window.Cesium.Viewer,g=window.Cesium.buildModuleUrl,y=c({__name:"App",setup(n){const t=u();let o=null;const s="production",r="https://npm.elemecdn.com/cesium@1.104.0/Build/Cesium/";return window.CESIUM_BASE_URL=r,console.log(`模式: ${s}, CESIUM_BASE_URL: ${r}`),l(()=>{_(),o=new v(t.value,{imageryProvider:new w({url:g("Assets/Textures/NaturalEarthII")})}),console.log(o)}),(i,E)=>(d(),a("div",{id:"cesium-viewer",ref_key:"viewerDivRef",ref:t},null,512))}});const C=(n,t)=>{const o=n.__vccOpts||n;for(const[s,e]of t)o[s]=e;return o},h=C(y,[["__scopeId","data-v-910a59ea"]]);p(h).mount("#app");
//# sourceMappingURL=index-1f2283af.js.map
