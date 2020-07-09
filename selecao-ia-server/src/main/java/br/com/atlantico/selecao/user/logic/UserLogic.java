package br.com.atlantico.selecao.user.logic;

import br.com.atlantico.selecao.auth.service.repository.UserRepository;
import br.com.atlantico.selecao.user.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.time.LocalDateTime;

@Service
public class UserLogic {

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private UserRepository userRepository;

    public Iterable<User> findAll() {
        return userRepository.findAll();
    }

    public User save(User newUser) {

        if (userRepository.existsByLoginIgnoreCase(newUser.getLogin())) {
            throw new UserCreationException("Login já cadastrado");
        }

        if (userRepository.existsByEmailIgnoreCase(newUser.getEmail())) {
            throw new UserCreationException("E-mail já cadastrado");
        }

        newUser.setCreatedAt(LocalDateTime.now());
        newUser.setPassword( passwordEncoder.encode(newUser.getPassword()) );

        return userRepository.save(newUser);
    }

    public User update(User user, User loggedUser) {

        if (userRepository.existsByLoginIgnoreCaseAndIdNot(user.getLogin(), user.getId())) {
            throw new UserCreationException("Login já cadastrado");
        }

        if (userRepository.existsByEmailIgnoreCaseAndIdNot(user.getEmail(), user.getId())) {
            throw new UserCreationException("E-mail já cadastrado");
        }

        User savedUser = userRepository.findById(user.getId()).get();

        if (StringUtils.hasText(user.getPassword())) {

            boolean canUpdatePassword = ( user.getId().equals(loggedUser.getId()) || loggedUser.isAdmin());
            if (!passwordEncoder.matches(user.getPassword(), savedUser.getPassword())) {
                if (!canUpdatePassword) {
                    throw new UserCreationException("Apenas administradores podem alterar a senha de outros usuários");
                }
            }

            user.setPassword(passwordEncoder.encode(user.getPassword()));

        } else {
            user.setPassword(savedUser.getPassword());
        }

        user.setUpdatedAt(LocalDateTime.now());
        return userRepository.save(user);
    }

    public void delete(Long userId) {

        if (Long.valueOf(1l).equals(userId)) {
            throw new UserCreationException("Usuário root não poderá ser removido! :)");
        }

        userRepository.deleteById(userId);
    }

}
