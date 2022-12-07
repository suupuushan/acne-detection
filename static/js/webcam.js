
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
                '<img id="image" src="'+data_uri+'"/>';
        } );
}

function upload(){
    console.log("Uploading...")
    var image = document.getElementById('image');
    if (image == null){
        alert('Tidak bisa memprediksi, foto belum diambil!');
    }
    else{
        var image2 = image.src;
        var form = document.getElementById('predictForm');
        var formData = new FormData(form);
        formData.append("file", image2);
        const xhr = new XMLHttpRequest();
        xhr.open("POST", "/api/deteksi", true);

        // check when state changes, 
        xhr.onreadystatechange = function() {
        if(xhr.readyState == 4 && xhr.status == 200) {
            alert(xhr.responseText);
            }
        }

        xhr.send(formData);
        console.log(formData.get('file'));
    }
    

   

    
}