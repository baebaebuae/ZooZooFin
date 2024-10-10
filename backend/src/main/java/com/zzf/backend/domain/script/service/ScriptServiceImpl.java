package com.zzf.backend.domain.script.service;

import com.zzf.backend.domain.animal.entity.Animal;
import com.zzf.backend.domain.animal.repository.AnimalRepository;
import com.zzf.backend.domain.capital.repository.CapitalRepository;
import com.zzf.backend.domain.deposit.repository.DepositRepository;
import com.zzf.backend.domain.loan.repository.LoanRepository;
import com.zzf.backend.domain.savings.repository.SavingsRepository;
import com.zzf.backend.domain.script.document.Script;
import com.zzf.backend.domain.script.repository.ScriptRepository;
import com.zzf.backend.domain.stock.repository.StockHoldingsRepository;
import com.zzf.backend.global.exception.CustomException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

import static com.zzf.backend.global.status.ErrorCode.ANIMAL_NOT_FOUND_EXCEPTION;

@Service
@RequiredArgsConstructor
public class ScriptServiceImpl implements ScriptService {

    private final ScriptRepository scriptRepository;

    private final AnimalRepository animalRepository;

    private final DepositRepository depositRepository;

    private final SavingsRepository savingsRepository;

    private final StockHoldingsRepository stockHoldingsRepository;

    private final LoanRepository loanRepository;

    private final CapitalRepository capitalRepository;

    @Override
    public List<Script> findTutorialScript() {
        return scriptRepository.findByCategory("tutorial");
    }

    @Override
    public List<Script> findScriptByCategory(Long animalId, String category) {

        Animal animal = animalRepository.findById(animalId).orElseThrow(() -> new CustomException(ANIMAL_NOT_FOUND_EXCEPTION));

        switch (category) {
            case "bank" -> {
                boolean isDeposit = depositRepository.existsByAnimalAndDepositIsEndIsFalse(animal);
                boolean isSavings = savingsRepository.existsByAnimalAndSavingsIsEndIsFalse(animal);

                if (!isDeposit && !isSavings) {
                    category = "nobank";
                } else if (!isDeposit) {
                    category = "nodeposit";
                } else if (!isSavings) {
                    category = "nosavings";
                }
            }
            case "stock" -> {
                if (!stockHoldingsRepository.existsByAnimalAndStockIsSoldFalse(animal)) {
                    category = "no_stock";
                }
            }
            case "loan" -> {
                if (!loanRepository.existsByAnimalAndLoanIsEndFalse(animal)) {
                    category = "no_loan";
                }
            }
            case "capital" -> {
                if (!capitalRepository.existsByAnimalAndCapitalIsEndFalse(animal)) {
                    category = "no_capital";
                }
            }
        }

        return scriptRepository.findByCategory(category);
    }
}