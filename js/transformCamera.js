function transformCamera() {
    cubeStore.forEach(function(building, index) {

        /*building.cube.material = new THREE.MeshLambertMaterial({
         color: 0xffffff,
         wireframe: true
         });*/
    });
    return new Promise(function(resolve, reject) {
        function modifyCamera() {
            var destY = 1, destZ = -10, destX =4;
            if(destY > camera.position.y || destZ < camera.position.z) {
                light.position.z -= 0.003;
                if(destY > camera.position.y) {
                    camera.position.y += .1;
                }
                if(destZ < camera.position.z){
                    camera.position.z -= .07;
                }
                if(destX < camera.position.x){
                    camera.position.x -= .07;
                }
                camera.lookAt({
                    x: cameraX,
                    y: cameraY,
                    z: cameraZ
                });
                render();
                requestAnimationFrame(modifyCamera)
            }else{
                resolve();
            }
        }
        modifyCamera();
    })

}