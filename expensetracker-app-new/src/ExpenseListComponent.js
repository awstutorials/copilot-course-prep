import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { retrieveAllExpensesApi, deleteExpenseApi } from './api/ExpensesApiService';

const ExpenseListComponent = () => {

    const [expenses, setExpenses] = useState([]);
    const [message,setMessage] = useState(null)

    const navigate = useNavigate();

    useEffect(() => refreshExpenses(), []);

    function refreshExpenses() {
        retrieveAllExpensesApi()
            .then(response => {
                setExpenses(response.data)
            }
            )
            .catch(error => console.log(error))
    }

    function deleteExpense(id) {
        console.log('clicked ' + id)
        deleteExpenseApi(id)
            .then(

                () => {
                    setMessage(`Delete of expense with id = ${id} successful`)
                    refreshExpenses()
                }
                //1: Display message
                //2: Update expenses list
            )
            .catch(error => console.log(error))
    }

    function updateExpense(id) {
        console.log('clicked ' + id)
        navigate(`/expenses/${id}`)
    }

    function addExpense() {
        navigate(`/expenses/-1`)
    }

    const expenseList = expenses.map(expense => {
        return <tr key={expense.id}>
            <td style={{ whiteSpace: 'nowrap' }}>{expense.expenseDate}</td>
            <td>{expense.description}</td>
            <td>{expense.amount}</td>
            <td>{expense.category}</td>
            <td>{expense.currency}</td>
            <td> <button className="btn btn-warning" onClick={() => deleteExpense(expense.id)}>Delete</button> </td>
            <td> <button className="btn btn-success" onClick={() => updateExpense(expense.id)}>Update</button> </td>
        </tr>
    });

    return (
        <div className="container">
            <h3>My Expenses</h3>
            {message && <div className="alert alert-warning">{message}</div>}
            <div>
                <table className="table">
                    <thead>
                        <tr>
                            <th width="20%">Date</th>
                            <th width="20%">Description</th>
                            <th>Amount</th>
                            <th>category</th>
                            <th>currency</th>
                            <th width="10%">Delete</th>
                            <th width="10%">Update</th>
                        </tr>
                    </thead>
                    <tbody>
                        {expenseList}
                    </tbody>
                </table>
            </div>
            <div className="btn btn-success m-5" onClick={addExpense}>Add New Expense</div>
        </div>
    );
};

export default ExpenseListComponent;