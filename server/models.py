from flask_sqlalchemy import SQLAlchemy
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy import CheckConstraint

db = SQLAlchemy()

class Restaurant(db.Model, SerializerMixin):

    __tablename__ = "restaurants"

    serialize_rules = ('-restaurant_pizzas.restaurant', )

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    address = db.Column(db.String, nullable=False)

    restaurant_pizzas = db.relationship('RestaurantPizza', backref='restaurant')


class Pizza(db.Model, SerializerMixin):

    __tablename__ = "pizzas"

    serialize_rules = ('-restaurant_pizzas.pizza', )

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    ingredients = db.Column(db.String, nullable=False)

    restaurant_pizzas = db.relationship('RestaurantPizza', backref='pizza')


class RestaurantPizza(db.Model, SerializerMixin):

    __tablename__ = "restaurant_pizzas"

    serialize_rules = ('-restaurant.restaurant_pizzas', '-pizza.restaurant_pizzas', )

    id = db.Column(db.Integer, primary_key=True)
    price = db.Column(db.Integer, CheckConstraint('(price > 1) and (price < 30)'), nullable=False)

    pizza_id = db.Column(db.Integer, db.ForeignKey('pizzas.id'))
    restaurant_id = db.Column(db.Integer, db.ForeignKey('restaurants.id'))