import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { retrieveExpenseApi, updateExpenseApi, createExpenseApi } from './api/ExpensesApiService';
import {Formik, Form, Field, ErrorMessage} from 'formik'
import moment from 'moment'

const ExpenseComponent = () => {

    const[description, setDescription] = useState('');
    const[expenseDate, setExpenseDate] = useState('');
    const[amount, setAmount] = useState('');
    const[category, setCategory] = useState('');
    const[currency, setCurrency] = useState('');

    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        const retrieveExpense = () => {
            if(id !== -1) {
                retrieveExpenseApi(id)
                .then(response => {
                    console.log(response)
                    setDescription(response.data.description)
                    setExpenseDate(response.data.expenseDate)
                    setAmount(response.data.amount)
                    setCategory(response.data.category)
                    setCurrency(response.data.currency)
                })
                .catch(error => console.log(error))
            }
        };
        retrieveExpense();
    }, [id]);
    
    function onSubmit(values) {
        
        const expense = {
            id: id,
            expenseDate: values.expenseDate,
            description: values.description,
            amount: values.amount,
            category: values.category,
            currency: values.currency
        };
        console.log(id)

        if(Number(id) === -1) {
            console.log('create expense')
            createExpenseApi(expense)
            .then(response => {
                navigate('/expenses')
            })
            .catch(error => console.log(error))
    
        } else {
            console.log('update expense')
            updateExpenseApi(id, expense)
            .then(response => {
                navigate('/expenses')
            })
            .catch(error => console.log(error))
        }
    }

    function validate(values) {
        let errors = {
            // description: 'Enter a valid description',
            // expenseDate: 'Enter a valid expense date'
        }

        if(values.description.length<5) {
            errors.description = 'Enter atleast 5 characters for description'
        }

        if(values.expenseDate === null || values.expenseDate==='' || !moment(values.expenseDate).isValid()) {
            errors.expenseDate = 'Enter a expense date'
        }

        console.log(values)
        return errors
    }

    return (
        <div className="container">
            <h1>Enter Expense Details </h1>
            <div>
                <Formik initialValues={ { description, expenseDate, amount, currency, category } } 
                    enableReinitialize = {true}
                    onSubmit = {onSubmit}
                    validate = {validate}
                    validateOnChange = {false}
                    validateOnBlur = {false}
                >
                {
                    (props) => (
                        <Form>
                            <ErrorMessage 
                                name="description"
                                component="div"
                                className = "alert alert-warning"
                            />
                            
                            <ErrorMessage 
                                name="expensedate"
                                component="div"
                                className = "alert alert-warning"
                            />

                            <ErrorMessage 
                                name="amount"
                                component="div"
                                className = "alert alert-warning"
                            />

                            <ErrorMessage 
                                name="category"
                                component="div"
                                className = "alert alert-warning"
                            />

                            <ErrorMessage 
                                name="currency"
                                component="div"
                                className = "alert alert-warning"
                            />


                            <fieldset className="form-group">
                                <label>Expense Date</label>
                                <Field type="date" className="form-control" name="expenseDate" />
                            </fieldset>
                            <fieldset className="form-group">
                                <label>Description</label>
                                <Field type="text" className="form-control" name="description" />
                            </fieldset>
                            <fieldset className="form-group">
                                <label>Amount</label>
                                <Field type="text" className="form-control" name="amount" />
                            </fieldset>
                            <fieldset className="form-group">
                                <label>Category</label>
                                <Field type="text" className="form-control" name="category" />
                            </fieldset>
                            <fieldset className="form-group">
                                <label>Currency</label>
                                <Field type="text" className="form-control" name="currency" />
                            </fieldset>

                            <div>
                                <button className="btn btn-success m-5" type="submit">Save</button>
                            </div>
                        </Form>
                    )
                }
                </Formik>
            </div>

        </div>
    )
};

export default ExpenseComponent;