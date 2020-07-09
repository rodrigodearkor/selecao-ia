package br.com.atlantico.selecao.auth.service;

import br.com.atlantico.selecao.auth.dto.LoginRequest;
import br.com.atlantico.selecao.user.model.User;
import br.com.atlantico.selecao.auth.service.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Objects;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public User authenticateAndGet(LoginRequest loginRequest) {

        User user = userRepository.findUserByLogin(loginRequest.getLogin());

        if (!Objects.isNull(user)) {

            if (passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())) {
                return user;
            }
        }

        throw new UsernameNotFoundException("Usuário e/ou senha inválidos");
    }
}
