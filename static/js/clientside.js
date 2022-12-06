// Fungsi untuk menampilkan hasil prediksi model
function generate_prediksi(data_prediksi, image_prediksi) {
	var str="";
	
    str += "<h3>Hasil Prediksi </h3>";
    str += "<br>";
    str += "<img src='" + image_prediksi + "' width=\"200\"></img>"
    str += "<h3>" + data_prediksi + "</h3>";

	$("#hasil_prediksi").html(str);
  }  