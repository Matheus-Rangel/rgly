package rg.rgly;

import io.jsonwebtoken.ExpiredJwtException;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import org.springframework.web.servlet.function.ServerRequest;
import rg.rgly.services.JwtService;
import rg.rgly.services.RglyUserDetailService;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Component
public class JwtRequestFilter extends OncePerRequestFilter {
    private final RglyUserDetailService rglyUserDetailService;
    private final JwtService jwtService;

    public JwtRequestFilter(RglyUserDetailService rglyUserDetailService, JwtService jwtService) {
        this.rglyUserDetailService = rglyUserDetailService;
        this.jwtService = jwtService;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        final String authorizationHeader = request.getHeader(HttpHeaders.AUTHORIZATION);
        String username = null;
        String jwt = null;
        if(authorizationHeader != null && authorizationHeader.startsWith("Bearer ")){
            jwt = authorizationHeader.substring(7);
            try{
                username = jwtService.extractUsername(jwt);
            }catch (ExpiredJwtException e){
                filterChain.doFilter(request, response);
            }
        }
        if(username != null && SecurityContextHolder.getContext().getAuthentication() == null){
            UserDetails userDetails = this.rglyUserDetailService.loadUserByUsername(username);
            if(jwtService.validateToken(jwt, userDetails)){
                var usernamePasswordAuthenticationToken = new UsernamePasswordAuthenticationToken(
                   userDetails, null, userDetails.getAuthorities()
                );
                request.setAttribute("username", username);
                usernamePasswordAuthenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                SecurityContextHolder.getContext().setAuthentication(usernamePasswordAuthenticationToken);
            }
        }
        filterChain.doFilter(request, response);
    }
}
