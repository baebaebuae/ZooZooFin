package com.zzf.backend.domain.script.service;

import com.zzf.backend.domain.script.document.Script;
import com.zzf.backend.domain.script.repository.ScriptRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ScriptService {
    private final ScriptRepository scriptRepository;

    public List<Script> findAllScripts() {

        return scriptRepository.findAll();
    }

    public List<Script> findScriptByCategory(String category) {
        return scriptRepository.findByCategory(category);
    }

    public Script findScriptById(long id) {
        return scriptRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("not found: " + id));
    }
}
