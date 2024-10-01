package com.zzf.backend.domain.loan.repository;

import com.zzf.backend.domain.animal.entity.Animal;
import com.zzf.backend.domain.loan.entity.Loan;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LoanRepository extends JpaRepository<Loan, Long> {
    List<Loan> findAllByAnimalAndLoanIsEndFalse(Animal animal);

    // 캐릭터 만기 안된 대출 모두 조회, 마감 턴 빠른 순으로 정렬
    List<Loan> findAllByAnimalAndLoanIsEndFalseOrderByLoanToEndAsc(Animal animal);

    // 대출 존재 여부 확인
    boolean existsByAnimalAndLoanIsEndFalse(Animal animal);
}
