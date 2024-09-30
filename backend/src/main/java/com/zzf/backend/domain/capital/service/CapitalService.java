package com.zzf.backend.domain.capital.service;

import com.zzf.backend.domain.capital.dto.CapitalRequest;
import com.zzf.backend.domain.capital.dto.CapitalResponse;

public interface CapitalService {

    Boolean getCapitalExist(Long animalId);

    void postCapital(Long animalId, CapitalRequest capitalRequest);

    CapitalResponse getMyCapital(Long animalId);

    void patchCapital(Long animalId, Long money);
}
