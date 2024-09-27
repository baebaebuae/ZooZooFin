from flask import Flask, request, jsonify
import pandas as pd
import numpy as np
import os
from keras.models import load_model
from keras.layers import Layer
from sklearn.preprocessing import StandardScaler
from datetime import datetime, timedelta
import tensorflow as tf
from KR_FinBert import analyze_news

app = Flask(__name__)

# 모델 및 데이터 경로 설정
path = os.path.dirname(os.path.abspath(__file__)) 
MODEL_DIR = "LSTM_MODELS"
DATA_DIR = "STOCK_DATA"

# 커스텀 레이어 정의
class ReduceMeanLayer(Layer):
    def __init__(self, **kwargs):
        super(ReduceMeanLayer, self).__init__(**kwargs)
    
    def call(self, x):
        return tf.reduce_mean(x, axis=1)

class AttentionLayer(Layer):
    def __init__(self, **kwargs):
        super(AttentionLayer, self).__init__(**kwargs)
    
    def build(self, input_shape):
        self.W = self.add_weight(name="att_weight", shape=(input_shape[-1], 1),
                                 initializer="normal")
        self.b = self.add_weight(name="att_bias", shape=(input_shape[1], 1),
                                 initializer="zeros")
        super(AttentionLayer, self).build(input_shape)
    
    def call(self, x):
        et = tf.keras.backend.squeeze(tf.keras.backend.tanh(tf.keras.backend.dot(x, self.W) + self.b), axis=-1)
        at = tf.keras.backend.softmax(et)
        at = tf.keras.backend.expand_dims(at, axis=-1)
        output = x * at
        return tf.keras.backend.sum(output, axis=1)
    
    def compute_output_shape(self, input_shape):
        return (input_shape[0], input_shape[-1])

def load_and_preprocess_data(stock_field, stock_code, start_date, sequence_length=30):
    file_path = os.path.join(path, DATA_DIR, stock_field, f"daily_stock_data_{stock_code}.csv")
    print(file_path)

    if not os.path.exists(file_path):
        return None, None, f"주식 코드 {stock_code}에 대한 데이터를 찾을 수 없습니다."

    df = pd.read_csv(file_path)
    df['Date'] = pd.to_datetime(df['Date'])
    df = df.sort_values('Date')
    df = df[df['Date'] <= start_date]
    
    if len(df) < sequence_length:
        return None, None, f"주식 코드 {stock_code}에 대한 데이터가 {sequence_length}개 이상 필요합니다."
    
    df = df.iloc[-sequence_length:]
    df = df[['Date', 'Open', 'High', 'Low', 'Close', 'Volume']]
    
    for col in ['Open', 'High', 'Low', 'Close', 'Volume']:
        df[col] = pd.to_numeric(df[col], errors='coerce')
    df.fillna(0, inplace=True)
    
    df['변동률'] = (df['High'] - df['Low']) / df['Open']
    df['MA5'] = df['Close'].rolling(window=5).mean().fillna(0)
    df['MA20'] = df['Close'].rolling(window=20).mean().fillna(0)
    df['RSI'] = compute_RSI(df['Close'])
    df['MACD'] = compute_MACD(df['Close'])
    
    features = ['Open', 'High', 'Low', 'Close', 'Volume', '변동률', 'MA5', 'MA20']
    df_features = df[features]
    
    scaler = StandardScaler()
    scaled_features = scaler.fit_transform(df_features)
    
    sequence_data = []
    for i in range(len(scaled_features) - sequence_length + 1):
        sequence_data.append(scaled_features[i:i + sequence_length])
    
    sequence_data = np.array(sequence_data)
    
    return sequence_data, scaler, None

def compute_RSI(series, period=14):
    delta = series.diff()
    gain = np.where(delta > 0, delta, 0)
    loss = np.where(delta < 0, -delta, 0)
    avg_gain = pd.Series(gain).rolling(window=period, min_periods=1).mean()
    avg_loss = pd.Series(loss).rolling(window=period, min_periods=1).mean()
    rs = avg_gain / avg_loss
    return 100 - (100 / (1 + rs))

