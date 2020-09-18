package rg.rgly.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Lob;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class LinkRequest {
    private String linkName;
    private String url;
    private String aliasName;
}
