package com.zzf.backend.domain.capital.service;

import com.zzf.backend.domain.capital.repository.CapitalRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CapitalServiceImpl implements CapitalService{

    private final CapitalRepository capitalRepository;
    
    // 사채 다음날로 넘어가기
}
