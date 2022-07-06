import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
import * as $ from 'jquery'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'

// import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'


// let autoRotate = true;
// const totalGroup = new THREE.Group(); 
// const raycaster = new THREE.Raycaster();

let scene, camera, renderer;

const totalGroup = new THREE.Group(); 

const meshArr = [];
const raycaster = new THREE.Raycaster();
 let INTERSECTED;
 const pointer = new THREE.Vector2();
// mousehover interation
// var raycaster = new THREE.Raycaster();



// scene.add(totalGroup);

function init() {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(60,window.innerWidth/window.innerHeight,1,200);
  camera.position.set(0,0,1);

  renderer = new THREE.WebGLRenderer({antialias:true});
  renderer.setSize(window.innerWidth,window.innerHeight);
  document.body.appendChild(renderer.domElement);


  // var clock;
	// 	var mixer;
	// 	var action;
	// 	var executed = false;


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





//   geometryObj.forEach(data => {

//     var color =  "#" + Math.floor(Math.random()*16777215).toString(16);
//     const geometry = data.obj;
//     const material = new THREE.MeshPhongMaterial( { color: color, side: THREE.DoubleSide } );
//     const mesh = new THREE.Mesh( geometry, material );
//     mesh.position.x = data.x;
//     mesh.position.y = data.y;
//     mesh.name = data.n;
//     scene.add( mesh );
//     totalGroup.add(mesh)
//     meshArr.push(mesh)
// })


 

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
//  mesh.scale.multiplyScalar(2);
 mesh.scale.set(4,4,4);
//console.log(mesh);

mesh.position.set(-2 , 1, -30);
mesh.rotation.set(0,6,0);
 

// mesh.position.set(0 , 0, -10);

scene.add(mesh);

 

window.addEventListener( 'pointermove', onPointerMove );

  function onPointerMove(event) {

    pointer.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	pointer.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

    raycaster.setFromCamera( pointer, camera );

    console.log(meshArr)
    const intersects = raycaster.intersectObjects( meshArr)[0];

    // $("#tooltip").css({
    //     opacity: 0,
    //     display :'none'
    // });
    if(intersects) {

            setTimeout( () => {

              $("#tooltip").text(intersects.object.name)
              $("#tooltip").css('display','block')
            //  $("#tooltip").animate({opacity: 1 },200)
              $("#tooltip").css({opacity : '1'})

            },10)
          
           
            // $("#tooltip").css({top : pos2D.y+'px',left : pos2D.x+'px'})
            // $("#tooltip").css({opacity : '1'})
            // $('html,body').css('cursor','pointer');
   
    }else{

      $("#tooltip").text("")
      $("#tooltip").css('display','none')
    }
  


    
 
    // if ( intersects.length > 0 ) {

    //   console.log("call")

    //     if ( INTERSECTED != intersects.object ) {


    //         if ( INTERSECTED ){

    //             INTERSECTED.material.emissive.setHex( INTERSECTED.currentHex );
    //         } else{

    //             INTERSECTED = intersects[ 0 ].object;
    //             INTERSECTED.currentHex = INTERSECTED.material.emissive.getHex();
    //             INTERSECTED.material.emissive.setHex( 0xff0000 );
    //         }

    //         var pos2D = Get2DPos(INTERSECTED, window.innerWidth, window.innerHeight, camera);
    //         console.log("callled",INTERSECTED );
    //         console.log(pos2D)

    //         $("#tooltip").text(INTERSECTED.name)
    //         $("#tooltip").css({
    //             display: "block",
    //             opacity: 0.0
    //         });
    //         $("#tooltip").css({top : pos2D.y+'px',left : pos2D.x+'px'})
    //         $("#tooltip").css({opacity : '1'})
    //         $('html,body').css('cursor','pointer');


    //     }

    // }else{


    //     if ( INTERSECTED ) {
            
    //         INTERSECTED.material.emissive.setHex( INTERSECTED.currentHex );

    //     }

    //     $("#tooltip").css({
    //         display: "none"
    //     });
    //     $('html,body').css('cursor','default');

    //     INTERSECTED = null;

    // }
    



  }


  //two dimensional position
//  fo



const fbxLoader = new FBXLoader()
fbxLoader.load(
    '../src/floor.fbx',
    (object) => {
// object.scale.set(0.1,0.1,0.)
        object.scale.set(10, 10, 10)
        object.position.set(-3,-10,-20)

      //  object.name = 'door';
       
       scene.add(object)

    },
   
    
)

fbxLoader.load(
  '../src/door1.fbx',
  (object1) => {
// object.scale.set(0.1,0.1,0.)
     object1.scale.set(7, 10, 5)
     object1.position.set(-6,-10,-40)
     
     object1.name = 'door2';
       
    
     scene.add(object1)
     
     meshArr.push(object1)
     

  

  },
 
  
)
fbxLoader.load(
  '../src/door2.fbx',
  (object2) => {
// object.scale.set(0.1,0.1,0.)
     object2.scale.set(7, 10, 5)
     object2.position.set(-16,-10,-40)
     
    //  object2.material.color.set( Math.random() * 0xffffff );
     scene.add(object2)
     meshArr.push(object2)
  },
 
  
)

fbxLoader.load(
  '../src/door3.fbx',
  (object3) => {
// object.scale.set(0.1,0.1,0.)
     object3.scale.set(7, 10, 5)
     object3.position.set(-7,-9,-35)
    //  object3.rotation.set(0,0,0)


     object3.name = 'door';
       
     
     scene.add(object3)
     meshArr.push(object3)


     
//      var intersects = raycaster.intersectObject(scene, true);

// if (intersects.length > 0) {
	
//     var object1 = intersects[0].object1;

//     object1.material.color.set( Math.random() * 0xffffff );

// }





  },
 
  
)


// geometryObj.forEach(data => {

//   var color =  "#" + Math.floor(Math.random()*16777215).toString(16);
//   const geometry = data.obj;
//   const material = new THREE.MeshPhongMaterial( { color: color, side: THREE.DoubleSide } );
//   const mesh = new THREE.Mesh( geometry, material );
//   mesh.position.x = data.x;
//   mesh.position.y = data.y;
//   mesh.name = data.n;
//   scene.add( mesh );
//   totalGroup.add(mesh)
//   meshArr.push(mesh)
  
// })




//door function

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


  










    



    


 

