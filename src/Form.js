//Practice pizza form

import React from 'react'

function Form(props) {
    const {
        values,
        onInputChange,
        onCheckboxChange,
        onSubmit,

        disabled,
        errors,
    } = props

    return (
        <form className='pizza-container'>
            <h2>Build Your Own Pizza!</h2>
            {/*  ERRORS */}

            <div className='errors'>
                {errors.name}

            </div>

            {/* ////////// TEXT INPUTS ////////// */}
            <label>Name:&nbsp;
      <input
                    data-cy_name_input='cy_name_input'
                    value={values.name}
                    onChange={onInputChange}
                    name='name'
                    type='text'
                /></label>


            {/* ////////// DROPDOWN ////////// */}
            <label>Choose Your Pizza Size:&nbsp;
      <select
                    value={values.size}
                    onChange={onInputChange}
                    name='size'
                >
                    <option defaultValue=''>Please choose</option>
                    <option value='personal'>Personal(6 Slices)</option>
                    <option value='medium'>Medium(8 Slices)</option>
                    <option value='large'>Large(10 Slices)</option>
                    <option value='xl'>Extra Large(12 Slices)</option>
                </select></label>

            {/* ////////// CHECKBOXES ////////// */}
            <label><input
                checked={values.toppings.ham}
                onChange={onCheckboxChange}
                name='ham'
                type="checkbox" /> Ham</label>
            <label><input
                checked={values.toppings.pepperoni}
                onChange={onCheckboxChange}
                name='pepperoni'
                type="checkbox" /> Pepperoni</label>
            <label><input
                checked={values.toppings.olives}
                onChange={onCheckboxChange}
                name='olives'
                type="checkbox" /> Olives</label>
            <label><input
                checked={values.toppings.cheese}
                onChange={onCheckboxChange}
                name='cheese'
                type="checkbox" />Extra Cheese</label>
            <label><input
                checked={values.toppings.bbq}
                onChange={onCheckboxChange}
                name='bbq'
                type="checkbox" />BBQ Sauce</label>

            <label>Special Instructions: &nbsp;
      <input
                    data-cy_instructions_input='cy_instructions_input'
                    value={values.instructions}
                    onChange={onInputChange}
                    name='instructions'
                    type='text'
                /></label>

            <button onClick={onSubmit}>submit</button>
        </form>
    )
}

export default Form
