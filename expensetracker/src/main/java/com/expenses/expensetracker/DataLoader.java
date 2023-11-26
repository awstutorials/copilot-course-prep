package com.expenses.expensetracker;

import com.expenses.expensetracker.domain.Expense;
import com.expenses.expensetracker.repository.ExpenseRepository;

import java.time.LocalDate;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class DataLoader {

    @Bean
    CommandLineRunner initDatabase(ExpenseRepository repository) {
        return args -> {
            Expense expense1 = new Expense(1L, LocalDate.now(), "Coffee", 2.50, "Food", "EUR");
            Expense expense2 = new Expense(2L, LocalDate.now(), "Coffee1", 12.50, "Food", "EUR");
            Expense expense3 = new Expense(3L, LocalDate.now(), "Coffee2", 22.50, "Food", "EUR");
            Expense expense4 = new Expense(4L, LocalDate.now(), "Coffee3", 32.50, "Food", "EUR");
            repository.save(expense1);
            repository.save(expense2);
            repository.save(expense3);
            repository.save(expense4);
        };
    }
}