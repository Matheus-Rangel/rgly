package rg.rgly.controllers;

import org.apache.http.client.HttpResponseException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import rg.rgly.domain.Link;
import rg.rgly.dtos.LinkRequest;
import rg.rgly.repositories.LinkRepository;
import rg.rgly.services.LinkManagementService;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@RestController
@RequestMapping("/management")
public class ManagementController {
    private final LinkManagementService managementService;

    public ManagementController(LinkManagementService managementService) {
        this.managementService = managementService;
    }

    @GetMapping("/links")
    public List<Link> getAllLinks(HttpServletRequest request){
        return managementService.findByOwner((String)request.getAttribute("username"));
    }

    @PutMapping("/link")
    public Link saveLink(@RequestBody LinkRequest linkRequest, HttpServletRequest request) throws HttpResponseException {
        try{
            return managementService.saveLink(linkRequest, (String) request.getAttribute("username"));
        } catch (Exception e){
            throw new HttpResponseException(HttpStatus.BAD_REQUEST.value(), e.getMessage());
        }
    }
}
