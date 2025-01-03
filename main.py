from flask import Flask, jsonify
import http.client

app = Flask(__name__)

@app.route('/oxford/<word>', methods=['GET'])
def get_word_data(word):
    # Oxford API'ye bağlan
    conn = http.client.HTTPSConnection("od-api-sandbox.oxforddictionaries.com")

    headers = {
        'app_id': "23a21135",  # Kendi APP_ID'inizi buraya koyun
        'app_key': "5503fd2048f9d9ef475179ce95fd0647",  # Kendi APP_KEY'inizi buraya koyun
        'Accept': "application/json"
    }

    # API isteği oluştur
    url = f"/api/v2/entries/en-gb/{word}"
    conn.request("GET", url, headers=headers)

    # Yanıtı al
    res = conn.getresponse()
    data = res.read()

    # JSON formatında döndür
    return jsonify({
        "word": word,
        "data": data.decode("utf-8")
    })

if __name__ == '_main_':
    app.run(debug=True)