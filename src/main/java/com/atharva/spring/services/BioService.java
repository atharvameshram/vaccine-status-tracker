package com.atharva.spring.services;

import com.atharva.spring.entities.Biodata;

import java.util.List;
import java.util.Optional;

public interface BioService {
    public List<Biodata> getBiodata();

    public Optional<Biodata> getBiodataById(long id);

    public Biodata addBiodata(Biodata biodata);

    public Biodata updateBiodata(Biodata biodata);
}
