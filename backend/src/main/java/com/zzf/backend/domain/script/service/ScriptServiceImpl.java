package com.zzf.backend.domain.script.service;

import com.zzf.backend.domain.script.document.Script;
import com.zzf.backend.domain.script.repository.ScriptRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ScriptServiceImpl implements ScriptService {

    private final ScriptRepository scriptRepository;

    @Override
    public List<Script> findAllScripts() {
        return scriptRepository.findAll();
    }

    @Override
    public List<Script> findScriptByCategory(String category) {
        return scriptRepository.findByCategory(category);
    }
}

//    public Script findScriptById(long id) {
//        return scriptRepository.findById(id)
//                .orElseThrow(() -> new IllegalArgumentException("not found: " + id));
//    }
//    }

