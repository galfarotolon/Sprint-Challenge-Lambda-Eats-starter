import React, { useState, useEffect } from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import axios from 'axios'
import * as yup from 'yup'
import Form from "./Form"

const url = 'https://reqres.in/api/users'

const initialFormValues = {

  name: '',
  size: '',
  toppings: {
    ham: false,
    pepperoni: false,
    olives: false,
    bbq: false,
    cheese: false,
  },
  instructions: '',

}

const initialFormErrors = {
  name: '',


}

const formSchema = yup.object().shape({
  name: yup
    .string()
    .min(2, 'name must have at least 2 characters!')
    .required('Name is required!'),
  size: yup
    .string()
    .required('Size is required'),
  instructions: yup
    .string()
    .required("")




})



const App = () => {


  const [users, setUsers] = useState([])

  const [formValues, setFormValues] = useState(initialFormValues)

  const [formDisabled, setFormDisabled] = useState(true)


  const [formErrors, setFormErrors] = useState(initialFormErrors)


  const postPizza = user => {

    axios.post(url, user)
      .then(res => {
        setUsers([res.data, ...users])
        console.log(res.data)
      })
      .catch(err => {
        debugger
      })

  }



  useEffect(() => {

    formSchema.isValid(formValues)
      .then(valid => {
        setFormDisabled(!valid)
      })
  }, [formValues])

  const onSubmit = evt => {
    evt.preventDefault()

    const newPizza = {
      name: formValues.name,
      size: formValues.size,
      toppings: Object.keys(formValues.toppings)
        .filter(topping => formValues.toppings[topping] === true),
      instructions: formValues.instructions
    }

    postPizza(newPizza)

    setFormValues(initialFormValues)

  }


  const onInputChange = evt => {

    const name = evt.target.name
    const value = evt.target.value


    yup
      .reach(formSchema, name)
      .validate(value)
      .then(valid => {

        setFormErrors({
          ...formErrors,
          [name]: "",

        })
      })
      .catch(err => {
        setFormErrors({
          ...formErrors,
          [name]: err.errors[0]
        })
      })


    setFormValues({
      ...formValues,
      [name]: value,
    })
  }

  const onCheckboxChange = evt => {
    const name = evt.target.name
    const isChecked = evt.target.checked



    setFormErrors({
      ...formErrors,
      [name]: "",

    })


    setFormValues({
      ...formValues,
      toppings: {
        ...formValues.toppings,
        [name]: isChecked,
      }

    })
  }


  return (
    <div>
      <>
        <h1>Lambda Eats</h1>

      </>
      <Route exact path="/">
      </Route>


      <Link to="/">
        <h2>Home</h2>

      </Link>
      <Link to="/pizza">
        <h2>Pizza Form</h2>

      </Link>


      <Route path="/pizza" >
        <Form
          values={formValues}
          onInputChange={onInputChange}
          onCheckboxChange={onCheckboxChange}
          onSubmit={onSubmit}

          disabled={formDisabled}
          errors={formErrors}

        />


        {
          users.map(user => {
            return (
              <div>

                <h3>Your Order:</h3>

                <p><strong>Name: </strong>{user.name}</p>
                <p><strong>Pizza Size: </strong>{user.size}</p>
                <p><strong>Selected Toppings:</strong> {user.toppings}</p>
                <p><strong>Additional Comments:</strong>{user.instructions}</p>

              </div>

            )
          })
        }


      </Route>
    </div>
  );
};
export default App;