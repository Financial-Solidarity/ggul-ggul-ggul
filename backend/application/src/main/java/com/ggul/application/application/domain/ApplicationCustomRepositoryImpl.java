package com.ggul.application.application.domain;

import com.ggul.application.application.application.dto.ApplicationListElement;
import com.ggul.application.application.application.dto.ApplicationSearchDto;
import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.BooleanExpression;
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
public class ApplicationCustomRepositoryImpl implements ApplicationCustomRepository {
    private final JPAQueryFactory jpaQueryFactory;

    @Override
    public Slice<ApplicationListElement> findBySearchParameter(ApplicationSearchDto dto){

        UUID userId = dto.getUserId();
        String order = dto.getOrder();
        Boolean asc = dto.getAsc();
        Boolean success = dto.getSuccess();
        Status status = dto.getStatus();
        Boolean own = dto.getOwn();
        Pageable pageable = dto.getPageable();

        QApplication application = QApplication.application;
        QApplicationHistory applicationHistory = QApplicationHistory.applicationHistory;

        JPAQuery<ApplicationListElement> query = jpaQueryFactory.select(
                Projections.constructor(ApplicationListElement.class,
                        application.id,
                        application.title,
                        application.imageUrl,
                        application.probability,
                        application.price,
                        application.status,
                        application.createdAt)
        ).from(application);

        if(own != null || success != null){
            query.distinct().join(applicationHistory).on(application.id.eq(applicationHistory.application.id));
            if(own != null){
                if(own)
                    query.where(applicationHistory.user.id.eq(userId));
                else
                    query.where(applicationHistory.user.id.ne(userId));
            }
            if(success != null){
                if(success)
                    query.where(applicationHistory.isSuccess.eq(true));
                else
                    query.where(applicationHistory.isSuccess.eq(false));
            }
        }

        if(status != null){
            query.where(application.status.eq(status));
        }

        if(order != null) {
            if (order.equals("probability")) {
                if (asc)
                    query.orderBy(application.probability.asc());
                else
                    query.orderBy(application.probability.desc());
            } else if (order.equals("price")) {
                if (asc)
                    query.orderBy(application.price.asc());
                else
                    query.orderBy(application.price.desc());
            } else {
                if (asc)
                    query.orderBy(application.createdAt.asc());
                else
                    query.orderBy(application.createdAt.desc());
            }
        } else{
            if (asc)
                query.orderBy(application.createdAt.asc());
            else
                query.orderBy(application.createdAt.desc());
        }

        query.offset(pageable.getOffset());
        query.limit(pageable.getPageSize());

        List<ApplicationListElement> results = query.fetch();

        boolean hasNext = results.size() > pageable.getPageSize();
        if (hasNext)
            results.remove(results.size() - 1);

        return new SliceImpl<>(results, pageable, hasNext);
    }
}
