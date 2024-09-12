package com.ggul.application.common.jpa.domain;

import jakarta.persistence.Column;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.MappedSuperclass;
import jakarta.persistence.PrePersist;
import lombok.AllArgsConstructor;
import lombok.Getter;

import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

@MappedSuperclass
@AllArgsConstructor
@NoArgsConstructor
@SuperBuilder
@Getter
@EntityListeners(AuditingEntityListener.class)
public abstract class SoftDeleteEntity extends BaseEntity{
    @Column(name = "is_deleted")
    private Boolean isDeleted;

    @PrePersist
    protected void setDefault() {
        if(isDeleted == null) {
            this.isDeleted = false;
        }
    }

    public void delete() {
        this.isDeleted = true;
    }

    public void recovery() {
        this.isDeleted = false;
    }
}
