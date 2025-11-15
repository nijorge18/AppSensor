from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()


class Calendario(db.Model):
    __tablename__ = "calendario"

    id = db.Column(db.Integer, primary_key=True)
    dias = db.Column(db.String(200), nullable=False)
    hora = db.Column(db.String(20), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def __repr__(self):
        return f"<Calendario {self.id}: {self.dias} - {self.hora}>"


class Sensor(db.Model):
    __tablename__ = "sensor"

    id = db.Column(db.Integer, primary_key=True)
    humedad = db.Column(db.Float, nullable=False)
    temperatura = db.Column(db.Float, nullable=False)
    tipoSensor = db.Column(db.String(50), nullable=True)
    timestamp = db.Column(db.DateTime, default=datetime.utcnow)

    def __repr__(self):
        return f"<Sensor {self.id}: {self.humedad}% - {self.temperatura}°C>"


class Config(db.Model):
    __tablename__ = "config"

    id = db.Column(db.Integer, primary_key=True)
    frecuencia_minutos = db.Column(db.Integer, default=5) 

    def __repr__(self):
        return f"<Config frecuencia={self.frecuencia_minutos} min>"
