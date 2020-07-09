package br.com.atlantico.selecao.auth.controller;

import br.com.atlantico.selecao.user.model.User;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/me")
public class SelfController {

    @GetMapping
    public ResponseEntity<User> me(@AuthenticationPrincipal User user) {
        return ResponseEntity.ok(user);
    }
}
