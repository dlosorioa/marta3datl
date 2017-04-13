var Smart3DATL = Smart3DATL || {};
Smart3DATL.Stops = (function() {
    var stopsEntities;
    function createStop(viewer, name, long, lat) {
        var position = Cesium.Cartesian3.fromDegrees(long, lat, 0);

        var entity = viewer.entities.add({
            parent : stopsEntities,
            name : name,
            position : position,
            model : {
                uri : "../Atlanta/models/bus-stop.glb",
                minimumPixelSize : 128,
                maximumScale : 60
            },
            description: 'Bus stop'
        });
        return entity;
    }

    function create(viewer, stopsData, visibility) {
        if (!stopsEntities) {
            //Add code to create stops here
            stopsEntities = viewer.entities.add(new Cesium.Entity());
            var ndx = 0;
            for (var i = 0; (i < stopsData.length); i++) {
                var latitude = stopsData[i][3];
                var longitude = stopsData[i][4];

                if (Smart3DATL.checkBoundaries(latitude, longitude)) {
                    createStop(viewer, stopsData[i][2], longitude, latitude);
                    ndx++;
                }
            }

            show(visibility);
        }
    }

    function show(visibility) {
        if (stopsEntities) {
            stopsEntities.show = visibility === true;
        }
    }

    return {
        create: create,
        show: show
    };
})();