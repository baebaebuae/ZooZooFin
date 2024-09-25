package com.zzf.backend.domain.capital.service;

import com.zzf.backend.domain.capital.dto.CapitalRequest;

public interface CapitalService {

    Boolean getCapitalExist(Long animalId);

    void postCapital(Long animalId, CapitalRequest capitalRequest);

    void patchCapital(Long animalId, Long money);
}
