function doBuilding() {

    var buildingGroup = new THREE.Group();
    var d_building = [
        {width: 5, length: 5, coords: {x: -23, z: 0}, height: 10},
        {width: 5, length: 5, coords: {x: -23, z: 7}, height: 12},
        {width: 5, length: 5, coords: {x: -29,z: 7}, height: 9},
        {width: 5, length: 4, coords: {x: -40,z: 7}, height: 10},
        {width: 5, length: 8, coords: {x: 35,z: 0}, height: 10},
        {width: 5, length: 8, coords: {x: 35,z: 7}, height: 8},
        {width: 5, length: 7, coords: {x: 26,z: 0}, height: 6},
        {width: 5, length: 7, coords: {x: 26,z: 7}, height: 10},
        {width: 7, length: 8, coords: {x: 28,z: 23}, height: 5},
        {width: 7, length: 10, coords: {x: 38,z: 23}, height: 4},
        {width: 5, length: 8, coords: {x: -25,z: 17}, height: 6},
        {width: 5, length: 7, coords: {x: -17,z: 17}, height: 10},
        {width: 6, length: 8, coords: {x: -25,z: 24}, height: 5},
        {width: 6, length: 7, coords: {x: -15,z: 24}, height: 6}
    ];


    function Building(cube, length, width, height, coords) {
        this.cube = cube;
        this.length = length;
        this.width = width;
        this.height = height;
        this.coords = coords;
        this.currHeight = 1;
    }



    scene.add(buildingGroup);

    return new Promise(function(resolve, reject) {
        var plainY = 0;

        function init(collOfBuildings) {
            collOfBuildings.forEach(function(building, index){
                var texture = THREE.ImageUtils.loadTexture( "./img/brick.png" );
                var geometry = new THREE.BoxGeometry(building.length, 1, building.width);
                var material = new THREE.MeshPhongMaterial({map: texture});
                var cube = new THREE.Mesh(geometry, material);

                geometry.verticesNeedUpdate = true;
                cubeStore.push(new Building(cube, building.length, building.width, building.height, {
                    x: building.coords.x,
                    z: building.coords.z
                }));
                cube.castShadow = true;
                cube.receiveShadow = true;
                cube.position.set(building.coords.x, plainY, building.coords.z);
                buildingGroup.add(cube);
            });
        }

        function animate() {
            var shouldNext = false;
            cubeStore.forEach(function(building, index) {
                //两个元素X/Y轴方向重叠
                var cube = building.cube;
                if (building.height > building.currHeight) {
                    building.currHeight += 0.2;
                    var geometries = cube.geometry.vertices;
                    geometries[0].y = geometries[1].y = geometries[4].y = geometries[5].y = building.currHeight;
                    shouldNext = true;
                    renderer.clear();
                }

                cube.geometry.verticesNeedUpdate = true;
            });
            if(shouldNext) {
                render();
                requestAnimationFrame(animate);
            }else{
                resolve();
            }
            stats.update();
        }

        init(d_building);
        animate();
    })
}
