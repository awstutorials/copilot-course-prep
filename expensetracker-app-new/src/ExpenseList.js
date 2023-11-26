import React, { useEffect, useState } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import AppNavbar from './AppNavbar';
import { Link } from 'react-router-dom';

const GroupList = () => {

    const [expenses, setExpenses] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);

        fetch('/expenses')
            .then(response => response.json())
            .then(data => {
                setExpenses(data);
                setLoading(false);
            })
    }, []);

    const remove = async (id) => {
        await fetch(`/expenses/${id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(() => {
            let updatedExpenses = [...expenses].filter(i => i.id !== id);
            setExpenses(updatedExpenses);
        });
    }

    if (loading) {
        return <p>Loading...</p>;
    }

    const expenseList = expenses.map(expense => {
        return <tr key={expense.id}>
            <td style={{whiteSpace: 'nowrap'}}>{expense.expenseDate}</td>
            <td>{expense.description}</td>
            <td>{expense.amount}</td>
            <td>{expense.category}</td>
            <td>{expense.currency}</td>
            <td>
                <ButtonGroup>
                    <Button size="sm" color="primary" tag={Link} to={"/expenses/" + expense.id}>Edit</Button>
                    <Button size="sm" color="danger" onClick={() => remove(expense.id)}>Delete</Button>
                </ButtonGroup>
            </td>
        </tr>
    });

    return (
        <div>
            <AppNavbar/>
            <Container fluid>
                <div className="float-end">
                    <Button color="success" tag={Link} to="/expenses/new">Add Expense</Button>
                </div>
                <h3>My Expenses</h3>
                <Table className="mt-4">
                    <thead>
                    <tr>
                        <th width="20%">Date</th>
                        <th width="20%">Description</th>
                        <th>Amount</th>
                        <th>category</th>
                        <th>currency</th>
                        <th width="10%">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {expenseList}
                    </tbody>
                </Table>
            </Container>
        </div>
    );
};

export default GroupList;