package br.com.atlantico.selecao.auth.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletRequest;

@Controller
@RequestMapping("/quit")
public class QuitController {

    @PostMapping
    public ResponseEntity<?> quit(HttpServletRequest request) {
        SecurityContextHolder.getContext().setAuthentication(null);
        request.getSession().invalidate();
        return ResponseEntity.ok().build();
    }
}
