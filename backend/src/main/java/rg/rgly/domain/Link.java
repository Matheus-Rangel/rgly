package rg.rgly.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;

import javax.persistence.*;
import java.time.Instant;
import java.time.OffsetDateTime;
import java.util.HashMap;
import java.util.Map;

@Entity
@Data
@Table(indexes = @Index(name = "owner_idx", columnList = "owner_username"))
public class Link {
    @Id
    @Column(length = 20)
    private String linkName;
    @Lob
    private String url;
    @Column(length = 20)
    private String aliasName;
    private Instant createdDate;
    @ManyToOne
    @JsonIgnore
    private RglyUser owner;
    private Integer clicks = 0;
    @ElementCollection
    @MapKeyColumn(name="location")
    @Column(name="value")
    @CollectionTable(name="link_clicks_by_location",
            joinColumns=@JoinColumn(name="link_name"),
            indexes = @Index(name = "location_link_name_idx", columnList = "link_name"))
    private Map<String, Integer> clicksByLocation = new HashMap<>();

    public void addClick(String location){
        clicks++;
        clicksByLocation.put(location, clicksByLocation.compute(location, (k, v) -> v == null ? 1 : v+1));
    }
}
