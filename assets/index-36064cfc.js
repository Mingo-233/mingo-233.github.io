var o=Object.defineProperty;var n=(s,e,i)=>e in s?o(s,e,{enumerable:!0,configurable:!0,writable:!0,value:i}):s[e]=i;var t=(s,e,i)=>(n(s,typeof e!="symbol"?e+"":e,i),i);import{d as a,B as c,H as h,S as d,C as l,R as m,A as u,P as p,b as v,j as w,V as g,e as b}from"./index-31c0b642.js";import{t as f}from"./tweakpane-9ec2a9db.js";import{d as x,h as _,l as z,c as P,o as C,a as y}from"./index-42613d43.js";import"./LoadingCreator-28297c1b.js";import"./vendor-c27b6911.js";const S=`varying vec2 vUv;

void main() {
  // 计算颜色渐变
  float distance = length(vUv - vec2(0.5));
  vec3 color = vec3(distance);

  gl_FragColor = vec4(color, 1.0);
}`,B=`
uniform float uTime;
uniform vec2 uCenter;
varying vec2 vUv;

void main() {
  vUv = uv;

  // 计算顶点位移向量
  vec3 newPosition = position;

  // 计算扩散波效果
  float distance = length(position.xy - uCenter);
  float waveFactor = sin(distance * 10.0 - uTime * 5.0) * 0.1;
  newPosition.z += waveFactor;

  gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
}
`;class L{constructor(e){t(this,"basic");t(this,"scene");t(this,"camera");t(this,"renderer");t(this,"controls");t(this,"sizes");t(this,"useShader",!0);t(this,"clock");t(this,"helper");t(this,"debug");t(this,"resources");t(this,"emitter");t(this,"option");t(this,"material");t(this,"box");t(this,"boxHelper");this.option=e,this.emitter=new a.EventEmitter,this.basic=new c(e.dom),this.scene=this.basic.scene,this.renderer=this.basic.renderer,this.controls=this.basic.controls,this.camera=this.basic.camera,this.helper=new h(this.scene),this.sizes=new d(this),this.clock=new l,this.debug=new f.Pane({title:"🎉 mingo 🎉",expanded:!0}),this.resources=new m({},()=>{this.initialize(),this.createLight(),console.log("资源加载完成",this.resources),this.createBox(),this.controls.update(),this.render()})}initialize(){this.camera.position.set(5,5,5),this.emitter.on("resize",()=>{this.renderer.setSize(Number(this.sizes.viewport.width),Number(this.sizes.viewport.height)),this.camera.aspect=Number(this.sizes.viewport.width)/Number(this.sizes.viewport.height),this.camera.updateProjectionMatrix()})}createLight(){const e=new u(4210752,1);this.scene.add(e);const i=new p(16777215,2,0);i.position.set(20,40,15),this.scene.add(i),this.helper.addGridHelper(),this.helper.addLight(i,"point")}createBox(){const e=new v(5,5,32,32),i=new w({vertexShader:B,fragmentShader:S,wireframe:!0,uniforms:{uTime:{value:0},uCenter:{value:new g(.5,.5)}}});this.material=i;const r=new b(e,i);r.rotateX(-Math.PI/2),this.scene.add(r)}destory(){this.debug.dispose()}render(){requestAnimationFrame(this.render.bind(this)),this.renderer.render(this.scene,this.camera),this.material.uniforms.uTime.value+=.01}}const M=y("div",{id:"threejs-canvas"},null,-1),k=[M],T=x({__name:"index",setup(s){let e;return _(()=>{const i=document.querySelector("#threejs-canvas");e=new L({dom:i})}),z(()=>{e.destory()}),(i,r)=>(C(),P("div",null,k))}});export{T as default};
