var c=Object.defineProperty;var h=(i,e,t)=>e in i?c(i,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):i[e]=t;var s=(i,e,t)=>(h(i,typeof e!="symbol"?e+"":e,t),t);import{d,B as m,H as l,S as p,C as u,R as v,a as _,g,j as w,f as x,e as b,A as f,P as S}from"./index-606c6e35.js";import{l as y}from"./lodash-790ab962.js";import{t as P}from"./tweakpane-6ffcf4ab.js";import{d as z,h as M,l as B,c as j,o as k,p as E,e as L,a as r}from"./index-2256cc31.js";import{_ as A}from"./_plugin-vue_export-helper-c27b6911.js";import"./LoadingCreator-e47e8c93.js";var C=`varying vec2 vUv;

void main() {

  vec4 modelPosition = modelMatrix * vec4(position, 1.0);

  vec4 viewPosition = viewMatrix * modelPosition;
  vec4 projectedPosition = projectionMatrix * viewPosition;

  gl_Position = projectedPosition;

  vUv = uv;

}`,I=`precision mediump float;
uniform float uTime;
varying vec2 vUv;

void main() {
  vec3 col = 0.5 + 0.5*cos(uTime + vUv.xyx + vec3(0,2,4));
  gl_FragColor = vec4(col, 1);
}`;class N{constructor(e){s(this,"basic");s(this,"scene");s(this,"camera");s(this,"renderer");s(this,"controls");s(this,"sizes");s(this,"useShader",!0);s(this,"clock");s(this,"helper");s(this,"debug");s(this,"resources");s(this,"emitter");s(this,"option");s(this,"material");this.option=e,this.emitter=new d.EventEmitter,this.basic=new m(e.dom),this.scene=this.basic.scene,this.renderer=this.basic.renderer,this.controls=this.basic.controls,this.camera=this.basic.camera,this.helper=new l(this.scene),this.sizes=new p(this),this.clock=new u,this.debug=new P.Pane({title:"🎉 mingo 🎉",expanded:!0}),this.initialize(),this.resources=new v({},()=>{console.log("资源加载完成",this.resources),this.createBox(),this.createLight(),this.render()})}initialize(){this.scene.background=new _("#000"),this.camera.position.set(5,5,5),this.emitter.on("resize",()=>{this.renderer.setSize(Number(this.sizes.viewport.width),Number(this.sizes.viewport.height)),this.camera.aspect=Number(this.sizes.viewport.width)/Number(this.sizes.viewport.height),this.camera.updateProjectionMatrix()})}createBox(){const e=new g(2,2,2);this.useShader?this.material=new w({uniforms:{uTime:{value:0}},vertexShader:C,fragmentShader:I}):this.material=new x({map:this.resources.textures.earth});const t=new b(e,this.material);this.scene.add(t),this.controls.target=y.cloneDeep(t.position);const o={cubeY:t.position.y};this.controls.update(),this.debug.addInput(o,"cubeY",{min:-5,max:5,step:1e-5}).on("change",a=>{t.position.y=a.value})}createLight(){const e=new f(4210752,1);this.scene.add(e);const t=new S(16711680,1,0);t.position.set(500,800,150),this.scene.add(t)}destory(){this.debug.dispose()}render(){requestAnimationFrame(this.render.bind(this)),this.renderer.render(this.scene,this.camera),this.controls&&this.controls.update(),this.useShader&&(this.material.uniforms.uTime.value=this.clock.getElapsedTime())}}const n=i=>(E("data-v-6c406ea7"),i=i(),L(),i),T=n(()=>r("h1",{class:"title"},"vite + threejs template 基类",-1)),U=n(()=>r("div",{id:"threejs-canvas"},null,-1)),R=[T,U],q=z({__name:"index",setup(i){let e;return M(()=>{const t=document.querySelector("#threejs-canvas");e=new N({dom:t})}),B(()=>{e.destory()}),(t,o)=>(k(),j("div",null,R))}});const J=A(q,[["__scopeId","data-v-6c406ea7"]]);export{J as default};
