/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by andreevich on 26.08.2016.
	 */
	'use strict';

	var _rools = __webpack_require__(1);

	var _rools2 = _interopRequireDefault(_rools);

	var _edgeSize = __webpack_require__(2);

	var _edgeSize2 = _interopRequireDefault(_edgeSize);

	var _stats = __webpack_require__(3);

	var _stats2 = _interopRequireDefault(_stats);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function init() {
	    var settings = {
	        side: 'top',
	        motion: false,
	        center: 0,
	        axis: 'x'
	    };

	    var clock = new THREE.Clock();
	    var stats = (0, _stats2.default)();

	    var scene = new THREE.Scene();

	    var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);

	    var renderer = new THREE.WebGLRenderer({ antialias: true });
	    renderer.setSize(window.innerWidth, window.innerHeight);
	    renderer.shadowMap.enabled = true;

	    var planeGeometry = new THREE.PlaneGeometry(60, 40);
	    var planeMaterial = new THREE.MeshLambertMaterial({ color: 0xcccccc });
	    var plane = new THREE.Mesh(planeGeometry, planeMaterial);
	    plane.receiveShadow = true;

	    plane.rotation.x = -0.5 * Math.PI;
	    plane.position.set(15, -10, 0);
	    scene.add(plane);

	    var cubeGeometry = new THREE.BoxGeometry(_edgeSize2.default, _edgeSize2.default, _edgeSize2.default);

	    var loader = new THREE.TextureLoader();
	    var texture = loader.load('./images/plastic.jpg');

	    var cubs = [];

	    for (var i = 0; i < 27; i++) {
	        var tempCube = new THREE.Mesh(cubeGeometry, new THREE.MeshPhongMaterial({
	            color: Math.random() * 0xffffff,
	            specular: 0xCCCCCC,
	            shininess: 30,
	            map: texture
	        }));

	        tempCube.castShadow = true;
	        scene.add(tempCube);
	        cubs.push(tempCube);
	        tempCube.position.set(_rools2.default[i].position.x, _rools2.default[i].position.y, _rools2.default[i].position.z);
	        tempCube.name = 'block';
	    }

	    camera.position.set(-30, 20, 40);
	    camera.lookAt(scene.position);

	    var orbitControls = new THREE.OrbitControls(camera);

	    var spotLight = new THREE.SpotLight(0xffffff);
	    spotLight.position.set(-40, 60, 50);
	    spotLight.castShadow = true;
	    spotLight.shadow.bias = 0.001;
	    spotLight.shadow.mapSize.width = 2048;
	    spotLight.shadow.mapSize.height = 2048;
	    scene.add(spotLight);

	    var spotLight_nex = new THREE.SpotLight(0xCfECff, 0.4);
	    spotLight_nex.position.set(40, 60, 50);
	    spotLight_nex.castShadow = true;
	    spotLight_nex.shadow.bias = 0.001;
	    spotLight_nex.shadow.mapSize.width = 2048;
	    spotLight_nex.shadow.mapSize.height = 2048;
	    scene.add(spotLight_nex);

	    document.getElementById("webgl-output").appendChild(renderer.domElement);

	    renderScene();
	    var angel = 0,
	        angel2 = 0;

	    var buttons = document.querySelectorAll('.turn');
	    for (var i = 0; i < buttons.length; i++) {
	        buttons[i].addEventListener('click', turnHandler, false);
	    }

	    function chooseSide(oldCenter, newCenter, axis, flag) {

	        cubs.map(function (el) {
	            if (el.myActive) {
	                el.myActive = false;
	                THREE.SceneUtils.detach(el, cubs[oldCenter], scene);
	            }

	            if (el.position[axis].toFixed(0) == flag && el != cubs[newCenter]) {
	                el.myActive = true;
	                THREE.SceneUtils.attach(el, scene, cubs[newCenter]);
	            }
	        });
	        settings.center = newCenter;
	        settings.axis = axis;
	    }

	    function turnHandler() {
	        var direction = this.getAttribute('direction');
	        var place = this.parentElement.getAttribute('place');

	        settings.side = place;
	        settings.motion = true;
	        settings.direction = direction;

	        switch (place) {
	            case 'top':
	                chooseSide(settings.center, 0, 'y', _edgeSize2.default);
	                break;
	            case 'right':
	                chooseSide(settings.center, 10, 'x', _edgeSize2.default);
	                break;
	            case 'left':
	                chooseSide(settings.center, 11, 'x', -_edgeSize2.default);
	                break;
	            case 'bottom':
	                chooseSide(settings.center, 18, 'y', -_edgeSize2.default);
	                break;
	            case 'back':
	                chooseSide(settings.center, 15, 'z', -_edgeSize2.default);
	                break;
	            case 'front':
	                chooseSide(settings.center, 12, 'z', _edgeSize2.default);
	                break;
	            default:
	                chooseSide(settings.center, 0, 'y', _edgeSize2.default);
	                break;
	        }
	    }

	    function renderScene() {
	        var delta = clock.getDelta();

	        stats.update();

	        spotLight_nex.position.x = 40 * Math.cos(_edgeSize2.default * angel);
	        spotLight_nex.position.z = 60 * Math.sin(_edgeSize2.default * angel);
	        spotLight_nex.lookAt(scene.position);

	        if (settings.motion) {
	            cubs[settings.center].rotation[settings.axis] = +(settings.direction + angel2);
	            angel2 += Math.PI / 360;

	            if (angel2 > Math.PI / 2) {
	                settings.motion = false;
	                angel2 = 0;
	            }
	        }

	        angel += Math.PI / 360;
	        orbitControls.update(delta);
	        requestAnimationFrame(renderScene);
	        renderer.render(scene, camera);
	    }
	};

	window.onload = init;

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _edgeSize = __webpack_require__(2);

	var _edgeSize2 = _interopRequireDefault(_edgeSize);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var cubs = []; /**
	                * Created by andreevich on 26.08.2016.
	                */

	for (var i = 0; i < 27; i++) {
	    cubs.push({
	        position: {
	            x: 0,
	            y: 0,
	            z: 0
	        }
	    });
	}
	cubs[0].position.x = 0;
	cubs[0].position.y = _edgeSize2.default;
	cubs[0].position.z = 0;

	cubs[1].position.x = _edgeSize2.default;
	cubs[1].position.y = _edgeSize2.default;
	cubs[1].position.z = 0;

	cubs[2].position.x = -_edgeSize2.default;
	cubs[2].position.y = _edgeSize2.default;
	cubs[2].position.z = 0;
	//top level:line 2
	cubs[3].position.x = 0;
	cubs[3].position.y = _edgeSize2.default;
	cubs[3].position.z = _edgeSize2.default;

	cubs[4].position.x = _edgeSize2.default;
	cubs[4].position.y = _edgeSize2.default;
	cubs[4].position.z = _edgeSize2.default;

	cubs[5].position.x = -_edgeSize2.default;
	cubs[5].position.y = _edgeSize2.default;
	cubs[5].position.z = _edgeSize2.default;
	//top level:line 3
	cubs[6].position.x = 0;
	cubs[6].position.y = _edgeSize2.default;
	cubs[6].position.z = -_edgeSize2.default;

	cubs[7].position.x = _edgeSize2.default;
	cubs[7].position.y = _edgeSize2.default;
	cubs[7].position.z = -_edgeSize2.default;

	cubs[8].position.x = -_edgeSize2.default;
	cubs[8].position.y = _edgeSize2.default;
	cubs[8].position.z = -_edgeSize2.default;

	//middle level:line 1- central

	/*//Central block
	cubs[9].position.x = 0;
	cubs[9].position.y = 10;
	cubs[9].position.z = 0;*/

	cubs[10].position.x = _edgeSize2.default;
	cubs[10].position.y = 0;
	cubs[10].position.z = 0;

	cubs[11].position.x = -_edgeSize2.default;
	cubs[11].position.y = 0;
	cubs[11].position.z = 0;
	//middle level:line 2
	cubs[12].position.x = 0;
	cubs[12].position.y = 0;
	cubs[12].position.z = _edgeSize2.default;

	cubs[13].position.x = _edgeSize2.default;
	cubs[13].position.y = 0;
	cubs[13].position.z = _edgeSize2.default;

	cubs[14].position.x = -_edgeSize2.default;
	cubs[14].position.y = 0;
	cubs[14].position.z = _edgeSize2.default;
	//middle level:line 3
	cubs[15].position.x = 0;
	cubs[15].position.y = 0;
	cubs[15].position.z = -_edgeSize2.default;

	cubs[16].position.x = _edgeSize2.default;
	cubs[16].position.y = 0;
	cubs[16].position.z = -_edgeSize2.default;

	cubs[17].position.x = -_edgeSize2.default;
	cubs[17].position.y = 0;
	cubs[17].position.z = -_edgeSize2.default;

	//bottom level:line 1- central
	cubs[18].position.x = 0;
	cubs[18].position.y = -_edgeSize2.default;
	cubs[18].position.z = 0;

	cubs[19].position.x = _edgeSize2.default;
	cubs[19].position.y = -_edgeSize2.default;
	cubs[19].position.z = 0;

	cubs[20].position.x = -_edgeSize2.default;
	cubs[20].position.y = -_edgeSize2.default;
	cubs[20].position.z = 0;
	//bottom level:line 2
	cubs[21].position.x = 0;
	cubs[21].position.y = -_edgeSize2.default;
	cubs[21].position.z = _edgeSize2.default;

	cubs[22].position.x = _edgeSize2.default;
	cubs[22].position.y = -_edgeSize2.default;
	cubs[22].position.z = _edgeSize2.default;

	cubs[23].position.x = -_edgeSize2.default;
	cubs[23].position.y = -_edgeSize2.default;
	cubs[23].position.z = _edgeSize2.default;
	//bottom level:line 3
	cubs[24].position.x = 0;
	cubs[24].position.y = -_edgeSize2.default;
	cubs[24].position.z = -_edgeSize2.default;

	cubs[25].position.x = _edgeSize2.default;
	cubs[25].position.y = -_edgeSize2.default;
	cubs[25].position.z = -_edgeSize2.default;

	cubs[26].position.x = -_edgeSize2.default;
	cubs[26].position.y = -_edgeSize2.default;
	cubs[26].position.z = -_edgeSize2.default;

	exports.default = cubs;

/***/ },
/* 2 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	/**
	 * Created by andreevich on 26.08.2016.
	 */
	exports.default = 4;

/***/ },
/* 3 */
/***/ function(module, exports) {

	/**
	 * Created by andreevich on 26.08.2016.
	 */

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var stats = function stats() {
	    var stats = new Stats();
	    stats.setMode(0); // 0: fps, 1: ms
	    document.getElementById("stats-output").appendChild(stats.domElement);
	    return stats;
	};
	exports.default = stats;

/***/ }
/******/ ]);