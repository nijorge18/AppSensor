
from flask_cors import CORS
from datetime import datetime
from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import text
from models import db, Calendario, Sensor





from flask import Flask, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from sqlalchemy import text  # 👈 necesario para consultas SQL explícitas
from datetime import datetime

app = Flask(__name__)
CORS(app)

# Configuración de la base de datos PostgreSQL
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql+psycopg2://postgres:1234@localhost:5432/appsensor_db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)


# ruta para testear la conexión a la base de datos
@app.route("/test-db")
def test_db():
    try:
        # Intentar una consulta simple con text()
        db.session.execute(text("SELECT 1"))  # 👈 cambio clave
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


#  ejemplo para insertar datos del sensor
@app.route("/sensor", methods=["POST"])
def insertar_datos_sensor():
    data = request.get_json()
    nuevos_datos = Sensor(
        humedad=data.get("humedad"),
        temperatura=data.get("temperatura"),
        tipoSensor=data.get("tipoSensor", None)
    )
    db.session.add(nuevos_datos)
    db.session.commit()
    return jsonify({"ok": True, "id": nuevos_datos.id})


#  ejemplo para leer datos del sensor
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


if __name__ == "__main__":
    with app.app_context():
        db.create_all()   
    app.run(debug=True)
