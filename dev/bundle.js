/**
 * Created by andreevich on 26.08.2016.
 */
'use strict';

import rools from './rools';
import EDGE_SIZE from './edgeSize';
import initStats from './stats';

function init() {
    var settings = {
        side: 'top',
        motion: false,
        center: 0,
        axis: 'x'
    };

    var clock = new THREE.Clock();
    var stats = initStats();

    var scene = new THREE.Scene();

    var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);

    var renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;

    var planeGeometry = new THREE.PlaneGeometry(60, 40);
    var planeMaterial = new THREE.MeshLambertMaterial({color: 0xcccccc});
    var plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.receiveShadow = true;

    plane.rotation.x = -0.5 * Math.PI;
    plane.position.set(15, -10, 0);
    scene.add(plane);

    var cubeGeometry = new THREE.BoxGeometry(EDGE_SIZE, EDGE_SIZE, EDGE_SIZE);

    var loader = new THREE.TextureLoader();
    var texture = loader.load('./images/plastic.jpg');

    var cubs = [];

    for (var i = 0; i < 27; i++) {
        var tempCube = new THREE.Mesh(
            cubeGeometry,
            new THREE.MeshPhongMaterial({
                color: Math.random() * 0xffffff,
                specular: 0xCCCCCC,
                shininess: 30,
                map: texture
            })
        );

        tempCube.castShadow = true;
        scene.add(tempCube);
        cubs.push(tempCube);
        tempCube.position.set(rools[i].position.x, rools[i].position.y, rools[i].position.z);
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
    var angel = 0, angel2 = 0;

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
                THREE.SceneUtils.attach(el, scene, cubs[newCenter])
            }
        });
        settings.center = newCenter;
        settings.axis = axis
    }


    function turnHandler() {
        var direction = this.getAttribute('direction');
        var place = this.parentElement.getAttribute('place');

        settings.side = place;
        settings.motion = true;
        settings.direction = direction;

        switch (place) {
            case 'top' :
                chooseSide(settings.center, 0, 'y', EDGE_SIZE);
                break;
            case 'right' :
                chooseSide(settings.center, 10, 'x', EDGE_SIZE);
                break;
            case 'left' :
                chooseSide(settings.center, 11, 'x', -EDGE_SIZE);
                break;
            case 'bottom' :
                chooseSide(settings.center, 18, 'y', -EDGE_SIZE);
                break;
            case 'back' :
                chooseSide(settings.center, 15, 'z', -EDGE_SIZE);
                break;
            case 'front' :
                chooseSide(settings.center, 12, 'z', EDGE_SIZE);
                break;
            default:
                chooseSide(settings.center, 0, 'y', EDGE_SIZE);
                break;
        }
    }

    function renderScene() {
        var delta = clock.getDelta();

        stats.update();

        spotLight_nex.position.x = (40 * Math.cos(EDGE_SIZE * angel));
        spotLight_nex.position.z = ( 60 * Math.sin(EDGE_SIZE * angel));
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