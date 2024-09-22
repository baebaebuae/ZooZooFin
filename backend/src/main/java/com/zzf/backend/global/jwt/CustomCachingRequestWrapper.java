package com.zzf.backend.global.jwt;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.web.util.ContentCachingRequestWrapper;

import java.util.*;
import java.util.concurrent.ConcurrentHashMap;

public class CustomCachingRequestWrapper extends ContentCachingRequestWrapper {

    private final ConcurrentHashMap<String, String> headerMap = new ConcurrentHashMap<>();

    public CustomCachingRequestWrapper(HttpServletRequest request) {
        super(request);
    }

    public void addHeader(String name, String value) {
        headerMap.put(name, value);
    }

    @Override
    public String getHeader(String name) {
        String headerValue = super.getHeader(name);
        if (headerMap.containsKey(name)) {
            headerValue = headerMap.get(name);
        }
        return headerValue;
    }

    @Override
    public Enumeration<String> getHeaderNames() {
        Set<String> names = new HashSet<>(Collections.list(super.getHeaderNames()));
        names.addAll(headerMap.keySet());

        return Collections.enumeration(new ArrayList<>(names));
    }

    @Override
    public Enumeration<String> getHeaders(String name) {
        List<String> values = new ArrayList<>(Collections.list(super.getHeaders(name)));

        if (headerMap.containsKey(name)) {
            values.add(headerMap.get(name));
        }

        return Collections.enumeration(values);
    }
}
