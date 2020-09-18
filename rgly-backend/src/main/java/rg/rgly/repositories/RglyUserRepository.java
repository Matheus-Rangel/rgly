package rg.rgly.repositories;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;
import rg.rgly.domain.RglyUser;

@Repository
public interface RglyUserRepository extends PagingAndSortingRepository<RglyUser, String> {}
