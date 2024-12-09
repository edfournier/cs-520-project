package com.group.project.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**") 
            .allowedOrigins("chrome-extension://elkmicmjdcelmkdgjahgbbibkbgolalg") 
            .allowedMethods("GET", "POST", "PUT", "DELETE")
            .allowedHeaders("*") 
            .allowCredentials(true); 
    }
}