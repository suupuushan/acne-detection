# LIBRARY #
from flask import Flask, render_template, Response, request, jsonify, redirect, url_for
import tensorflow as tf
import cv2
import datetime
import os
import numpy as np
from PIL import Image
from tensorflow.keras.models import load_model
from fungsi import make_model

# VARIABLE GLOBAL #
global capture, switch, filename, camera, now, frame
capture=0
switch=1

# INISIASI FLASK APP #  
app = Flask(__name__, static_url_path='/static')

model = None

NUM_CLASSES = 3
name_classes = ["Basal Cell Carcinoma", "Eczema", "Melanocytic Nevi"]

# FLASK CAMERA #
camera = cv2.VideoCapture(0)

# FUNGSI #
# generate frame by frame from camera
def gen_frames():  
    global capture, filename
    while True:
        global frame
        success, frame = camera.read() 
        if success: 
            try:
                ret, buffer = cv2.imencode('.jpg', cv2.flip(frame,1))
                frame = buffer.tobytes()
                yield (b'--frame\r\n'
                       b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')
            except Exception as e:
                pass
                
        else:
            pass

# ROUTING #
@app.route('/')
def beranda():
    return render_template('index.html')
    
@app.route('/aplikasi')
def aplikasi():
    print('open')
    return render_template('aplikasi.html')

@app.route('/tim')
def tim():
    return render_template('team.html')
    
@app.route('/video_feed')
def video_feed():
    return Response(gen_frames(), mimetype='multipart/x-mixed-replace; boundary=frame')

@app.route('/requests',methods=['POST','GET'])
def tasks():
    global switch,camera
    print('tasks')
    if request.method == 'POST':
        global capture
        capture = (request.form['capture'])

        success, frame = camera.read()
        if success:
            global now
            now = datetime.datetime.now()
            filename = os.path.sep.join(['static/img/uploads', "upload_{}.jpg".format(str(now).replace(":",''))])
            cv2.imwrite(filename, cv2.flip(frame,1))   
            print('captured')    
        
        filename = "upload_{}.jpg".format(str(now).replace(":",''))
        gambar_prediksi = "static/img/uploads/" + filename

        # open gambar prediksi
        test_image = Image.open(gambar_prediksi)
        
        # ubah ukuran gambar
        test_image_resized = test_image.resize((320, 320))
        
        # konversi gambar ke array

        image_array        = np.array(test_image_resized)
        test_image_x       = (image_array / 255) - 0.5
        test_image_x       = np.array([image_array])
		
		# Prediksi Gambar
        y_pred_test_single         = model.predict(test_image_x)
        y_pred_test_classes_single = np.argmax(y_pred_test_single, axis=1)
        print(y_pred_test_classes_single)
        
        hasil_prediksi = name_classes[y_pred_test_classes_single[0]]
        print('predicted')
        # Return hasil prediksi dengan format JSON
        return jsonify({
            "prediksi": hasil_prediksi,
			"gambar_prediksi" : gambar_prediksi
        })
    elif request.method=='GET':
        return render_template('aplikasi.html')

if __name__ == '__main__':
    
    model = load_model("skin-saviour3.h5")
    app.run(host="localhost", port=5000, debug=True)
    
camera.release()
cv2.destroyAllWindows()     