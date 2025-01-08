var D=Object.defineProperty;var B=(i,e,t)=>e in i?D(i,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):i[e]=t;var r=(i,e,t)=>(B(i,typeof e!="symbol"?e+"":e,t),t);import{b as R,j as w,a as m,D as M,e as P,k as d,Q as O,l as E,F as _,m as N,n as Y,o as k,d as V,B as W,H as q,S as U,C as $,G as z,R as H,A as Q,p as j,L as X,E as J}from"./index-606c6e35.js";import{t as K}from"./tweakpane-6ffcf4ab.js";import{d as Z,h as ee,l as te,c as oe,o as ie,a as re}from"./index-2256cc31.js";import"./LoadingCreator-e47e8c93.js";import"./_plugin-vue_export-helper-c27b6911.js";const L=`
precision mediump float;

float distanceTo(vec2 src, vec2 dst) {
    float dx = src.x - dst.x;
    float dy = src.y - dst.y;
    float dv = dx * dx + dy * dy;
    return sqrt(dv);
} 

float lerp(float x, float y, float t) {
    return (1.0 - t) * x + t * y;
}

#define PI 3.14159265359
#define PI2 6.28318530718

`,ne={vertexShader:`
    #define PI 3.14159265359

    uniform mediump float uStartTime;
    uniform mediump float time;
    uniform mediump float uRange;
    uniform mediump float uSpeed;

    uniform vec3 uColor;
    uniform vec3 uActive;
    uniform vec3 uMin;
    uniform vec3 uMax;

    varying vec3 vColor;

    float lerp(float x, float y, float t) {
        return (1.0 - t) * x + t * y;
    }
    void main() { 
        if (uStartTime >= 0.99) {
            float iTime = mod(time * uSpeed - uStartTime, 1.0);
            float rangeY = lerp(uMin.y, uMax.y, iTime);
            if (rangeY < position.y && rangeY > position.y - uRange) {
                float index = 1.0 - sin((position.y - rangeY) / uRange * PI);
                float r = lerp(uActive.r, uColor.r, index);
                float g = lerp(uActive.g, uColor.g, index);
                float b = lerp(uActive.b, uColor.b, index);

                vColor = vec3(r, g, b);
            } else {
                vColor = uColor;
            }
        }
        vec3 vPosition = vec3(position.x, position.y, position.z * uStartTime);
        gl_Position = projectionMatrix * modelViewMatrix * vec4(vPosition, 1.0);
    } 
    `,fragmentShader:` 
    ${L} 
    uniform float time;
    uniform float uOpacity;
    uniform float uStartTime;

    varying vec3 vColor; 

    void main() {

        gl_FragColor = vec4(vColor, uOpacity * uStartTime);
    }
    `},b={base:L,surroundLine:ne},ae=`
precision mediump float;
 
float atan2(float y, float x){
  float t0, t1, t2, t3, t4;
  t3 = abs(x);
  t1 = abs(y);
  t0 = max(t3, t1);
  t1 = min(t3, t1);
  t3 = float(1) / t0;
  t3 = t1 * t3;
  t4 = t3 * t3;
  t0 = -float(0.013480470);
  t0 = t0 * t4 + float(0.057477314);
  t0 = t0 * t4 - float(0.121239071);
  t0 = t0 * t4 + float(0.195635925);
  t0 = t0 * t4 - float(0.332994597);
  t0 = t0 * t4 + float(0.999995630);
  t3 = t0 * t3;
  t3 = (abs(y) > abs(x)) ? float(1.570796327) - t3 : t3;
  t3 = (x < 0.0) ?  float(3.141592654) - t3 : t3;
  t3 = (y < 0.0) ? -t3 : t3;
  return t3;
}
// 计算距离
float distanceTo(vec2 src, vec2 dst) {
	float dx = src.x - dst.x;
	float dy = src.y - dst.y;
	float dv = dx * dx + dy * dy;
	return sqrt(dv);
}

#define PI 3.14159265359
#define PI2 6.28318530718

uniform vec3 u_color;
uniform float time;
uniform float u_opacity;
uniform float u_radius;
uniform float u_width;
uniform float u_speed;

varying vec2 v_position;

    `,T={vertexShader:`
    varying vec2 v_position;
    
    void main() {
        v_position = vec2(position.x, position.y);
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }`,fragmentShader:`
    ${ae} 
    void main() {
        float d_time = u_speed * time;

        float angle = atan2(v_position.x, v_position.y) + PI;
        
        float angleT = mod(angle + d_time, PI2);

        float width = u_width;
    
        float d_opacity = 0.0;

        // 当前位置离中心位置
        float length = distanceTo(vec2(0.0, 0.0), v_position);
        
        float bw = 5.0;
        if (length < u_radius && length > u_radius - bw) {
            float o = (length - (u_radius - bw)) / bw;
            d_opacity = sin(o * PI); 
        }

        if (length < u_radius - bw / 1.1) {
            d_opacity = 1.0 - angleT / PI * (PI / width);
        } 

        if (length > u_radius) { d_opacity = 0.0; }
 
        gl_FragColor = vec4(u_color, d_opacity * u_opacity);
    }`};function se(i){const{radius:e=50,color:t="#fff",speed:n=1,opacity:l=1,angle:s=Math.PI,position:c={x:0,y:0,z:0},rotation:u={x:-Math.PI/2,y:0,z:0}}=i,a=e*2,o=new R(a,a,1,1),p=new w({uniforms:{u_radius:{value:e},u_speed:{value:n},u_opacity:{value:l},u_width:{value:s},u_color:{value:new m(t)},time:{value:0}},transparent:!0,depthWrite:!1,side:M,vertexShader:T.vertexShader,fragmentShader:T.fragmentShader}),f=new P(o,p);return f.rotation.set(u.x,u.y,u.z),f.position.copy(c),f}function ue(i){const{source:e,target:t,height:n,size:l,color:s,range:c}=i,u=[],a=[],o=[],p=[],f=new d(e.x,e.y,e.z),g=new d(t.x,t.y,t.z),h=g.clone().lerp(f,.5);h.y+=n;let I=f.distanceTo(h)+g.distanceTo(h);const S=parseInt(I.toString());new O(f,h,g).getPoints(S).forEach((v,C)=>{const G=C/(S-1);u.push({x:v.x,y:v.y,z:v.z}),o.push(G),p.push(C)}),u.forEach(v=>{a.push(v.x,v.y,v.z)});const y=new E;y.setAttribute("position",new _(a,3)),y.setAttribute("index",new _(o,1)),y.setAttribute("current",new _(p,1));const A=new w({transparent:!0,depthWrite:!1,depthTest:!1,blending:N,uniforms:{uColor:{value:new m(s)},uRange:{value:c||100},uSize:{value:l},uTotal:{value:S},time:{value:0}},vertexShader:`
        attribute float index;
        attribute float current;
        uniform float time;
        uniform float uSize;
        uniform float uRange; // 展示区间
        uniform float uTotal; // 粒子总数
        uniform vec3 uColor; 
        varying vec3 vColor;
        varying float vOpacity;
        void main() {
            // 需要当前显示的索引
            float size = uSize;
            float showNumber = uTotal * mod(time, 1.1);
            if (showNumber > current && showNumber < current + uRange) {
                float uIndex = ((current + uRange) - showNumber) / uRange;
                size *= uIndex;
                vOpacity = 1.0;
            } else {
                vOpacity = 0.0;
            }

            // 顶点着色器计算后的Position
            vColor = uColor;
            vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
            gl_Position = projectionMatrix * mvPosition; 
            // 大小
            gl_PointSize = size * 300.0 / (-mvPosition.z);
        }`,fragmentShader:`
        varying vec3 vColor; 
        varying float vOpacity;
        void main() {
            gl_FragColor = vec4(vColor, vOpacity);
        }`});return new Y(y,A)}const le=`
uniform vec3 u_color;

uniform float time;
uniform float u_height;
 
varying float v_opacity;

void main() {

    vec3 vPosition = position * mod(time, 1.0);

    v_opacity = mix(1.0, 0.0, position.y / u_height);
 
    gl_Position = projectionMatrix * modelViewMatrix * vec4(vPosition, 1.0);
}
`,ce=` 
uniform vec3 u_color;
uniform float u_opacity;
 
varying float v_opacity;

void main() { 
    gl_FragColor = vec4(u_color, v_opacity * u_opacity);
}
`;function fe(i){const{radius:e,height:t,opacity:n,color:l,speed:s,renderOrder:c}=i,u=new k(e,e,t,32,1,!0);u.translate(0,t/2,0);const a=new w({uniforms:{u_height:{value:t},u_speed:{value:s||1},u_opacity:{value:n},u_color:{value:new m(l)},time:{value:0}},transparent:!0,depthWrite:!1,depthTest:!1,side:M,vertexShader:le,fragmentShader:ce}),o=new P(u,a);return o.renderOrder=c||1,o}const de=[{position:{x:666,y:22,z:0},radius:150,color:"#ff0062",opacity:.5,speed:2},{position:{x:-666,y:25,z:202},radius:320,color:"#efad35",opacity:.6,speed:1}],me=[{position:{x:-150,y:15,z:100},speed:.5,color:"#efad35",opacity:.6,radius:420,height:120,renderOrder:5}],ve=[{source:{x:-150,y:15,z:100},target:{x:-666,y:25,z:202},range:120,height:100,color:"#efad35",speed:1,size:30},{source:{x:-150,y:15,z:100},target:{x:666,y:22,z:0},height:300,range:150,color:"#ff0000",speed:1,size:40}];let x=!1;function pe(i){return new J(i.geometry)}function F(i,e){if(!e||!i)return!1;Array.isArray(i)?i.forEach(t=>{e(t)}):e(i)}function he(i){F(i.material,e=>{e.color.setStyle("#040912")})}class ge{constructor(e){r(this,"basic");r(this,"scene");r(this,"camera");r(this,"renderer");r(this,"controls");r(this,"sizes");r(this,"useShader",!0);r(this,"clock");r(this,"helper");r(this,"debug");r(this,"resources");r(this,"emitter");r(this,"option");r(this,"bigGroup");r(this,"effectGroup");r(this,"surroundLineMaterial");r(this,"time");r(this,"StartTime");this.option=e,this.emitter=new V.EventEmitter,this.basic=new W(e.dom),this.scene=this.basic.scene,this.renderer=this.basic.renderer,this.controls=this.basic.controls,this.camera=this.basic.camera,this.helper=new q(this.scene),this.sizes=new U(this),this.clock=new $,this.bigGroup=new z,this.effectGroup=new z,this.bigGroup.add(this.effectGroup),this.time={value:0},this.StartTime={value:0},this.debug=new K.Pane({title:"🎉 mingo 🎉",expanded:!0}),this.resources=new H({textures:[],fbxModels:[{name:"shanghaiModal",path:"./lib/city/shanghai.FBX"}]},()=>{this.initialize(),this.createLight(),console.log("资源加载完成",this.resources),this.createCity(),this.scene.add(this.bigGroup),this.controls.update(),this.render()})}initialize(){this.camera.position.set(1200,700,121),this.emitter.on("resize",()=>{this.renderer.setSize(Number(this.sizes.viewport.width),Number(this.sizes.viewport.height)),this.camera.aspect=Number(this.sizes.viewport.width)/Number(this.sizes.viewport.height),this.camera.updateProjectionMatrix()})}createLight(){const e=new Q(11382189,1);this.scene.add(e);const t=new j(16777215,.5);t.position.set(100,100,0),this.scene.add(t),this.helper.addLight(t,"directional"),this.helper.addAxes()}createCity(){const e=["CITY_UNTRIANGULATED"],t=["LANDMASS"];this.resources.fbxModels.shanghaiModal.traverse(n=>{console.log(n),e.includes(n.name)&&this.setCityMaterial(n),t.includes(n.name)&&he(n)}),x=!0,this.bigGroup.add(this.resources.fbxModels.shanghaiModal)}setCityMaterial(e){e.geometry.computeBoundingBox(),e.geometry.computeBoundingSphere();const{geometry:t}=e,{center:n,radius:l}=t.boundingSphere,{max:s,min:c}=t.boundingBox,u=new d(s.x-c.x,s.y-c.y,s.z-c.z);F(e.material,a=>{a.transparent=!0,a.color.setStyle("#1B3045"),a.onBeforeCompile=o=>{o.uniforms.time=this.time,o.uniforms.uStartTime=this.StartTime,o.uniforms.uCenter={value:n},o.uniforms.uSize={value:u},o.uniforms.uMax={value:s},o.uniforms.uMin={value:c},o.uniforms.uTopColor={value:new m("#00FF00")},o.uniforms.uSwitch={value:new d(0,0,0)},o.uniforms.uDiffusion={value:new d(1,20,600)},o.uniforms.uDiffusionCenter={value:new d(0,0,0)},o.uniforms.uFlow={value:new d(1,10,60)},o.uniforms.uColor={value:new m("#5588aa")},o.uniforms.uFlowColor={value:new m("#BF3EFF")},o.uniforms.uOpacity={value:1},o.uniforms.uRadius={value:l};const p=`
    float distanceTo(vec2 src, vec2 dst) {
        float dx = src.x - dst.x;
        float dy = src.y - dst.y;
        float dv = dx * dx + dy * dy;
        return sqrt(dv);
    }

    float lerp(float x, float y, float t) {
        return (1.0 - t) * x + t * y;
    }

    vec3 getGradientColor(vec3 color1, vec3 color2, float index) {
        float r = lerp(color1.r, color2.r, index);
        float g = lerp(color1.g, color2.g, index);
        float b = lerp(color1.b, color2.b, index);
        return vec3(r, g, b);
    }

    varying vec4 vPositionMatrix;
    varying vec3 vPosition;

    uniform float time;
    // 扩散参数
    uniform float uRadius;
    uniform float uOpacity;
    // 初始动画参数
    uniform float uStartTime; 

    uniform vec3 uMin;
    uniform vec3 uMax;
    uniform vec3 uSize;
    uniform vec3 uFlow;
    uniform vec3 uColor;
    uniform vec3 uCenter;
    uniform vec3 uSwitch;
    uniform vec3 uTopColor;
    uniform vec3 uFlowColor;
    uniform vec3 uDiffusion; 
    uniform vec3 uDiffusionCenter;

    void main() {
        `,f=`
    vec3 distColor = outgoingLight;
    float dstOpacity = diffuseColor.a;
    
    float indexMix = vPosition.z / (uSize.z * 0.6);
    // float indexMix = 0.5;
    distColor = mix(distColor, uTopColor, indexMix);
    
    // 开启扩散波
    vec2 position2D = vec2(vPosition.x, vPosition.y);
    if (uDiffusion.x > 0.5) {
        // 扩散速度
        float dTime = mod(time * uDiffusion.z, uRadius * 2.0);
        // 当前的离中心点距离
        float uLen = distanceTo(position2D, vec2(uCenter.x, uCenter.z));

        // 扩散范围
        if (uLen < dTime && uLen > dTime - uDiffusion.y) {
            // 颜色渐变
            float dIndex = sin((dTime - uLen) / uDiffusion.y * PI);
            distColor = mix(uColor, distColor, 1.0 - dIndex);
        }
    }

    // 流动效果
    if (uFlow.x > 0.5) {
        // 扩散速度
        float dTime = mod(time * uFlow.z, uSize.z); 
        // 流动范围
        float topY = vPosition.z + uFlow.y;
        if (dTime > vPosition.z && dTime < topY) {
            // 颜色渐变 
            float dIndex = sin((topY - dTime) / uFlow.y * PI);

            distColor = mix(distColor, uFlowColor,  dIndex); 
        }
    }
  

    gl_FragColor = vec4(distColor, dstOpacity * uStartTime);
        `;o.fragmentShader=o.fragmentShader.replace("void main() {",p),o.fragmentShader=o.fragmentShader.replace("gl_FragColor = vec4( outgoingLight, diffuseColor.a );",f);const g=`
    varying vec4 vPositionMatrix;
    varying vec3 vPosition;
    uniform float uStartTime;
    void main() {
            vPositionMatrix = projectionMatrix * vec4(position, 1.0);
            vPosition = position;
            `,h=`
    vec3 transformed = vec3(position.x, position.y, position.z * uStartTime);
            `;o.vertexShader=o.vertexShader.replace("void main() {",g),o.vertexShader=o.vertexShader.replace("#include <begin_vertex>",h)}})}surroundLine(e){console.log(e);const t=pe(e);console.log(t);const n=new d;e.getWorldPosition(n);const{max:l,min:s}=e.geometry.boundingBox,c=new d(l.x-s.x,l.y-s.y,l.z-s.z),u=this.createSurroundLineMaterial({max:l,min:s,size:c}),a=new X(t,u);a.name="surroundLine",a.scale.copy(e.scale),a.rotation.copy(e.rotation),a.position.copy(n),this.effectGroup.add(a)}createSurroundLineMaterial({max:e,min:t,size:n}){return this.surroundLineMaterial?this.surroundLineMaterial:(this.surroundLineMaterial=new w({transparent:!0,uniforms:{uColor:{value:new m("#ffffff")},uActive:{value:new m("#00d0f0")},time:this.time,uOpacity:{value:.6},uMax:{value:e},uMin:{value:t},uRange:{value:200},uSpeed:{value:.2},uStartTime:this.StartTime},vertexShader:b.surroundLine.vertexShader,fragmentShader:b.surroundLine.fragmentShader}),this.surroundLineMaterial)}destory(){this.debug.dispose()}animationRun(){setTimeout(()=>{x=!0,de.forEach(e=>{const t=se(e);t.material.uniforms.time=this.time,this.effectGroup.add(t)}),me.forEach(e=>{const t=fe(e);t.material.uniforms.time=this.time,this.effectGroup.add(t)}),ve.forEach(e=>{const t=ue(e);t.material.uniforms.time=this.time,t.renderOrder=10,this.effectGroup.add(t)})},1e3)}render(){const e=this.clock.getDelta();if(e>1)return!1;this.time.value+=e,console.log("this.time",this.time),x&&(this.StartTime.value+=e*.5,this.StartTime.value>=1&&(this.StartTime.value=1,x=!1)),this.renderer.render(this.scene,this.camera),requestAnimationFrame(this.render.bind(this))}}const ye=re("div",{id:"threejs-canvas"},null,-1),xe=[ye],Le=Z({__name:"index",setup(i){let e;return ee(()=>{const t=document.querySelector("#threejs-canvas");e=new ge({dom:t})}),te(()=>{e.destory()}),(t,n)=>(ie(),oe("div",null,xe))}});export{Le as default};
