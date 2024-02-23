package com.atharva.spring.controller;

import com.atharva.spring.entities.Biodata;
import com.atharva.spring.services.BioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
public class MyController {

    @Autowired
    private BioService bioservice;

    @GetMapping("/connectivity")
    public String connectivity(){
        return "Connection successful";
    }

    @GetMapping("/biodata")
    public List<Biodata> getBiodata(){
        return bioservice.getBiodata();
    }

    @GetMapping("/biodata/{id}")
    public Optional<Biodata> getBiodataById(@PathVariable long id) { return bioservice.getBiodataById(id); }

    @PostMapping("/biodata")
    public Biodata addBiodata(@RequestBody Biodata biodata) { return this.bioservice.addBiodata(biodata); }

    @PutMapping("/biodata")
    public Biodata updateBiodata(@RequestBody Biodata biodata) { return this.bioservice.updateBiodata(biodata); }
}
