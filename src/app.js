import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
import * as $ from 'jquery'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'


// let autoRotate = true;



let scene, camera, renderer;



// scene.add(totalGroup);

function init() {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(60,window.innerWidth/window.innerHeight,1,200);
  camera.position.set(0,0,1);

  renderer = new THREE.WebGLRenderer({antialias:true});
  renderer.setSize(window.innerWidth,window.innerHeight);
  document.body.appendChild(renderer.domElement);


  var clock;
		var mixer;
		var action;
		var executed = false;


  const orbitControl = new OrbitControls( camera, renderer.domElement );
  // let controls = new THREE.OrbitControls(camera);
   orbitControl.addEventListener('change', renderer);
   orbitControl.minDistance = 1;
   orbitControl.maxDistance = 20;
  
  let materialArray = [];
  let texture_ft = new THREE.TextureLoader().load( 'arid2_ft.jpg');
  let texture_bk = new THREE.TextureLoader().load( 'arid2_bk.jpg');
  let texture_up = new THREE.TextureLoader().load( 'arid2_up.jpg');
  let texture_dn = new THREE.TextureLoader().load( 'arid2_dn.jpg');
  let texture_rt = new THREE.TextureLoader().load( 'arid2_rt.jpg');
  let texture_lf = new THREE.TextureLoader().load( 'arid2_lf.jpg');

    
  materialArray.push(new THREE.MeshBasicMaterial( { map: texture_ft }));
  materialArray.push(new THREE.MeshBasicMaterial( { map: texture_bk }));
  materialArray.push(new THREE.MeshBasicMaterial( { map: texture_up }));
  materialArray.push(new THREE.MeshBasicMaterial( { map: texture_dn }));
  materialArray.push(new THREE.MeshBasicMaterial( { map: texture_rt }));
  materialArray.push(new THREE.MeshBasicMaterial( { map: texture_lf }));





  //door
  // var material1 = new THREE.MeshNormalMaterial();
  //   material1.side = THREE.DoubleSide;
  //    axis = new THREE.Mesh( new THREE.PlaneGeometry( 0.01, 0.6, 0.01 ), material );
  //   axis.position.set(0.4, 0, .20);
  //   scene.add( axis );


//   var video = document.getElementById('video');
//   video.src = "./videos/batman.mp4";
//   video.load();
//   video.play();
//  var texture = new THREE.VideoTexture(videoImage);
//   texture.needsUpdate;
//   texture.minFilter = THREE.LinearFilter;
//   texture.magFilter = THREE.LinearFilter;
//   texture.format = THREE.RGBFormat;
//   texture.crossOrigin = 'anonymous';
//  var meshPlace = new THREE.Mesh(
//   new THREE.PlaneGeometry(USE_WIDTH, USE_HEIGHT , 40),
//   new THREE.MeshBasicMaterial({ map: texture }),);
//   scene.add( meshPlace );





//video
// document.getElementById("myVideo").controls = true;
const video = document.getElementById( 'video' );

video.onloadeddata = function () {
  video.play();
};

const texture = new THREE.VideoTexture( video );
// videoTexture.needsUpdate = true;

 const geometry = new THREE.PlaneGeometry(6, 4);
const material = new THREE.MeshBasicMaterial({ map: texture, side:2 ,
});
// videoMaterial.needsUpdate = true;

const mesh = new THREE.Mesh(geometry,material);
mesh.scale.multiplyScalar(2);
console.log(mesh);

mesh.position.set(-5 , 2, -10);


// mesh.position.set(0 , 0, -10);

scene.add(mesh);








const fbxLoader = new FBXLoader()
fbxLoader.load(
    '../src/doorbake4.fbx',
    (object) => {
// object.scale.set(0.1,0.1,0.)
       object.scale.set(5, 3, 5)
       object.position.set(25,-2,-20)
       scene.add(object)
//door function
       mixer = new THREE.AnimationMixer(porta);
       action = mixer.clipAction(getAnimationByName(object.animations, 'porta|portaAction'));
       action.clampWhenFinished = true;
       action.setLoop(THREE.LoopOnce, 1);
       action.setDuration(1);
    },
    // (xhr) => {
    //     console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
    // },
    // (error) => {
    //     console.log(error)
    // }
    
)

//door function
function render() {
  var delta = clock.getDelta();
  if (mixer) {
    mixer.update(delta);
  }
}

function getAnimationByName(arr, name) {
  for (var i = 0; i < arr.length; i++) {
    if (arr[i].name == name) {
      return arr[i];
    }
  }
  return undefined;
}

document.addEventListener('keyup', function(event) {
  if (event.keyCode == 65) { // a
    if (executed) {
      action.timeScale *= -1;
    }
    action.paused = false;
    action.play();
    executed = true;
  }
}, false);


// var e = document.getElementById('object');
// e.onmouseover = function() {
//   document.getElementById('object').style.display = 'block';
// }
// e.onmouseout = function() {
//   document.getElementById('object').style.display = 'none';
// }



const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6);
directionalLight.position.set(10, 20, 0); // x, y, z
scene.add(directionalLight);


const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
scene.add(ambientLight);

const controls = new OrbitControls( camera, renderer.domElement );
controls.enablePan = false;
controls.maxPolarAngle = Math.PI / 2 + 0.4;


//modelloading



  for (let i = 0; i < 6; i++)
     materialArray[i].side = THREE.BackSide;
  let skyboxGeo = new THREE.BoxGeometry( 100, 100, 100);
  let skybox = new THREE.Mesh( skyboxGeo, materialArray, );


 
  scene.add( skybox );  

 

  animate();
}
function animate() {
  // controls.autoRotate = autoRotate;
  
  renderer.render(scene,camera);
  requestAnimationFrame(animate);
}





init();


  
  





  







    



    


 

