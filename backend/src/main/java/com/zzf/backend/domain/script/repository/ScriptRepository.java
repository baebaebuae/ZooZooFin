package com.zzf.backend.domain.script.repository;

import com.zzf.backend.domain.script.document.Script;
import com.zzf.backend.domain.script.dto.ScriptDto;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ScriptRepository extends MongoRepository<Script, Long> {
    List<Script> findByCategory(String category);
}
