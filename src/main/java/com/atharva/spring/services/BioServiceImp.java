package com.atharva.spring.services;

import com.atharva.spring.dao.BiodataDao;
import com.atharva.spring.entities.Biodata;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@Repository
public class BioServiceImp implements BioService {

    //List<Biodata> list;
    @Autowired
    private BiodataDao biodataDao;

    public BioServiceImp() { }

    @Override
    public List<Biodata> getBiodata() {
        return biodataDao.findAll();
    }

    @Override
    public Optional<Biodata> getBiodataById(long id) {
        return biodataDao.findById(id);
    }

    @Override
    public Biodata addBiodata(Biodata biodata) {
        //list.add(biodata);
        biodataDao.save(biodata);
        return biodata;
    }

    @Override
    public Biodata updateBiodata(Biodata biodata) {
        //list.add(biodata);
        biodataDao.save(biodata);
        return biodata;
    }
}
