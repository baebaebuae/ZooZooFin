package com.zzf.backend.domain.work.service;

import com.zzf.backend.domain.animal.entity.Animal;
import com.zzf.backend.domain.animal.repository.AnimalRepository;
import com.zzf.backend.domain.work.dto.WorkRequest;
import com.zzf.backend.global.exception.CustomException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import static com.zzf.backend.global.status.ErrorCode.*;

@Service
@RequiredArgsConstructor
public class WorkServiceImpl implements WorkService {

    private final AnimalRepository animalRepository;

    @Override
    public void doWork(Long animalId, WorkRequest workRequest) {
        Animal animal = animalRepository.findById(animalId)
                .orElseThrow(() -> new CustomException(ANIMAL_NOT_FOUND_EXCEPTION));

        if (animal.getAnimalIsWork()) {
            throw new CustomException(ALREADY_WORK_TODAY_EXCEPTION);
        }

        animal.setAnimalAssets(animal.getAnimalAssets() + workRequest.getPaidAmount());
        animal.setAnimalIsWork(true);

        animalRepository.save(animal);
    }

}
