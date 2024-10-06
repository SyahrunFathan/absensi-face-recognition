from datetime import datetime
from io import BytesIO
import math
from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import text
import face_recognition
import requests

app = Flask(__name__)
label_Predictions = ["Wajah Cocok !", "Wajah Tidak Cocok !"]

# Konfigurasi koneksi database
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root@localhost/db_inspektorat'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

office_coords = (-0.9195563, 119.8646318)

@app.route('/upload-image', methods=['POST'])
def face_recog():
    if 'file' not in request.files:
        return jsonify({'message': 'No file part'}), 400
    
    file = request.files['file']
    user_id = request.form.get('userId')
    status = request.form.get('status')
    latitude = request.form.get('latitude')
    longitude = request.form.get('longitude')
    user_location = (float(latitude), float(longitude))
    print(user_location)
    
    try:
        # Memuat gambar dan mendapatkan encoding wajah
        upload_image = face_recognition.load_image_file(file)
        upload_encodings = face_recognition.face_encodings(upload_image)
        
        if len(upload_encodings) == 0:
            return jsonify({'message': 'No face found in uploaded image'}), 400
        
        # Mengambil URL wajah dari database berdasarkan user_id
        result = db.session.execute(
            text("SELECT url FROM tb_face WHERE user_id = :user_id"), 
            {'user_id': user_id}
        )
        
        urls = [row[0] for row in result.fetchall()]
        db_encodings = []
        
        # Mendapatkan encoding wajah dari URL yang ditemukan
        for url in urls:
            response = requests.get(url)
            image = face_recognition.load_image_file(BytesIO(response.content))
            face_encoding = face_recognition.face_encodings(image)
            
            if face_encoding:
                db_encodings.append(face_encoding[0])
        
        if len(db_encodings) == 0:
            return jsonify({'message': 'Wajah anda tidak terdaftar dalam database!'}), 400
        
        # Membandingkan wajah yang diupload dengan wajah di database
        for camera_encoding in upload_encodings:
            face_distance = face_recognition.face_distance(db_encodings, camera_encoding)
        
        predictions = (1 - face_distance[0]) * 100
        
        if predictions > 50:
            now = datetime.now()
            formated_datetime = now.strftime("%Y-%m-%d %H:%M:%S")
            data_today = now.date()
            current_time = now.time()
            
            distance = algoritma_haversine(office_coords, user_location)
            if distance > 0.5:
                return jsonify({'message': 'Lokasi tidak valid untuk absensi! Jarak dari lokasi kantor terlalu jauh.'}), 400
            
            # Memeriksa apakah pengguna sudah melakukan absensi
            check_absensi = db.session.execute(
                text('SELECT * FROM tb_absensi WHERE user_id = :user_id AND tanggal_absensi = :tanggal_absensi AND status_absensi = :status_absensi'), 
                {'user_id': user_id, 'tanggal_absensi': data_today, 'status_absensi': status}
            )
            
            absensi_records = check_absensi.fetchall()
            
            if len(absensi_records) > 0:
                return jsonify({'message': 'Anda sudah melakukan absensi!'}), 400
            
            
            db.session.execute(
                text('INSERT INTO tb_absensi (user_id, tanggal_absensi, jam_absensi, status_absensi, status_kehadiran, createdAt, updatedAt) VALUES (:user_id, :tanggal_absensi, :jam_absensi, :status_absensi, :status_kehadiran, :createdAt, :updatedAt)'),
                {
                    'user_id': user_id,
                    'tanggal_absensi': data_today,
                    'jam_absensi': current_time,
                    'status_absensi': status,
                    'status_kehadiran': 'Hadir',
                    'createdAt': formated_datetime,
                    'updatedAt': formated_datetime
                }
            )
            
            result_face = label_Predictions[0]
            db.session.commit()
        else:
            result_face = label_Predictions[1]
            
        return jsonify({"prediction": predictions, "message": result_face}), 200
            
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    
def algoritma_haversine(coords1, coords2):
    R = 6371
    lat1, lon1 = coords1
    lat2, lon2 = coords2
    
    dlat = math.radians(lat2 - lat1)
    dlon = math.radians(lon2 - lon1)
    
    a = (math.sin(dlat / 2) * math.sin(dlat / 2) + math.cos((lat2 * math.pi) / 180) * math.cos((lat1 * math.pi) / 180) * math.sin(dlon / 2) * math.sin(dlon / 2))
    c = 2 * math.asin(math.sqrt(a))
    
    return R * c

@app.route('/', methods=['GET'])
def getData():
    result = db.session.execute(text('SELECT * FROM tb_user'))
    data = result.fetchall()
    
    data_list = []
    for item in data:
        data_list.append({'id_user': item[0]})
    
    return jsonify({'data': data_list})

if __name__ == "__main__":
    app.run(host='192.168.1.25', port=5000)
