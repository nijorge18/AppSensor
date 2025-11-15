import paho.mqtt.client as mqtt
from models import db, Sensor, Config
from datetime import datetime, timedelta

MQTT_BROKER = "broker.emqx.io"
MQTT_PORT = 1883
MQTT_TOPICS = ["node/temperatura", "node/humedad"]

latest_data = {"temperatura": None, "humedad": None}
last_saved = None


def on_connect(client, userdata, flags, rc):
    print(f"[MQTT] Conectado al broker con código {rc}")
    for topic in MQTT_TOPICS:
        client.subscribe(topic)
        print(f"[MQTT] Suscrito al tópico: {topic}")


def on_message(client, userdata, msg):
    global last_saved
    try:
        topic = msg.topic
        value = msg.payload.decode()
        print(f"[MQTT] Mensaje recibido en {topic}: {value}")

        if "temperatura" in topic:
            latest_data["temperatura"] = float(value)
        elif "humedad" in topic:
            latest_data["humedad"] = float(value)

        if latest_data["temperatura"] is not None and latest_data["humedad"] is not None:

        
            config = Config.query.first()
            frecuencia = config.frecuencia_minutos if config else 5

            now = datetime.utcnow()

        
            if last_saved is None or now - last_saved >= timedelta(minutes=frecuencia):

                nuevo = Sensor(
                    temperatura=latest_data["temperatura"],
                    humedad=latest_data["humedad"],
                    tipoSensor="esp8266",
                    timestamp=now
                )
                db.session.add(nuevo)
                db.session.commit()

                print(f"[DB] Registro guardado (cada {frecuencia} minutos)")
                last_saved = now

            latest_data["temperatura"] = None
            latest_data["humedad"] = None

    except Exception as e:
        print(f"[ERROR MQTT] {e}")


def start_mqtt(app):
    client = mqtt.Client()

    client.on_connect = on_connect

    def wrapper(client, userdata, msg):
        with app.app_context():
            on_message(client, userdata, msg)

    client.on_message = wrapper

    client.connect(MQTT_BROKER, MQTT_PORT, 60)
    client.loop_start()

    print("[MQTT] Cliente iniciado y escuchando mensajes...")
