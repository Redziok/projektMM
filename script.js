import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'

// Debug https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQOVvWd2wwd1va5WdSPQksGDVwEwx7WDKwpb-J-6lHuZ8KYW2D9wgmK6_ESLMVnyYdrh-o&usqp=CAU
const gui = new dat.GUI()

var projector = { x: 0, y: 0 };
var targetList = [];

const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 )

const renderer = new THREE.WebGLRenderer( { antialias: true } );
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setAnimationLoop( animation );
document.body.appendChild( renderer.domElement );

const sphere = new THREE.Mesh(
    new THREE.SphereBufferGeometry( 5, 50, 50 ),
    new THREE.MeshBasicMaterial({
        map: new THREE.TextureLoader().load( 'https://i.imgur.com/kJudaG5.png' )
    })
)

var controls = new OrbitControls(camera, renderer.domElement);
renderer.render( scene, camera );

scene.add(sphere)

camera.position.z = 10;

function animation( time ) {
	// sphere.rotation.x = time / 2000;
	// sphere.rotation.y = time / 1000;

	renderer.render( scene, camera );
}

const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();

function onDocumentMouseDown( event ) {

    event.preventDefault();

	console.log('Click');

	var mouse = new THREE.Vector2();

	mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

	console.log(mouse);

	if (mouse.x < 0 && mouse.y > 0 && mouse.x > -0.5 && mouse.y < 0.75) {
	alert('punkt 1')
	}
	else if (mouse.x < 0 && mouse.y < 0 && mouse.x > -0.5 && mouse.y > -0.75) {
	alert('punkt 3')
	}
	else if (mouse.x > 0 && mouse.y > 0 && mouse.x < 0.5 && mouse.y < 0.75) {
    alert('punkt 2')
    }
    else if(mouse.x > 0 && mouse.y < 0 && mouse.x < 0.5 && mouse.y > -0.75) {
    alert('punkt 4')
    }
    else {
    alert('nie trafiłeś w punkt')
    }

	var vector = new THREE.Vector3( mouse.x, mouse.y, 1 );
    raycaster.setFromCamera( mouse, camera);
    var ray = new THREE.Raycaster( camera.position, vector.sub( camera.position ).normalize() );


    var intersects = ray.intersectObjects( targetList );

    	// if there is one (or more) intersections
    	if ( intersects.length > 0 )
    	{
    		console.log("Hit @ " + toString( intersects[0].point ) );
    		// change the color of the closest face.
    		intersects[ 0 ].face.color.setRGB( 0.8 * Math.random() + 0.2, 0, 0 );
    		intersects[ 0 ].object.geometry.colorsNeedUpdate = true;
    	}

}

window.addEventListener( 'click', onDocumentMouseDown, false );

window.requestAnimationFrame(renderer);




