
from flask_cors import CORS
from datetime import datetime
from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import text
from models import db, Calendario, Sensor
from datetime import datetime

app = Flask(__name__)
CORS(app)

# Configuración de la base de datos PostgreSQL
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql+psycopg2://postgres:1234@localhost:5432/appsensor_db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# inicializar la bd
db.init_app(app)


# ruta para testear la conexión a la base de datos
@app.route("/test-db")
def test_db():
    try:
        
        db.session.execute(text("SELECT 1"))  
        return jsonify({
            "ok": True,
            "message": "Conexión exitosa a la base de datos",
            "fecha": datetime.utcnow()
        })
    except Exception as e:
        return jsonify({
            "ok": False,
            "error": str(e)
        }), 500





#   ruta para obtener los datos del sensor
@app.route("/sensor", methods=["GET"])
def obtener_datos_sensor():
    datos_sensor = Sensor.query.order_by(Sensor.timestamp.desc()).all()
    return jsonify([
        {
            "id": s.id,
            "humedad": s.humedad,
            "temperatura": s.temperatura,
            "tipoSensor": s.tipoSensor,
            "timestamp": s.timestamp.isoformat()
        } for s in datos_sensor
    ])


# Ruta para guardar el calendario de riego
@app.route("/calendario", methods=["POST"])
def guardar_calendario():
    data = request.get_json()
    dias = ",".join(data.get("days", []))  
    hora = data.get("time")

    nuevo_calendario = Calendario(dias=dias, hora=hora)
    db.session.add(nuevo_calendario)
    db.session.commit()

    return jsonify({"ok": True, "id": nuevo_calendario.id})


# ruta para obtener el calendariod e riego
@app.route("/calendario", methods=["GET"])
def obtener_calendario():
    calendario = Calendario.query.order_by(Calendario.created_at.desc()).all()
    return jsonify([
        {
            "id": c.id,
            "dias": c.dias.split(","),  
            "hora": c.hora,
            "created_at": c.created_at.isoformat()
        } for c in calendario
    ])



if __name__ == "__main__":
    with app.app_context():
        db.create_all() 
    app.run(debug=True)
