import os
from datetime import date, datetime
from dotenv import load_dotenv
from typing import Optional
from flask import Flask, request, jsonify
from flask_pydantic_spec import (
    FlaskPydanticSpec, Response, Request
)
from pydantic import BaseModel, Field, condate
from sqlalchemy import create_engine, Column, Integer, String, Date, Boolean
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

spec = FlaskPydanticSpec('flask', title='Pixelhouse - Python Rest API')
spec.register(app)

# Configuração do SQLAlchemy
# print(DATABASE_URL1)

load_dotenv()

DATABASE_URL1 = os.getenv("DATABASE_URL1")
engine = create_engine(DATABASE_URL1)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

# Definição da tabela
class UserDB(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(50), nullable=False)
    bornIn = Column(Date())
    email = Column(String(50), nullable=False)
    password = Column(String(50), nullable=False)
    receiveEmail = Column(Boolean, nullable=False, default=False)
    receiveSMS = Column(Boolean, nullable=False, default=False)

class QueryUser(BaseModel):
    id: Optional[int]
    name: Optional[str]
    email: Optional[str]
    password: Optional[str]
    receiveEmail: Optional[bool]
    receiveSMS: Optional[bool]

class User(BaseModel):
    name: str
    bornIn: date
    email: str
    password: str
    receiveEmail: bool
    receiveSMS: bool

class UserResponse(BaseModel):
    id: int
    name: str
    bornIn: str
    email: str
    password: str
    receiveEmail: bool 
    receiveSMS: bool 

class AllUsersResponse(BaseModel):
    userList: list[UserResponse]
    count: int

@app.get('/user')
@spec.validate(
    query=QueryUser, 
    resp=Response(HTTP_200=AllUsersResponse)
)
def search_users():
    """Listar todos os usuários"""
    db = SessionLocal()
    query_params = request.args
    filters = {k: v for k, v in query_params.items() if v is not None}
    query = db.query(UserDB).filter_by(**filters)
    all_users = query.all()

    user_responses = [
        UserResponse(
            id=user.id, 
            name=user.name, 
            bornIn=str(user.bornIn), 
            email=user.email, 
            password=user.password,
            receiveEmail=user.receiveEmail,
            receiveSMS=user.receiveSMS,
        )
        for user in all_users
    ]

    return jsonify(AllUsersResponse(
            userList=user_responses,
            count=len(user_responses)
        ).dict()
    )

@app.get('/user/<int:id>')
@spec.validate(resp=Response(HTTP_200=UserResponse))
def search_user(id):
    """Buscar um usuário por ID"""
    db = SessionLocal()
    user = db.query(UserDB).filter_by(id=id).first()
    if user is None:
        return {'message': 'User not found!'}, 404
    user_response = UserResponse(
        id=user.id, 
        name=user.name, 
        bornIn=str(user.bornIn),
        email=user.email, 
        password=user.password,
        receiveEmail=user.receiveEmail,
        receiveSMS=user.receiveSMS,
    )
    return jsonify(user_response.dict())

@app.post('/user')
@spec.validate(
    body=Request(User), 
    resp=Response(HTTP_201=UserResponse)
)
def register_user():
    """Cadastrar um usuário no banco de dados."""
    db = SessionLocal()
    body = request.json
    user = UserDB(
        name=body['name'], 
        bornIn=body['bornIn'], 
        email=body['email'], 
        password=body['password'], 
        receiveEmail=body['receiveEmail'], 
        receiveSMS=body['receiveEmail']
    )
    db.add(user)
    db.commit()
    db.refresh(user)
    return jsonify(UserResponse(
        id=user.id, 
        name=user.name, 
        bornIn=str(user.bornIn), 
        email=user.email, 
        password=user.password,
        receiveEmail=user.receiveEmail,
        receiveSMS=user.receiveSMS
        ).dict()
    ), 201

@app.put('/user/<int:id>')
@spec.validate(
    body=Request(User),
    resp=Response(HTTP_200=UserResponse)
)
def edit_user(id):
    """Editar um usuário no banco de dados."""
    db = SessionLocal()
    body = request.json
    user = db.query(UserDB).filter_by(id=id).first()
    if user is None:
        return {'message': 'User not found!'}, 404
    for field in UserDB.__table__.columns:
        field_name = field.name
        if field_name in body:
            setattr(user, field_name, body[field_name])
    db.commit()
    db.refresh(user)
    return jsonify(UserResponse(
        id=user.id, 
        name=user.name, 
        bornIn=str(user.bornIn), 
        email=user.email, 
        password=user.password,
        receiveEmail=user.receiveEmail,
        receiveSMS=user.receiveSMS
        ).dict()
    )

@app.delete('/user/<int:id>')
@spec.validate(resp=Response('HTTP_204'))
def delete_user(id):
    """Remover um usuário do banco de dados."""
    db = SessionLocal()
    user = db.query(UserDB).filter_by(id=id).first()
    if user is None:
        return {'message': 'User not found!'}, 404
    db.delete(user)
    db.commit()
    return '', 204

if __name__ == "__main__":
    app.run(debug=True)