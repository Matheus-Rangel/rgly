package rg.rgly.repositories;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;
import rg.rgly.domain.Link;

import java.util.List;

@Repository
public interface LinkRepository extends PagingAndSortingRepository<Link, String> {
    public List<Link> findByOwnerUsername(String username);
}
