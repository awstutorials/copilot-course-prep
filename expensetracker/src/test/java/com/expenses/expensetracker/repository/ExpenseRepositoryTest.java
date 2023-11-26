package com.expenses.expensetracker.repository;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import com.expenses.expensetracker.domain.Expense;
import com.expenses.expensetracker.service.ExpenseService;

@DataJpaTest
public class ExpenseRepositoryTest {

    @Mock
    private ExpenseRepository expenseRepository;

    @InjectMocks
    private ExpenseService expenseService;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testFindAllExpenses() {
        // Arrange
        List<Expense> expenses = new ArrayList<>();
        expenses.add(new Expense(1L, LocalDate.of(2021, 1, 1), "Expense 1", 100.0, "Category 1", "USD"));
        when(expenseRepository.findAll()).thenReturn(expenses);

        // Act
        List<Expense> result = expenseService.getAllExpenses();

        // Assert
        assertEquals(1, result.size());
    }

}