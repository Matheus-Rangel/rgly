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
@CrossOrigin
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
            if(linkRequest.getLinkName().length() < 3){
                throw new Exception("Nome curto");
            }
            return managementService.saveLink(linkRequest, (String) request.getAttribute("username"));
        } catch (Exception e){
            throw new HttpResponseException(HttpStatus.BAD_REQUEST.value(), e.getMessage());
        }
    }
    @CrossOrigin(methods = {RequestMethod.DELETE})
    @DeleteMapping("/link/{linkName}")
    public void deleteLink(@PathVariable String linkName, HttpServletRequest request) throws HttpResponseException {
        try {
            managementService.deleteLink(linkName, (String) request.getAttribute("username"));
        } catch (Exception e) {
            throw new HttpResponseException(HttpStatus.NOT_FOUND.value(), e.getMessage());
        }
    }
}
