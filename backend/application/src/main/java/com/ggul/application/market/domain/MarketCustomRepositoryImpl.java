package com.ggul.application.market.domain;

import com.ggul.application.equipment.domain.QEquipment;
import com.ggul.application.equipment.domain.QEquipmentItem;
import com.ggul.application.equipment.domain.QTokenizedEquipment;
import com.ggul.application.market.application.dto.MarketSearchDto;
import com.ggul.application.market.application.dto.MarketListElement;
import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.jpa.impl.JPAQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.domain.SliceImpl;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
@AllArgsConstructor
public class MarketCustomRepositoryImpl implements MarketCustomRepository {

    private final JPAQueryFactory jpaQueryFactory;

    @Override
    public Slice<MarketListElement> findBySearchParameter(MarketSearchDto dto){
        UUID userId = dto.getUserId();
        Long minPower = dto.getMinPower();
        Long maxPower = dto.getMaxPower();
        Long minPrice = dto.getMinPrice();
        Long maxPrice = dto.getMaxPrice();
        String name = dto.getName();
        Boolean own = dto.getOwn();
        Status status = dto.getStatus();
        Pageable pageable = dto.getPageable();

        QMarket market = QMarket.market;
        QTokenizedEquipment tokenizedEquipment = QTokenizedEquipment.tokenizedEquipment;
        QEquipment equipment = QEquipment.equipment;
        QEquipmentItem equipmentItem = QEquipmentItem.equipmentItem;

        JPAQuery<MarketListElement> query = jpaQueryFactory.select(
                Projections.constructor(MarketListElement.class,
                        market.id,
                        equipment.power,
                        Expressions.simpleTemplate(Integer.class, "{0} / 200", equipment.power),
                        market.price,
                        market.title,
                        equipmentItem.url)
        );

        query
                .from(market)
                .leftJoin(tokenizedEquipment).on(market.tokenizedEquipment.eq(tokenizedEquipment))
                .leftJoin(equipment).on(tokenizedEquipment.equipment.eq(equipment))
                .leftJoin(equipmentItem).on(equipment.item.eq(equipmentItem));

        if (minPrice != null) {
            query.where(market.price.goe(minPrice));
        }

        if (maxPrice != null) {
            query.where(market.price.loe(maxPrice));
        }

        if (minPower != null) {
            query.where(equipment.power.goe(minPower));
        }

        if (maxPower != null) {
            query.where(equipment.power.loe(maxPower));
        }

        if(name != null) {
            query.where(equipmentItem.name.eq(name));
        }

        if(status != null){
            query.where(market.status.eq(status));
        }

        if (Boolean.TRUE.equals(own)) {
            query.where(market.seller.id.eq(userId));
        } else if (Boolean.FALSE.equals(own)) {
            query.where(market.seller.id.ne(userId));
        }

        query.orderBy(market.createdAt.desc());

        query.offset(pageable.getOffset());
        query.limit(pageable.getPageSize());

        List<MarketListElement> results = query.fetch();

        boolean hasNext = results.size() > pageable.getPageSize();
        if (hasNext)
            results.remove(results.size() - 1);

        return new SliceImpl<>(results, pageable, hasNext);
    }
}