def compute_MACD(series, short_window=12, long_window=26, signal_window=9):
    short_ema = series.ewm(span=short_window, adjust=False).mean()
    long_ema = series.ewm(span=long_window, adjust=False).mean()
    macd = short_ema - long_ema
    signal = macd.ewm(span=signal_window, adjust=False).mean()
    return macd - signal

def load_custom_model(model_path):
    try:
        custom_objects = {
            'ReduceMeanLayer': ReduceMeanLayer,
            'AttentionLayer': AttentionLayer
        }
        model = load_model(model_path, custom_objects=custom_objects)
        return model, None
    except IOError as e:
        return None, f"모델 파일을 찾을 수 없습니다: {str(e)}"
    except ValueError as e:
        return None, f"모델 구조나 가중치에 문제가 있습니다: {str(e)}"
    except Exception as e:
        return None, f"모델을 불러오는 중 예상치 못한 오류가 발생했습니다: {str(e)}"


@app.route('/lstm-predict', methods=['POST'])
def predict():
    industry_field = request.form['industry_field']
    stock_field = request.form['stock_field']
    stock_code = request.form['stock_code']
    input_date = request.form['input_date']
    news_data = request.form.get('news_data', '')  # 'news_data'가 없으면 빈 문자열 반환

    valid_industry_fields = [
        "manufacturing", "joseon", "machinery_construction", 
        "it", "semiconductor", "entertainment", 
        "bio", "food", "chemical", 
        "finance", "REITs", "China"
    ]
    valid_stock_fields = ["domestic", "oversea", "etf"]

    if industry_field not in valid_industry_fields:
        return jsonify(error=f"산업 분야 '{industry_field}'는 유효하지 않습니다. 유효한 값을 입력하세요.")

    if stock_field not in valid_stock_fields:
        return jsonify(error=f"주식 분야 '{stock_field}'는 유효하지 않습니다. 유효한 값을 입력하세요.")

    try:
        start_date = datetime.strptime(input_date, "%Y-%m-%d")
    except ValueError:
        return jsonify(error="날짜 형식이 올바르지 않습니다. YYYY-MM-DD 형식으로 입력하세요.")

    model_name = f"model_{industry_field}_{stock_field}"
    model_path = os.path.join(path, MODEL_DIR, f"{model_name}.keras")
    print(model_path)

    if not os.path.exists(model_path):
        return jsonify(error=f"{model_name} 모델을 찾을 수 없습니다. 입력된 산업 분야와 주식 분야가 정확한지 확인하세요.")

    sequence_length = 30
    input_data, scaler, error = load_and_preprocess_data(stock_field, stock_code, start_date, sequence_length)
    if error:
        return jsonify(error=error)

    model, error = load_custom_model(model_path)
    if error:
        return jsonify(error=error)

    try:
        predictions = model.predict(input_data)[0][0]
        predictions_scaled = np.zeros((1, 8))
        predictions_scaled[0, 3] = predictions
        predicted_price = scaler.inverse_transform(predictions_scaled)[0, 3]
    except Exception as e:
        return jsonify(error=f"예측 중 오류가 발생했습니다: {str(e)}")
    
    response = {
        "predicted_price": predicted_price
    }

    if news_data:
        try:
            # 뉴스 분석 결과를 response에 추가
            analysis_result = analyze_news(news_data)
            response.update({
                "positive_sentences": analysis_result.get("positive_sentences"),
                "negative_sentences": analysis_result.get("negative_sentences"),
                "positive_ratio": analysis_result.get("positive_ratio"),
                "negative_ratio": analysis_result.get("negative_ratio"),
                "neutral_ratio": analysis_result.get("neutral_ratio"),
                "summary": analysis_result.get("summary")
            })
        except Exception as e:
            return jsonify(error=f"뉴스 분석 중 오류가 발생했습니다: {str(e)}")

    return jsonify(response)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=False)
