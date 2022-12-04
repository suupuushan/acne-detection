
function showCamera(){
    Webcam.set({
        width: 400,
        height: 300,
        image_format: 'jpeg',
        jpeg_quality: 100
    });
    Webcam.attach('#my_camera');
}

function takeSnapshot() {
        // take snapshot and get image data
        Webcam.snap( function(data_uri) {
            // display results in page
            document.getElementById('cam_results').innerHTML = 
                '<p class="text-primary mb-6">Hasil foto: </p>' +
                '<img src="'+data_uri+'"/>';
        } );
    }