package com.group.project.entities;


import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.IdClass;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
@IdClass(UniClass.class)
public class RatingAggr {
    @Id @ManyToOne @JoinColumn(name="class_id", referencedColumnName = "id")
    private UniClass uniClass;

    @ManyToOne @JoinColumn(name="course_id", referencedColumnName = "id")
    private Course course;

    private float rate_user_avg;

    private float rate_rmp_helpfulness;

    private float rate_rmp_difficulty;

    public RatingAggr() {
    }

    public RatingAggr(UniClass uniClass) {
        this.uniClass = uniClass;
        this.course = uniClass.getCourse();
    }

    public RatingAggr(UniClass uniClass, float rate_user_avg, float rate_rmp_helpfulness,
            float rate_rmp_difficulty) {
        this.uniClass = uniClass;
        this.course = uniClass.getCourse();
        this.rate_user_avg = rate_user_avg;
        this.rate_rmp_helpfulness = rate_rmp_helpfulness;
        this.rate_rmp_difficulty = rate_rmp_difficulty;
    }

    public Course getCourse() {
        return course;
    }

    public UniClass getUniClass() {
        return uniClass;
    }

    public float getRate_user_avg() {
        return rate_user_avg;
    }

    public float getRate_rmp_helpfulness() {
        return rate_rmp_helpfulness;
    }

    public float getRate_rmp_difficulty() {
        return rate_rmp_difficulty;
    }

    public void setRate_user_avg(float rate_user_avg) {
        this.rate_user_avg = rate_user_avg;
    }

    public void setRate_rmp_helpfulness(float rate_rmp_helpfulness) {
        this.rate_rmp_helpfulness = rate_rmp_helpfulness;
    }

    public void setRate_rmp_difficulty(float rate_rmp_difficulty) {
        this.rate_rmp_difficulty = rate_rmp_difficulty;
    }    
}
