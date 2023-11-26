package com.expenses.expensetracker.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.expenses.expensetracker.domain.Expense;

@Repository
public interface ExpenseRepository extends JpaRepository<Expense, Long> {
}