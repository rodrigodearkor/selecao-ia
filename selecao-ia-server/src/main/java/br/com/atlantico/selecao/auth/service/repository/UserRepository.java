package br.com.atlantico.selecao.auth.service.repository;

import br.com.atlantico.selecao.user.model.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends CrudRepository<User, Long> {

    User findUserByLogin(String login);

    boolean existsByLoginIgnoreCase(String login);

    boolean existsByEmailIgnoreCase(String email);

    boolean existsByLoginIgnoreCaseAndIdNot(String login, Long id);

    boolean existsByEmailIgnoreCaseAndIdNot(String email, Long id);
}
