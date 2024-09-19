import pandas as pd
import numpy as np
import tensorflow as tf
from tensorflow.keras.models import Model
from tensorflow.keras.layers import Input, LSTM, Dense, ReLU
from sklearn.preprocessing import MinMaxScaler
# LSTM 모델 생성

# 슬라이딩 윈도우 방식으로 30일 단위 데이터를 만들기 위한 함수
def create_dataset(data, time_step=30):
    X, y = [], []
    for i in range(len(data) - time_step):
        X.append(data[i:(i + time_step), :])  # 30일치 데이터 입력
        y.append(data[i + time_step, 3])  # 31일째의 'Close' 가격을 예측 목표로 설정
    return np.array(X), np.array(y)

# 데이터 불러오기 및 전처리
data = pd.read_csv('stock_data.csv')  # 'stock_data.csv' 파일에 실제 데이터를 넣어야 함
data['Date'] = pd.to_datetime(data['Date'])
filtered_data = data[(data['Date'] >= '2022-01-01') & (data['Date'] <= '2023-06-30')]

# 데이터 정규화 (Min-Max 정규화 적용)
scaler = MinMaxScaler(feature_range=(0, 1))
scaled_data = scaler.fit_transform(filtered_data[['Open', 'High', 'Low', 'Close', 'Volume', 'Pos', 'Neg']])

# 30일치 데이터를 학습 데이터로 만들기
X, y = create_dataset(scaled_data, time_step=30)

# 모델 생성 함수
def create_model():
    input_layer = Input(shape=(30, 7))  # 30일치, 7개 피처
    lstm_shared = LSTM(64, return_sequences=False)(input_layer)
    relu_output = ReLU()(lstm_shared)
    output = Dense(1)(relu_output)  # 주가 예측
    model = Model(inputs=input_layer, outputs=output)
    model.compile(optimizer='adam', loss='mse')
    return model

# 모델 생성 및 학습
model = create_model()
model.fit(X, y, epochs=10)

# 학습된 모델 저장
model.save('stock_model.h5')
