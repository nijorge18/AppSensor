from flask_cors import CORS
from datetime import datetime, timedelta
from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from models import db, Calendario, Sensor, Config
from mqtt_client import start_mqtt  

app = Flask(__name__)
CORS(app)

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql+psycopg2://postgres:1234@localhost:5432/appsensor_db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)



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


@app.get("/api/sensor/history")
def sensor_history():
    minutes = int(request.args.get("minutes", 5))
    cutoff = datetime.utcnow() - timedelta(minutes=minutes)

    registros = Sensor.query.filter(Sensor.timestamp >= cutoff)\
                            .order_by(Sensor.timestamp.asc())\
                            .all()

    return jsonify([
        {
            "id": r.id,
            "temperatura": r.temperatura,
            "humedad": r.humedad,
            "tipoSensor": r.tipoSensor,
            "timestamp": r.timestamp.isoformat()
        }
        for r in registros
    ])



@app.route("/config/frecuencia", methods=["GET"])
def get_frecuencia():
    config = Config.query.first()
    return jsonify({
        "frecuencia": config.frecuencia_minutos if config else 1
    })


@app.route("/config/frecuencia", methods=["POST"])
def set_frecuencia():
    data = request.get_json()
    minutos = int(data.get("frecuencia"))

    config = Config.query.first()
    if not config:
        config = Config(frecuencia_minutos=minutos)
        db.session.add(config)
    else:
        config.frecuencia_minutos = minutos

    db.session.commit()

    return jsonify({"ok": True, "frecuencia": minutos})


@app.route("/calendario", methods=["POST"])
def guardar_calendario():
    try:
        data = request.get_json()
        if not data:
            return jsonify({"ok": False, "error": "No se envió JSON"}), 400

        days = data.get("days")
        time_str = data.get("time")

        if not isinstance(days, list) or len(days) == 0:
            return jsonify({"ok": False, "error": "El campo 'days' debe ser una lista no vacía"}), 400

        try:
            datetime.strptime(time_str, "%H:%M")
        except (ValueError, TypeError):
            return jsonify({"ok": False, "error": "Formato de 'time' inválido. Use HH:MM"}), 400

        dias_str = ",".join(days)

        nuevo_calendario = Calendario(dias=dias_str, hora=time_str)
        db.session.add(nuevo_calendario)
        db.session.commit()

        return jsonify({
            "ok": True,
            "id": nuevo_calendario.id,
            "message": "Calendario guardado correctamente"
        }), 201

    except Exception as e:
        db.session.rollback()
        return jsonify({
            "ok": False,
            "error": "Error interno del servidor",
            "details": str(e)
        }), 500



@app.route("/calendario", methods=["GET"])
def obtener_calendario():
    calendario = Calendario.query.order_by(Calendario.created_at.desc()).all()
    return jsonify([
        {
            "id": c.id,
            "dias": c.dias.split(","),
            "hora": c.hora,
            "created_at": c.created_at.isoformat()
        }
        for c in calendario
    ])



if __name__ == "__main__":
    with app.app_context():
        db.create_all()

    start_mqtt(app)
    app.run(host="0.0.0.0", port=5000, debug=True)
