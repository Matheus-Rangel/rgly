package rg.rgly.services;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import rg.rgly.domain.Link;
import rg.rgly.dtos.LinkRequest;
import rg.rgly.repositories.LinkRepository;
import rg.rgly.repositories.RglyUserRepository;

import javax.transaction.Transactional;
import java.time.Instant;
import java.util.List;

@Service
public class LinkManagementService {
    public final LinkRepository linkRepository;
    public final RglyUserRepository rglyUserRepository;

    public LinkManagementService(LinkRepository linkRepository, RglyUserRepository rglyUserRepository) {
        this.linkRepository = linkRepository;
        this.rglyUserRepository = rglyUserRepository;
    }

    @Transactional
    public String clickLink(String linkName, String location){
        var linkOpt = linkRepository.findById(linkName);
        if(linkOpt.isEmpty()){
            return null;
        }
        var link = linkOpt.get();
        link.addClick(location);
        return link.getUrl();
    }

    @Transactional
    public List<Link> findByOwner(String username){
        return linkRepository.findByOwnerUsername(username);
    }

    @Transactional
    public Link saveLink(LinkRequest linkRequest, String username) throws Exception {
        var linkOpt = linkRepository.findById(linkRequest.getLinkName());
        if(linkOpt.isPresent()){
            var link = linkOpt.get();
            if(!link.getOwner().getUsername().equals(username)){
                throw new Exception("LinkName already exists");
            }
            link.setAliasName(link.getAliasName());
            link.setUrl(link.getUrl());
            return linkRepository.save(link);
        }else {
            var link = new Link();
            link.setOwner(rglyUserRepository.findById(username).orElseThrow(() -> new Exception("Username not found")));
            link.setUrl(linkRequest.getUrl());
            link.setAliasName(linkRequest.getAliasName());
            link.setLinkName(linkRequest.getLinkName());
            link.setCreatedDate(Instant.now());
            link.setClicks(0);
            return linkRepository.save(link);
        }
    }

    public void deleteLink(String linkName, String username) throws Exception {
        var linkOpt = linkRepository.findById(linkName);
        if(linkOpt.isPresent()){
            var link = linkOpt.get();
            if(link.getOwner().getUsername().equals(username)){
                linkRepository.delete(linkOpt.get());
            }else {
                throw new Exception("Sem permissão");
            }
        }else{
            throw new Exception("Não encontrado");
        }
    }
}
