import Card from '../UI/Card';
import MealsItem from './MealsItem/MealsItem';
import classes from './AvailableMeals.module.css';
import { useEffect, useState } from 'react';


const AvailableMeals = () =>{
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState();
  
  useEffect( () => {    
    // sending such a http request is a asynchronus task
    const fetchMeals = async () => {
    const response = await fetch('https://foodigoo-b5728-default-rtdb.asia-southeast1.firebasedatabase.app/meals.json');

    if (!response.ok){
      throw new Error('Something went wrong!');
      // this string stored as Error property
    }

    const responseData = await response.json();
    // when we get our data responseData will be an object but we want array so to do this
    const loadedMeals = [];

    // for loop to go through all the keys in response data object ( keys will be those ID's and values will be nested objects)
    for(const key in responseData){
     loadedMeals.push({
       id: key,
       name: responseData[key].name,
       description: responseData[key].description,
       price: responseData[key].price,
     });
    }
    setMeals(loadedMeals);
    setIsLoading(false);
    };

    fetchMeals().catch((error) => {
      setIsLoading(false);
      setHttpError(error.message);
    }); // traditional promise only way to handle error inside of a promise
      // we get error as object here and then objest as default has a message property

  }, []);
  // this blank [] means no depenedancy i means it will load when component first loaded ,  it will not change afterward and that makes sense
  
  if(isLoading) {
    return(
      <section className={classes.MealsLoading}>
        <p>Loading...</p>
      </section>
    );
  }

  if(httpError) {
    return(
      <section className={classes.MealsError}>
        <p>{httpError}</p>
      </section>
    );
  }

   // For every meal we are returning a JSX element
    const mealslist = meals.map(meal => (
      <MealsItem
      id = {meal.id}
      key = {meal.id}
      name = {meal.name}
      description = {meal.description}
      price = {meal.price}

      // we can also do meal = {meal} as a whole in place of name , description and price but than at MealsItem we have to do prop.meal.name , prop.meal.description 
      />
   ))

    return(
        <section className={classes.meals}>
          <Card> 
            <ul>
                {mealslist}
            </ul>
          </Card>   
        </section>
    )
};

export default AvailableMeals;