package com.zzf.backend.domain.home.service;

import com.zzf.backend.domain.animal.entity.Animal;

public interface HomeService {
    long getMyDepositSavings(Long animalId);

    public long calculateTotalAssets(Animal animal);

    long getMyTotalDeposit(Animal animal);

    long getMyTotalSavings(Animal animal);

    long getMyTotalStock(Animal animal);

    long getMyRestLoans(Animal animal);

    long getMyTotalLoans(Animal animal);

    long getMyTotalCapitals(Animal animal);
}
