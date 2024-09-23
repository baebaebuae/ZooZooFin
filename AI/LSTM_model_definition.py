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
def create_multitask_lstm_model(input_shape, num_sectors):
    inputs = Input(shape=input_shape)

    # 첫 번째 Bidirectional LSTM 레이어
    x = Bidirectional(LSTM(128, return_sequences=True, kernel_regularizer=l2(0.01)))(inputs)
    x = BatchNormalization()(x)
    x = Dropout(0.3)(x)

    # 두 번째 Bidirectional LSTM 레이어
    x = Bidirectional(LSTM(64, return_sequences=True, kernel_regularizer=l2(0.01)))(x)
    x = BatchNormalization()(x)
    x = Dropout(0.3)(x)

    # Multi-head Attention Layer 추가
    attention_output = MultiHeadAttention(num_heads=4, key_dim=64)(x, x)

    # ReduceMeanLayer로 tf.reduce_mean 적용
    attention_output = ReduceMeanLayer()(attention_output)

    # 공통 Dense 레이어
    common_dense = Dense(64, activation='relu')(attention_output)

    # 각 섹터별 출력 레이어 생성
    sector_outputs = []
    for i in range(num_sectors):
        sector_dense = Dense(32, activation='relu')(common_dense)
        sector_output = Dense(1, activation='linear', name=f'sector_{i}_output')(sector_dense)
        sector_outputs.append(sector_output)

    # 멀티 태스크 모델 생성
    model = Model(inputs=inputs, outputs=sector_outputs)
    model.compile(optimizer=Adam(learning_rate=0.0001), loss='mse')
    return model
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
def create_multitask_lstm_model(input_shape, num_sectors):
    inputs = Input(shape=input_shape)

    # 첫 번째 Bidirectional LSTM 레이어
    x = Bidirectional(LSTM(128, return_sequences=True, kernel_regularizer=l2(0.01)))(inputs)
    x = BatchNormalization()(x)
    x = Dropout(0.3)(x)

    # 두 번째 Bidirectional LSTM 레이어
    x = Bidirectional(LSTM(64, return_sequences=True, kernel_regularizer=l2(0.01)))(x)
    x = BatchNormalization()(x)
    x = Dropout(0.3)(x)

    # Multi-head Attention Layer 추가
    attention_output = MultiHeadAttention(num_heads=4, key_dim=64)(x, x)

    # ReduceMeanLayer로 tf.reduce_mean 적용
    attention_output = ReduceMeanLayer()(attention_output)

    # 공통 Dense 레이어
    common_dense = Dense(64, activation='relu')(attention_output)

    # 각 섹터별 출력 레이어 생성
    sector_outputs = []
    for i in range(num_sectors):
        sector_dense = Dense(32, activation='relu')(common_dense)
        sector_output = Dense(1, activation='linear', name=f'sector_{i}_output')(sector_dense)
        sector_outputs.append(sector_output)

    # 멀티 태스크 모델 생성
    model = Model(inputs=inputs, outputs=sector_outputs)
    model.compile(optimizer=Adam(learning_rate=0.0001), loss='mse')
    return model
