package br.com.atlantico.selecao.auth.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import javax.validation.constraints.NotBlank;

@Data
@AllArgsConstructor
public class LoginRequest {

    @NotBlank(message = "Login is mandatory")
    private String login;

    @NotBlank(message = "Password is mandatory")
    private String password;

}
