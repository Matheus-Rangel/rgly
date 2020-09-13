package rg.rgly.dtos;

import lombok.Data;
import lombok.Getter;

@Data
public class AuthenticationRequest {
    @Getter
    private String username;
    @Getter
    private String password;

    public AuthenticationRequest(String username, String password) {
        this.username = username;
        this.password = password;
    }
}
