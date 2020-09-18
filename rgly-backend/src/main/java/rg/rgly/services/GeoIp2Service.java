package rg.rgly.services;

import com.maxmind.geoip2.DatabaseReader;
import com.maxmind.geoip2.exception.GeoIp2Exception;
import com.maxmind.geoip2.model.CityResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.FileSystemResource;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.net.InetAddress;
import java.net.UnknownHostException;

@Service
public class GeoIp2Service {
    private final DatabaseReader reader;

    public GeoIp2Service(@Value("GeoLite2-City.mmdb") ClassPathResource databaseResource) throws IOException {
        this.reader = new DatabaseReader.Builder(databaseResource.getFile()).build();
    }

    public String getLocation(String ipAddress) throws IOException, GeoIp2Exception {
        String locationStr = null;
        try{
            var location  = reader.city(InetAddress.getByName(ipAddress));
            locationStr = location.getCountry().getName() + "-" + location.getSubdivisions().get(0).getIsoCode();
        } catch (Exception e){
            locationStr = LocaleContextHolder.getLocale().getDisplayCountry();
        }
        return locationStr;
    }
}
