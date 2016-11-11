
ngNavionicsMapExplorer.service('navionicsCameraModelService', [function() {

    var cameraModel =
    {
        cameraZoom:'1',
        cameraLens:'',
        cameraModel:'PER',
        cameraFOC:'',
        cameraView: '',

    };


    this.getCameraModel = function () {
        return cameraModel;
    };


    this.setCameraZoom = function (zoomValue) {
        cameraModel.cameraZoom = zoomValue;
    };

    this.switchCamera = function ()
    {
        if (cameraModel.cameraModel == "ORT")
        {
            cameraModel.cameraModel = "PER"
        }
        else
        {
            cameraModel.cameraModel = "ORT"
        }
    };

    this.changeCameraView = function (cameraView) {
        cameraModel.cameraView = cameraView;
    };




}]);

