var infourl = new URLSearchParams(window.location.search);
			
			var devicesaya = [];
			var devicesaatini = 0;
			
			var fm = "user";
			
			if(infourl.get("modekamera") == "belakang"){
				fm = { "exact" : "environment" };
			}
			
			var wVideo = document.querySelector("#webcamVideo");
			var wCanvas = document.querySelector("#webcamCanvas");
			
			//list device-device video
			navigator.mediaDevices.enumerateDevices().then(function(devices){
				devices.forEach(function(device){
					if(device.kind == "videoinput"){
						devicesaya.push({
							"id" : device.deviceId,
							"label" : device.label,
						});
					}
				});
			});
			
			setTimeout(function(){
				$("#dsi").html(devicesaya[devicesaatini].label);
			},1000);
			
			
			async function startCamera(){
				var stream = null;
				try{
					
					stream = await navigator.mediaDevices.getUserMedia({ video : { 
						deviceId : devicesaya[devicesaatini].id, 
						facingMode : fm ,
					}, audio : false });
					
					
				}catch(error){
					//console.log(error);
					//alert("Perangkat ini tidak dilengkapi kamera belakang.");
				}
				
				wVideo.srcObject = stream;
			}
			
			function ambilGambar(){
				wCanvas.getContext("2d").drawImage(wVideo, 0, 0, 720, 480);
				var imageData = wCanvas.toDataURL("image/jpg");
				console.log(imageData);
				
				toggleCanvasVideo();
			}
			
			function toggleCanvasVideo(){
				$("#webcamVideo").toggle();
				$("#webcamCanvas").toggle();
			}
		