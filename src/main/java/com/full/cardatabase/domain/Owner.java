package com.full.cardatabase.domain;

import java.util.*;

import jakarta.persistence.*;

@Entity
public class Owner {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long ownerid;
    private String firstname, lastname;

    public Owner() {
    }

    public Owner(String firstname, String lastname) {
        super();
        this.firstname = firstname;
        this.lastname = lastname;
    }

    // gte/set
    public Long getOwnerid() {
        return ownerid;
    }

    public String getFirstname() {
        return firstname;
    }

    public void setFirstname(String firstname) {
        this.firstname = firstname;
    }

    public String getLastname() {
        return lastname;
    }

    public void setLastname(String lastname) {
        this.lastname = lastname;
    }

    @ManyToMany(cascade = CascadeType.PERSIST)
    @JoinTable(name = "car_owner", joinColumns = {
            @JoinColumn(name = "ownerid")
    }, inverseJoinColumns = {
            @JoinColumn(name = "id")
    })

    private Set<Car> cars = new HashSet<Car>();

    public Set<Car> getCars() {
        return cars;
    }

    public void setCars(Set<Car> cars) {
        this.cars = cars;
    }
}
