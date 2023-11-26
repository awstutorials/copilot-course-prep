package com.expenses.expensetracker.web;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.expenses.expensetracker.domain.Expense;
import com.expenses.expensetracker.service.ExpenseService;

import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/expenses")
@Slf4j
public class ExpenseController {

    @Autowired
    private ExpenseService expenseService;

    @GetMapping("") 
    public ResponseEntity<Iterable<Expense>> getAllExpenses() {
        log.info("ExpenseController.getAllExpenses");
        Iterable<Expense> expenses = expenseService.getAllExpenses();
        return ResponseEntity.ok(expenses);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Expense> getExpenseById(@PathVariable Long id) {
        log.info("ExpenseController.getExpenseById: " + id);
        Expense expense = expenseService.getExpenseById(id);
        return ResponseEntity.ok(expense);
    }

    @PostMapping
    public Expense createExpense(@RequestBody Expense expense) {
        log.info("ExpenseController.createExpense: " + expense.toString());
        return expenseService.createExpense(expense);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Expense> updateExpense(@PathVariable Long id, @RequestBody Expense expenseDetails) {
        log.info("ExpenseController.updateExpense: " + expenseDetails.toString());
        Expense updatedExpense = expenseService.updateExpense(id, expenseDetails);
        log.info("ExpenseController.updateExpense: " + updatedExpense.toString());
        return ResponseEntity.ok(updatedExpense);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteExpense(@PathVariable Long id) {
        expenseService.deleteExpense(id);
        return ResponseEntity.noContent().build();
    }
}
