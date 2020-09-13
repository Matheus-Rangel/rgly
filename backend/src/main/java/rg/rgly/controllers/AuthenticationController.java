package rg.rgly.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import rg.rgly.dtos.AuthenticationRequest;
import rg.rgly.dtos.AuthenticationResponse;
import rg.rgly.services.JwtService;
import rg.rgly.services.RglyUserDetailService;

@RestController
public class AuthenticationController {
    private final AuthenticationManager authenticationManager;
    private final RglyUserDetailService rglyUserDetailService;
    private final JwtService jwtService;
    public AuthenticationController(AuthenticationManager authenticationManager, RglyUserDetailService rglyUserDetailService, JwtService jwtService) {
        this.authenticationManager = authenticationManager;
        this.rglyUserDetailService = rglyUserDetailService;
        this.jwtService = jwtService;
    }

    @PostMapping("/authenticate")
    public AuthenticationResponse authenticate(@RequestBody AuthenticationRequest authenticationRequest) throws Exception {
        try{
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken
                    (authenticationRequest.getUsername(), authenticationRequest.getPassword()));
        }catch (BadCredentialsException e){
            throw new Exception("Incorrect usename or password", e);
        }
        final var userDetails = rglyUserDetailService.loadUserByUsername(authenticationRequest.getUsername());
        final var jwt = jwtService.generateToken(userDetails);
        return new AuthenticationResponse(jwt);
    }
}
