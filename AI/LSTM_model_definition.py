import tensorflow as tf
from tensorflow.keras.models import Model
from tensorflow.keras.layers import Input, LSTM, Dense, Dropout, BatchNormalization, Concatenate, Bidirectional, MultiHeadAttention, Layer
from tensorflow.keras.regularizers import l2
from tensorflow.keras.optimizers import Adam

# Attention Layer 정의
class AttentionLayer(tf.keras.layers.Layer):
    def __init__(self):
        super(AttentionLayer, self).__init__()

    def build(self, input_shape):
        self.W = self.add_weight(shape=(input_shape[-1], input_shape[-1]), initializer='random_normal', trainable=True)
        self.b = self.add_weight(shape=(input_shape[-1],), initializer='random_normal', trainable=True)
        self.u = self.add_weight(shape=(input_shape[-1], 1), initializer='random_normal', trainable=True)

    def call(self, x):
        score = tf.nn.tanh(tf.tensordot(x, self.W, axes=1) + self.b)
        attention_weights = tf.nn.softmax(tf.tensordot(score, self.u, axes=1), axis=1)
        context_vector = attention_weights * x
        context_vector = tf.reduce_sum(context_vector, axis=1)
        return context_vector

# TensorFlow 함수 tf.reduce_mean을 Keras 레이어로 감싸는 클래스 정의
class ReduceMeanLayer(Layer):
    def __init__(self):
        super(ReduceMeanLayer, self).__init__()

    def call(self, inputs):
        return tf.reduce_mean(inputs, axis=1)

# LSTM 모델 정의 함수
def create_multitask_lstm_model(input_shape, num_tasks):
    inputs = Input(shape=input_shape)

    x = Bidirectional(LSTM(128, return_sequences=True, kernel_regularizer=l2(0.01)))(inputs)
    x = BatchNormalization()(x)
    x = Dropout(0.3)(x)

    x = Bidirectional(LSTM(64, return_sequences=True, kernel_regularizer=l2(0.01)))(x)
    x = BatchNormalization()(x)
    x = Dropout(0.3)(x)

    attention_output = MultiHeadAttention(num_heads=4, key_dim=64)(x, x)
    attention_output = ReduceMeanLayer()(attention_output)

    common_dense = Dense(64, activation='relu')(attention_output)

    task_outputs = []
    for i in range(num_tasks):
        task_dense = Dense(32, activation='relu')(common_dense)
        task_output = Dense(1, activation='linear', name=f'task_{i}_output')(task_dense)
        task_outputs.append(task_output)

    model = Model(inputs=inputs, outputs=task_outputs)
    
    # 각 태스크에 대해 개별적인 손실 함수 정의
    losses = {f'task_{i}_output': 'mse' for i in range(num_tasks)}
    
    # 각 태스크의 손실에 가중치 부여 (필요에 따라 조정 가능)
    loss_weights = {f'task_{i}_output': 1.0 for i in range(num_tasks)}
    
    model.compile(optimizer=Adam(learning_rate=0.0001), loss=losses, loss_weights=loss_weights)
    return model