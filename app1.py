from flask import Flask,render_template

app = Flask(__name__, static_url_path='/static')

@app.route("/")
def beranda():
	return render_template('index.html')

@app.route("/aplikasi")
def aplikasi():
	return render_template('aplikasi.html')

@app.route("/tim")
def team():
	return render_template('team.html')


if __name__ == '__main__':

	# Run Flask di localhost 
	app.run(host="localhost", port=5000, debug=True)
	