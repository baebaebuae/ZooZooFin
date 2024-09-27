from app import app
from waitress import serve

if __name__ == "__main__":
    serve(app, host="0.0.0.0", port=8080)

   # 설명:
   # 1. 'from app import app'는 여러분의 Flask 애플리케이션을 가져옵니다.
   #    'app'은 여러분의 Flask 애플리케이션 파일 이름입니다 (예: app.py).
   # 2. Waitress의 serve 함수를 사용하여 애플리케이션을 실행합니다.
   # 3. host="0.0.0.0"은 모든 네트워크 인터페이스에서 접근 가능하게 합니다.
   # 4. port=8080은 8080번 포트를 사용합니다. 필요에 따라 변경 가능합니다.