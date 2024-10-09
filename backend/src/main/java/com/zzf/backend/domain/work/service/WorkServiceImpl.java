package com.zzf.backend.domain.work.service;

import com.zzf.backend.domain.animal.entity.Animal;
import com.zzf.backend.domain.animal.repository.AnimalRepository;
import com.zzf.backend.domain.home.entity.TurnRecord;
import com.zzf.backend.domain.home.repository.TurnRecordRepository;
import com.zzf.backend.domain.work.dto.WorkRequest;
import com.zzf.backend.global.exception.CustomException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import static com.zzf.backend.global.status.ErrorCode.*;

@Service
@RequiredArgsConstructor
public class WorkServiceImpl implements WorkService {

    private final AnimalRepository animalRepository;
    private final TurnRecordRepository turnRecordRepository;

    @Override
    @Transactional
    public void doWork(Long animalId, WorkRequest workRequest) {
        Animal animal = animalRepository.findById(animalId)
                .orElseThrow(() -> new CustomException(ANIMAL_NOT_FOUND_EXCEPTION));

        if (animal.getIsWorked()) {
            throw new CustomException(ALREADY_WORK_TODAY_EXCEPTION);
        }

        animal.setAssets(animal.getAssets() + workRequest.getPaidAmount());
        animal.setIsWorked(true);

        TurnRecord turnRecord = turnRecordRepository.findByAnimalAndTurnRecordTurn(animal, animal.getTurn()).orElseThrow(() -> new CustomException(TURN_RECORD_NOT_FOUND));
        turnRecord.setDailyCharge(workRequest.getPaidAmount());
    }

}
