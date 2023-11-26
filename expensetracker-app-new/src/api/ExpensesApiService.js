import { apiClient } from './ApiClient'

export const retrieveAllExpensesApi
    = () => apiClient.get(`/expenses`)

export const deleteExpenseApi
    = (id) => apiClient.delete(`/expenses/${id}`)

export const retrieveExpenseApi
    = (id) => apiClient.get(`/expenses/${id}`)

export const updateExpenseApi
    = (id, expense) => apiClient.put(`/expenses/${id}`, expense)

export const createExpenseApi
    = (expense) => apiClient.post(`/expenses`, expense)