from datetime import datetime, timezone
from typing import List
from uuid import uuid4

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

app = FastAPI(
    title="EchoLife API",
    description="Personal Continuity OS — Daily Pulse API",
    version="0.1.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class PulseCreate(BaseModel):
    text: str = Field(..., min_length=1, max_length=2000)


class Pulse(BaseModel):
    id: str
    text: str
    created_at: str


# MVP: in-memory (reset saat server restart)
_pulses: List[Pulse] = []


@app.get("/health")
def health():
    return {"status": "ok", "service": "echolife-api"}


@app.get("/pulses", response_model=List[Pulse])
def list_pulses():
    return sorted(_pulses, key=lambda p: p.created_at, reverse=True)


@app.post("/pulses", response_model=Pulse, status_code=201)
def create_pulse(body: PulseCreate):
    pulse = Pulse(
        id=str(uuid4()),
        text=body.text.strip(),
        created_at=datetime.now(timezone.utc).isoformat(),
    )
    _pulses.append(pulse)
    return pulse


@app.delete("/pulses/{pulse_id}", status_code=204)
def delete_pulse(pulse_id: str):
    global _pulses
    _pulses = [p for p in _pulses if p.id != pulse_id]
    return None
