import tensorflow as tf
from tensorflow.keras.applications.inception_v3 import InceptionV3
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import *

inception = InceptionV3(input_shape=(400 , 400, 3), weights='imagenet', include_top=False)

for layer in inception.layers:
    layer.trainable = False

def make_model():
    model = Sequential()
    model.add(inception)
    model.add(GlobalAveragePooling2D())
    model.add(Flatten())
    model.add(Dropout(0.2))
    model.add(Dense(3, activation='softmax'))
    
    return model
