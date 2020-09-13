package rg.rgly.services;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import rg.rgly.domain.RglyUser;
import rg.rgly.repositories.RglyUserRepository;

import java.util.Collections;

@Service
public class RglyUserDetailService implements UserDetailsService {
    private final RglyUserRepository rglyUserRepository;

    public RglyUserDetailService(RglyUserRepository rglyUserRepository) {
        this.rglyUserRepository = rglyUserRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String s) throws UsernameNotFoundException {
        return rglyUserRepository.findById(s).orElseThrow(() -> new UsernameNotFoundException(s));
    }
}
