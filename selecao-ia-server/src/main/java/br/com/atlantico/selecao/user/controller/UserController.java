package br.com.atlantico.selecao.user.controller;

import br.com.atlantico.selecao.user.logic.UserLogic;
import br.com.atlantico.selecao.user.model.EditChecks;
import br.com.atlantico.selecao.user.model.SaveChecks;
import br.com.atlantico.selecao.user.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserLogic userLogic;

    @GetMapping
    public ResponseEntity<?> index() {
        return ResponseEntity.ok(userLogic.findAll());
    }

    @PostMapping
    public ResponseEntity<?> save(@Validated(SaveChecks.class) @RequestBody User user) {
        User savedUser = userLogic.save(user);
        return ResponseEntity.ok(savedUser);
    }

    @PutMapping
    public ResponseEntity<?> update(@Validated(EditChecks.class) @RequestBody User user, @AuthenticationPrincipal User loggedUser) {
         User updatedUser = userLogic.update(user, loggedUser);
        return ResponseEntity.ok(updatedUser);
    }

    @DeleteMapping(value = "{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        userLogic.delete(id);
        return ResponseEntity.ok().build();
    }
}
