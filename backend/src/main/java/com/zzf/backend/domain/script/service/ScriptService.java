package com.zzf.backend.domain.script.service;

import com.zzf.backend.domain.script.document.Script;

import java.util.List;

public interface ScriptService {
    List<Script> findTutorialScript();

    List<Script> findScriptByCategory(Long animalId, String category);
}
