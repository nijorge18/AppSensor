# mqtt_client.py
import json
import paho.mqtt.client as mqtt
from models import db, Sensor
from datetime import datetime

MQTT_BROKER = "mqtt-broker"  # 👈 nombre del servicio Docker o 'localhost' si pruebas local
MQTT_PORT = 1883
MQTT_TOPIC = "sensor/orquidea"  # 👈 el mismo topic que usará tu NodeMCU

def on_connect(client, userdata, flags, rc):
    print(f"[MQTT] Conectado al broker con código: {rc}")
    client.subscribe(MQTT_TOPIC)

def on_message(client, userdata, msg):
    print(f"[MQTT] Mensaje recibido en {msg.topic}: {msg.payload.decode()}")
    try:
        data = json.loads(msg.payload.decode())
        humedad = data.get("humedad")
        temperatura = data.get("temperatura")
        tipoSensor = data.get("tipoSensor", "esp8266")

        nuevo_registro = Sensor(
            humedad=humedad,
            temperatura=temperatura,
            tipoSensor=tipoSensor,
            timestamp=datetime.utcnow()
        )

        db.session.add(nuevo_registro)
        db.session.commit()
        print("[DB] Registro guardado correctamente")

    except Exception as e:
        print(f"[ERROR MQTT] {e}")

def start_mqtt(app):
    """Inicializa el cliente MQTT en un hilo separado"""
    client = mqtt.Client()
    client.on_connect = on_connect
    client.on_message = on_message

    # Importante: asegurarse de usar el contexto de la app Flask
    with app.app_context():
        client.connect(MQTT_BROKER, MQTT_PORT, 60)
        client.loop_start()
        print("[MQTT] Cliente iniciado y escuchando mensajes...")
