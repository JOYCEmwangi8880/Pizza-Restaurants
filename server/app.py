from flask import Flask, make_response, jsonify, request
from flask_cors import CORS
from flask_migrate import Migrate
from flask_restful import Api, Resource

from models import db, Restaurant, Pizza, RestaurantPizza


app = Flask(__name__)
CORS(app)


app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///joyce.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.json.compact = False

migrate = Migrate(app=app, db=db)

db.init_app(app=app)

api=Api(app=app)


class Restaurants(Resource):

    def get(self):
        restaurants = [restaurant.to_dict() for restaurant in Restaurant.query.all()]

        response = make_response(
            jsonify(restaurants),
            200
        )

        return response
    
class RestaurantsByID(Resource):
    def get(self, id):
        restaurant = Restaurant.query.filter_by(id=id).first().to_dict()

        if restaurant == None:
            return make_response({"error": "No restaurants found!"}, 404)

        response = make_response(
            jsonify(restaurant),
            200
        )

        return response
    
    def delete(self, id):
        restaurant = Restaurant.query.filter_by(id=id).first()

        if restaurant == None:
            return make_response({"error": "No restaurants found!"}, 404)
        
        db.session.delete(restaurant)
        response = make_response(
            {"message": "Restaurant deleted successfully"},
            204
        )

        return response
    

class Pizzas(Resource):
    def get(self):
        pizzas = [pizza.to_dict() for pizza in Pizza.query.all()]

        response = make_response(
            jsonify(pizzas),
            200
        )

        return response

class RestaurantPizzas(Resource):
    def post(self):
        try:
            new_restaurant_pizza = RestaurantPizza(
                price=request.get_json()['price'],
                restaurant_id=request.get_json()['restaurant_id'],
                pizza_id=request.get_json()['pizza_id']
            )

            db.session.add(new_restaurant_pizza)
            db.session.commit()

            response = make_response(
                jsonify(new_restaurant_pizza.to_dict(),
                        201)
            )

            return response
        
        except:
            return make_response({"errors": ["validation errors"]}, 400)



api.add_resource(Restaurants, '/restaurants', endpoint='restaurants')
api.add_resource(RestaurantsByID, '/restaurants/<int:id>', endpoint='restaurant_id')
api.add_resource(Pizzas, '/pizzas', endpoint='pizzas')
api.add_resource(RestaurantPizzas, '/restaurant_pizzas', endpoint='restaurant_pizzas')

if __name__ == "__main__":
    app.run(port=5000, debug=True)