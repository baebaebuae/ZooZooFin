package com.zzf.backend.domain.script.service;

import com.zzf.backend.domain.animal.entity.Animal;
import com.zzf.backend.domain.animal.repository.AnimalRepository;
import com.zzf.backend.domain.loan.repository.LoanRepository;
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

    private final StockHoldingsRepository stockHoldingsRepository;

    private final LoanRepository loanRepository;

    @Override
    public List<Script> findAllScripts() {
        return scriptRepository.findAll();
    }

    @Override
    public List<Script> findScriptByCategory(Long animalId, String category) {

        Animal animal = animalRepository.findById(animalId).orElseThrow(() -> new CustomException(ANIMAL_NOT_FOUND_EXCEPTION));

        // 주식 상품 없을 경우
        if (category.equals("stock") && !stockHoldingsRepository.existsByAnimalAndStockIsSoldFalse(animal)) {
            category = "no_stock";
        }

        // loan 없을 경우
        if (category.equals("loan") && !loanRepository.existsByAnimalAndLoanIsEndFalse(animal)) {
            category = "no_loan";
        }

        // capital 없을 경우


        return scriptRepository.findByCategory(category);
    }
}