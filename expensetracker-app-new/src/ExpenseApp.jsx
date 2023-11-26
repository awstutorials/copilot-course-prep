import {Routes, Route, BrowserRouter} from 'react-router-dom'
import HeaderComponent from './HeaderComponent'
import ExpenseListComponent from './ExpenseListComponent'
import ExpenseComponent from './ExpenseComponent'

import './ExpenseApp.css'



export default function ExpenseApp() {
    return (
        <div className="ExpenseApp">
                <BrowserRouter>
                    <HeaderComponent />
                    <Routes>
                        <Route path='/welcome/in28minutes' element={
                                <WelcomeComponent /> 
                        } />
                        <Route path='/expenses' element={
                                <ExpenseListComponent /> 
                        } />
                        <Route path='/expenses/:id' element={
                                <ExpenseComponent /> 
                        } />
                    </Routes>
                </BrowserRouter>
        </div>
    )
}