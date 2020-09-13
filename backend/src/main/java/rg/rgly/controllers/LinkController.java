package rg.rgly.controllers;

import com.maxmind.geoip2.exception.GeoIp2Exception;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import rg.rgly.services.GeoIp2Service;
import rg.rgly.services.LinkManagementService;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Controller
public class LinkController {
    private final LinkManagementService linkManagementService;
    private final GeoIp2Service geoip2Service;

    public LinkController(LinkManagementService linkManagementService, GeoIp2Service geoip2Service) {
        this.linkManagementService = linkManagementService;
        this.geoip2Service = geoip2Service;
    }

    @GetMapping("/{link}")
    public void redirectToWebsite(@PathVariable String link, HttpServletRequest request, HttpServletResponse response)
            throws IOException, GeoIp2Exception {
        String location = geoip2Service.getLocation(request.getRemoteAddr());
        String destUrl = linkManagementService.clickLink(link, location);
        if(destUrl != null){
            response.setHeader(HttpHeaders.LOCATION, destUrl);
            response.setStatus(HttpStatus.FOUND.value());
        }else{
            response.setStatus(HttpStatus.NOT_FOUND.value());
        }
    }
}
