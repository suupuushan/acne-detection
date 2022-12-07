$(document).ready(function(){
  
  // Fungsi untuk memanggil API ketika tombol prediksi ditekan
  $("#prediksi").click(function(e) {
    e.preventDefault();

	// Panggil API dengan timeout 1 detik (1000 ms)
    setTimeout(function() {
	  try {
			$.ajax({
				url         : "/requests",
				type        : "POST",
				data        : {"capture" : 1},
				success     : function(res){
					// Ambil hasil prediksi dan path gambar yang diprediksi dari API
					res_data_prediksi   = res['prediksi']
					// Tampilkan hasil prediksi ke halaman web
					generate_prediksi(res_data_prediksi); 
			  	}
			});
		}
		catch(e) {
			// Jika gagal memanggil API, tampilkan error di console
			console.log("Gagal !");
			console.log(e);
		} 
    }, 1000)  
  })
   
  // Fungsi untuk menampilkan hasil prediksi model
  function generate_prediksi(data_prediksi) {
	var str="";
	str += "<h3>Hasil Prediksi </h3>";
	str += "<br>";
	str += "<h3>" + data_prediksi + "</h3>";
	$("#hasil_prediksi").html(str);
  }  
})
  
