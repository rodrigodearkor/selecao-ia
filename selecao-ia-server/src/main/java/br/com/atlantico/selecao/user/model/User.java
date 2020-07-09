package br.com.atlantico.selecao.user.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.time.LocalDateTime;

@Entity
@Table(name = "users")
@Data
public class User implements Serializable {

    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    @NotNull(groups = { EditChecks.class })
    private Long id;

    @NotBlank(groups = { SaveChecks.class, EditChecks.class })
    private String name;

    @NotBlank(groups = { SaveChecks.class, EditChecks.class })
    @Email(groups = { SaveChecks.class, EditChecks.class })
    private String email;

    @NotBlank(groups = { SaveChecks.class, EditChecks.class })
    private String login;

    @NotBlank(groups = { SaveChecks.class })
    private String password;

    @NotNull(groups = { SaveChecks.class, EditChecks.class })
    private boolean admin;

    @JsonIgnore
    @Column(updatable = false)
    private LocalDateTime createdAt;

    @JsonIgnore
    @Column(insertable = false)
    private LocalDateTime updatedAt;
}
