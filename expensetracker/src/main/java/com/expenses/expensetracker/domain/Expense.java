package com.expenses.expensetracker.domain;

import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonFormat;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Expense {
    @Id
    @GeneratedValue
    private Long id;
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate expenseDate;
    private String description;
    private double amount;
    private String category;
    private String currency;
}
