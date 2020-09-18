package rg.rgly.controllers;

import com.maxmind.geoip2.exception.GeoIp2Exception;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;
import rg.rgly.dtos.RedirectResponse;
import rg.rgly.services.GeoIp2Service;
import rg.rgly.services.LinkManagementService;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@RestController
@CrossOrigin
public class ClickController {
    private final LinkManagementService linkManagementService;
    private final GeoIp2Service geoip2Service;

    public ClickController(LinkManagementService linkManagementService, GeoIp2Service geoip2Service) {
        this.linkManagementService = linkManagementService;
        this.geoip2Service = geoip2Service;
    }

    @GetMapping("/{link}")
    public RedirectResponse redirectToWebsite(@PathVariable String link, HttpServletRequest request)
            throws IOException, GeoIp2Exception {
        String location = geoip2Service.getLocation(request.getRemoteAddr());
        String destUrl = linkManagementService.clickLink(link, location);
        if(destUrl != null){
            return new RedirectResponse(destUrl);
        }else{
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }
    }
}
