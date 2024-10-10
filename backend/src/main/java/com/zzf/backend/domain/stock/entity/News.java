package com.zzf.backend.domain.stock.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.Date;

@Entity
@Getter
@Table(name = "news")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class News {

    @Id
    @Column(name = "news_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long newsId;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "stock_id")
    private Stock stock;

    @NotNull
    @Column(name = "turn")
    private Long turn;

    @NotNull
    @Column(name = "title")
    private String title;

    @NotNull
    @Column(name = "provider")
    private String provider;

    @NotNull
    @Column(name = "description")
    private String description;

    @NotNull
    @Column(name = "content")
    private String content;

    @NotNull
    @Column(name = "date")
    private Date date;

    @Builder
    public News(Stock stock, Long turn, String title, String provider, String description, String content, Date date) {
        this.stock = stock;
        this.turn = turn;
        this.title = title;
        this.provider = provider;
        this.description = description;
        this.content = content;
        this.date = date;
    }
}
