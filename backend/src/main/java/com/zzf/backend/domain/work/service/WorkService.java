package com.zzf.backend.domain.work.service;

import com.zzf.backend.domain.work.dto.WorkRequest;

public interface WorkService {
    void doWork(Long animalId, WorkRequest workRequest);
}
