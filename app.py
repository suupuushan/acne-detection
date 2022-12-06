# LIBRARY #
from flask import Flask, render_template, Response, request
import cv2
import datetime
import os
import numpy as np
from PIL import Image

# VARIABLE GLOBAL #
global capture, switch, filename
capture=0
switch=1

model = None

NUM_CLASSES = 3
name_classes = ["Eczema", "Basal Cell Carcinoma", "Melanocytic Nevi"]

# INISIASI FLASK APP #  
app = Flask(__name__, static_url_path='/static')

# DIRECTORY PENYIMPANAN GAMBAR WEBCAM #
try:
    os.mkdir("./uploads")
except OSError as error:
    pass

# FLASK CAMERA #
camera = cv2.VideoCapture(0)

# FUNGSI #
# generate frame by frame from camera
def gen_frames():  
    global capture, filename
    while True:
        success, frame = camera.read() 
        if success: 
            if(capture):
                capture=0
                now = datetime.datetime.now()
                filename = os.path.sep.join(['uploads', "upload_{}.jpg".format(str(now).replace(":",''))])
                cv2.imwrite(filename, frame)     
            try:
                ret, buffer = cv2.imencode('.jpg', cv2.flip(frame,1))
                frame = buffer.tobytes()
                yield (b'--frame\r\n'
                       b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')
            except Exception as e:
                pass
                
        else:
            pass

# # prediksi penyakit kulit
# def predict():
#     if filename != '':
#         file_ext = os.path.splitext(filename)[1]
#         gambar_prediksi = 'uploads/' + filename

#         # open gambar prediksi
#         test_image = Image.open('.' + gambar_prediksi)
		
#         # ubah ukuran gambar
#         test_image_resized = test_image.resize((32, 32))
		
#         # konversi gambar ke array
#         image_array = np.array(test_image_resized)
#         test_image_x = (image_array / 255) - 0.5
#         test_image_x = np.array([image_array])

#         # prediksi gambar
#         y_pred_test_single = model.predict_proba(test_image_x)
#         y_pred_test_classes_single = np.argmax(y_pred_test_single, axis=1)
		
#         hasil_prediksi = name_classes[y_pred_test_classes_single[0]]

#     return 'Hai'


  
# ROUTING #
@app.route('/')
def beranda():
    return render_template('index.html')
    
@app.route('/aplikasi')
def aplikasi():
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
    if request.method == 'POST':
        if request.form.get('click') == 'Ambil & Prediksi Foto':
            global capture
            capture=1
        elif  request.form.get('stop') == 'Stop/Start Kamera':
            if(switch==1):
                switch=0
                camera.release()
                cv2.destroyAllWindows()
            else:
                camera = cv2.VideoCapture(0)
                switch=1

    elif request.method=='GET':
        return render_template('aplikasi.html')
    return render_template('aplikasi.html')

if __name__ == '__main__':
    app.run()
    
camera.release()
cv2.destroyAllWindows()     