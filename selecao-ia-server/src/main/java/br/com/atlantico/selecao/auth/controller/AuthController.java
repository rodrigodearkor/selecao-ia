package br.com.atlantico.selecao.auth.controller;

import br.com.atlantico.selecao.auth.dto.LoginRequest;
import br.com.atlantico.selecao.auth.service.AuthService;
import br.com.atlantico.selecao.user.model.User;
import com.google.common.collect.Lists;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping(value = "/login")
    public ResponseEntity<?> login(@Valid  @RequestBody LoginRequest loginRequest) {

        User user = authService.authenticateAndGet(loginRequest);

        Authentication authentication = new UsernamePasswordAuthenticationToken(user, null, Lists.newArrayList());
        SecurityContextHolder.getContext().setAuthentication(authentication);

        return ResponseEntity.ok(user);

    }

}


