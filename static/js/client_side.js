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
					res_gambar_prediksi = res['gambar_prediksi']
					// Tampilkan hasil prediksi ke halaman web
					generate_prediksi(res_data_prediksi, res_gambar_prediksi); 
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
  function generate_prediksi(data_prediksi, image_prediksi) {
	var str="";
	str += "<h3>Hasil Prediksi: "+ data_prediksi +"</h3>";
	str += "<img class='mb-2' src='" + image_prediksi + "' width=\"200\"></img>"
	str += "<div class='row'>";
	str += "<div class='col-lg-6 col-md-12 text-justify'>";
	str += "<h5 class='text-dark'> Cara Pencegahan: </h5>";
		if (data_prediksi == "Eczema"){
			str += "<p>1. Ketahui apa saja faktor pemicu dermatitis seperti debu, polusi, asap rokok, udara dingin dan kering, produk sabun atau deterjen, keringat berlebih, stres, dan makanan tertentu, seperti susu atau telur.<br>";
			str += "2. Mandi dua kali sehari dengan air hangat, dengan durasi 5-10 menit saja.<br></p>";
			str += "3. Gunakan handuk berbahan lembut untuk mengeringkan tubuh setelah mandi. Usahakan untuk tidak menggosokkan handuk ke kulit.<br></p>";
			str += "4. Oleskan pelembap di seluruh tubuh tiap selesai mandi, menjelang tidur, saat berada di ruangan ber-AC dalam waktu yang lama, atau sesuai saran dokter. </p>";
		}
		else if (data_prediksi == "Melanocytic Nevi"){
			str += "<p>1. Hindari paparan sinar matahari secara berlebihan.<br>";
			str += "2. Jauhi sinar matahari antara pukul 10.00 hingga 16.00.<br>";
			str += "3. Bawalah payung dan selalu kenakan tabir surya jika ingin keluar rumah.<br>";
			str += "4. Lakukan pemeriksaan tubuh menyeluruh secara rutin, untuk mendeteksi spot titik Melanocytic Nevi baru atau perubahan pada Melanocytic Nevi lama. </p>";
		}
		else if (data_prediksi == "Basal Cell Carcinoma"){
			str += "<p>1. Menghindari paparan sinar matahari yang terlalu lama dan terlalu sering.<br>";
			str += "2. Menggunakan sunscreen atau tabir surya yang mengandung SPF 30 setiap 2 jam sekali, ketika beraktivitas di luar ruangan.<br>";
			str += "3. Mengenakan pakaian yang menutupi seluruh bagian kulit, termasuk topi dan kacamata.<br>";
			str += "4. Menghindari prosedur tanning (menggelapkan) kulit.<br>";
			str += "5. Melakukan pemeriksaan kulit mandiri secara rutin.<br>";
			str += "6. Memeriksakan diri ke dokter jika mengalami perubahan pada kulit.</p>";
		}
	str += "</div>";
	str += "<div class='col-lg-6 col-md-12 text-justify'>";
	str += "<h5 class='text-dark'> Cara Pengobatan: </h5>";
	if (data_prediksi == "Eczema"){
		str += "<p>1. Menggunakan produk sabun mandi yang tepat.<br>";
		str += "2. Mengompres kulit dengan kompres hangat.<br>";
		str += "3. Mengenakan pakaian yang menyerap keringat.<br>";
		str += "4. Menggunakan pelembap khusus seperti glyerin, AHA, Hyaluronic Acid, Lanolin, bahan alami lainnya. </p>";
	}
	else if (data_prediksi == "Melanocytic Nevi"){
		str += "<p>Penyakit Melanocytic Nevi tidak memerlukan penanganan medis. Pengobatan hanya diperlukan jika penyakit ini mengganggu penampilan, kenyamanan, rasa percaya diri, atau bersifat kanker. Akan bersifat kanker apabila memiliki ciri seperti<br>"
		str += "1. Lahir dengan tahi lalat yang berdiameter >5 cm.<br>";
		str += "2. Memiliki tahi lalat lebih dari 50 buah.<br>";
		str += "3. Memiliki tahi lalat dengan bentuk yang tidak biasa.<br>";
		str += "4. Sering terpapar radiasi ultraviolet (UV).<br>";
		str += "5. Memiliki anggota keluarga yang menderita melanoma.<br>";
		str += "6. Pernah menderita kanker kulit melanoma.<br>";
		str += "7. Memiliki kulit sensitif yang mudah terbakar sinar matahari.</p>";
	}
	else if (data_prediksi == "Basal Cell Carcinoma"){
		str += "<p>Pengobatan karsinoma sel basal bertujuan untuk menghilangkan atau mengangkat sel kanker. Metode pengobatannya akan disesuaikan dengan kondisi kesehatan dan usia pasien, serta lokasi dan ukuran tumor. Beberapa metode:</p>"
		str += "<p>1. Pemotongan dengan jarum elektrik.<br>";
		str += "2. Pemotongan dengan pisau bedah.<br>";
		str += "3. Krioterapi.<br>";
		str += "4. Terapi fotodinamik.<br>";
		str += "5. Terapi radiasi (radioterapi).<br>";
		str += "6. Kemoterapi.</p>";
	}
	str += "</div>";
	str += "</div>";
	$("#hasil_prediksi").html(str);
  }  
})
  
