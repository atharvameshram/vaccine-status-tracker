package com.atharva.spring.dao;

import com.atharva.spring.entities.Biodata;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BiodataDao extends JpaRepository<Biodata, Long> {
}
