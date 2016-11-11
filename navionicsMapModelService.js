
ngNavionicsMapExplorer.service('navionicsMapModelService', ['tileDecimalWidthConst', function(tileDecimalWidthConst) {

    this.long2tile = function(lon,zoom) { return (Math.floor((lon+180)/360*Math.pow(2,zoom))); }
    this.lat2tile = function(lat,zoom)  { return (Math.floor((1-Math.log(Math.tan(lat*Math.PI/180) + 1/Math.cos(lat*Math.PI/180))/Math.PI)/2 *Math.pow(2,zoom))); }
    this.tile2long = function(x,z) { return (x/Math.pow(2,z)*360-180); }
    this.tile2lat = function(y,z) { var n=Math.PI-2*Math.PI*y/Math.pow(2,z); return (180/Math.PI*Math.atan(0.5*(Math.exp(n)-Math.exp(-n)))); }



    var mapMatrix =
    {
// matrixIndex: {rowID: "4",colID: "4"},

        tileArr:[],
        latLongIndex: {lat: '',long: ''},
        tileIndex: {tileX: '',tileY: ''},
        decimalOffset :{decimalX: '',decimalY: ''},
        tileDecimalWidth : tileDecimalWidthConst,
        matrixSize:'',
        tilesize : '',
        zoomLevel : 0,
        matrix:
            [
                {
                    tileRow: [{tileX:'',tileY:'',zoom:''},{tileX:'',tileY:'',zoom:''},{tileX:'',tileY:'',zoom:''},{tileX:'',tileY:'',zoom:''},{tileX:'',tileY:'',zoom:''},{tileX:'',tileY:'',zoom:''},{tileX:'',tileY:'',zoom:''},{tileX:'',tileY:'',zoom:''}],
                    materialTileXY: "",
                    tilename: {},

                },
                {
                    tileRow: [{tileX:'',tileY:'',zoom:''},{tileX:'',tileY:'',zoom:''},{tileX:'',tileY:'',zoom:''},{tileX:'',tileY:'',zoom:''},{tileX:'',tileY:'',zoom:''},{tileX:'',tileY:'',zoom:''},{tileX:'',tileY:'',zoom:''},{tileX:'',tileY:'',zoom:''}],
                    materialTileXY: "",
                    tilename: {},

                },
                {
                    tileRow: [{tileX:'',tileY:'',zoom:''},{tileX:'',tileY:'',zoom:''},{tileX:'',tileY:'',zoom:''},{tileX:'',tileY:'',zoom:''},{tileX:'',tileY:'',zoom:''},{tileX:'',tileY:'',zoom:''},{tileX:'',tileY:'',zoom:''},{tileX:'',tileY:'',zoom:''}],
                    materialTileXY: "",
                    tilename: {},

                }
                ,
                {
                    tileRow: [{tileX:'',tileY:'',zoom:''},{tileX:'',tileY:'',zoom:''},{tileX:'',tileY:'',zoom:''},{tileX:'',tileY:'',zoom:''},{tileX:'',tileY:'',zoom:''},{tileX:'',tileY:'',zoom:''},{tileX:'',tileY:'',zoom:''},{tileX:'',tileY:'',zoom:''}],
                    materialTileXY: "",
                    tilename: {},

                }
                ,
                {
                    tileRow: [{tileX:'',tileY:'',zoom:''},{tileX:'',tileY:'',zoom:''},{tileX:'',tileY:'',zoom:''},{tileX:'',tileY:'',zoom:''},{tileX:'',tileY:'',zoom:''},{tileX:'',tileY:'',zoom:''},{tileX:'',tileY:'',zoom:''},{tileX:'',tileY:'',zoom:''}],
                    materialTileXY: "",
                    tilename: {},

                }
                ,
                {
                    tileRow: [{tileX:'',tileY:'',zoom:''},{tileX:'',tileY:'',zoom:''},{tileX:'',tileY:'',zoom:''},{tileX:'',tileY:'',zoom:''},{tileX:'',tileY:'',zoom:''},{tileX:'',tileY:'',zoom:''},{tileX:'',tileY:'',zoom:''},{tileX:'',tileY:'',zoom:''}],
                    materialTileXY: "",
                    tilename: {},

                }
                ,
                {
                    tileRow: [{tileX:'',tileY:'',zoom:''},{tileX:'',tileY:'',zoom:''},{tileX:'',tileY:'',zoom:''},{tileX:'',tileY:'',zoom:''},{tileX:'',tileY:'',zoom:''},{tileX:'',tileY:'',zoom:''},{tileX:'',tileY:'',zoom:''},{tileX:'',tileY:'',zoom:''}],
                    materialTileXY: "",
                    tilename: {},

                }
                ,
                {
                    tileRow: [{tileX:'',tileY:'',zoom:''},{tileX:'',tileY:'',zoom:''},{tileX:'',tileY:'',zoom:''},{tileX:'',tileY:'',zoom:''},{tileX:'',tileY:'',zoom:''},{tileX:'',tileY:'',zoom:''},{tileX:'',tileY:'',zoom:''},{tileX:'',tileY:'',zoom:''}],
                    materialTileXY: "",
                    tilename: {},

                }
            ]

    };
    function tileNaming(xPosition, yPosition, zoomLevel)
    {
        return  "tileMaterial_" + xPosition + "_" + yPosition + "_" + zoomLevel;
    }

    this.matrixSetup = function()
    {
        // console.log("recevived:" + centerX, centerY)

        mapMatrix.tileIndex.tileX = this.long2tile(mapMatrix.latLongIndex.long,mapMatrix.zoomLevel);
        mapMatrix.tileIndex.tileY = this.lat2tile(mapMatrix.latLongIndex.lat,mapMatrix.zoomLevel);

        for(ind = 0;ind<mapMatrix.matrixSize;ind++)
        {
            mapMatrix.matrix[ind].tilename = new Array();
            for(indCol = 0;indCol<mapMatrix.matrixSize;indCol++)
            {
                mapMatrix.matrix[ind].tileRow[indCol] = {tileX:(parseInt(mapMatrix.tileIndex.tileX-mapMatrix.matrixSize/2)+ind),tileY:(parseInt(mapMatrix.tileIndex.tileY-mapMatrix.matrixSize/2)+indCol), zoom:mapMatrix.zoomLevel};

            }
        }
    }



    this.mapNavigator = function(tileXShifting, tileYShifting, edecimalXShifting, decimalYShifting, zoom)
    {
        if(zoom && mapMatrix.zoomLevel != zoom)
        {
            mapMatrix.zoomLevel = zoom;
            mapMatrix.tileIndex.tileX = this.long2tile(mapMatrix.latLongIndex.long,mapMatrix.zoomLevel);
            mapMatrix.tileIndex.tileY = this.lat2tile(mapMatrix.latLongIndex.lat,mapMatrix.zoomLevel);
            this.matrixSetup();
        }

        mapMatrix.decimalOffset.decimalX = (mapMatrix.decimalOffset.decimalX  + decimalXShifting);
        mapMatrix.decimalOffset.decimalY = (mapMatrix.decimalOffset.decimalY  + decimalYShifting);

        if(mapMatrix.decimalOffset.decimalX>0)
        {tileXShifting = Math.floor(mapMatrix.decimalOffset.decimalX / mapMatrix.tileDecimalWidth);}

        if(mapMatrix.decimalOffset.decimalX<0)
        {
            tileXShifting = Math.ceil(mapMatrix.decimalOffset.decimalX / mapMatrix.tileDecimalWidth);
        }

        if(mapMatrix.decimalOffset.decimalY>0)
        {
            tileYShifting = Math.floor(mapMatrix.decimalOffset.decimalY / mapMatrix.tileDecimalWidth);
        }

        if(mapMatrix.decimalOffset.decimalY<0)
        {
            tileYShifting = Math.ceil(mapMatrix.decimalOffset.decimalY / mapMatrix.tileDecimalWidth);
        }

        mapMatrix.decimalOffset.decimalX = mapMatrix.decimalOffset.decimalX % mapMatrix.tileDecimalWidth;
        mapMatrix.decimalOffset.decimalY = mapMatrix.decimalOffset.decimalY % mapMatrix.tileDecimalWidth;
        this.matrixShifter(tileXShifting, tileYShifting);

    }

    this.matrixShifter = function(xShifting, yShifting)
    {


        var matrixSize = mapMatrix.matrix.length;
        // var matrixLimit = matrixSize -1;
        // xOffset = (parseInt(mapMatrix.tileIndex.tileX) + parseInt(xShifting)) % matrixLimit;
        // yOffset = (parseInt(mapMatrix.tileIndex.tileY) + parseInt(yShifting)) % matrixLimit;

        mapMatrix.tileIndex.tileX = (parseInt(mapMatrix.tileIndex.tileX) + parseInt(xShifting)) ;
        mapMatrix.tileIndex.tileY = (parseInt(mapMatrix.tileIndex.tileY) + parseInt(yShifting)) ;
        mapMatrix.latLongIndex.lat = this.tile2lat(mapMatrix.tileIndex.tileY, mapMatrix.zoomLevel);
        mapMatrix.latLongIndex.long = this.tile2long(mapMatrix.tileIndex.tileX,mapMatrix.zoomLevel) ;



        for(indY = 0;indY<matrixSize;indY++)
        {
            for (indX = 0; indX < matrixSize; indX++) {
                mapMatrix.matrix[indY].tileRow[indX].tileY = mapMatrix.matrix[indY].tileRow[indX].tileY + yShifting;
                mapMatrix.matrix[indY].tileRow[indX].tileX = mapMatrix.matrix[indY].tileRow[indX].tileX + xShifting;

            }
        }



    }

    this.getMapMatrix = function () {
        return mapMatrix;
    };

}]);

