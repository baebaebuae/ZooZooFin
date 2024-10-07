import React, { useState } from 'react';
import styled from 'styled-components';

const Table = styled.table`
    width: 280px;
    border-collapse: collapse;
    margin: 20px 0;
`;

const TableHeader = styled.th`
    width: 240px;
    font-size: 8px;
    background-color: transparent;
    padding: 4px;
    text-align: center;
`;

const TableCell = styled.td`
    font-size: 10px;
    padding: px;
    text-align: center;
`;

const TableRow = styled.tr`
    color: ${({ theme }) => theme.colors.gray};
`;

// 만기일시상환 계산식
const getMaturityInterest = (loanAmount, loanRate, loanPeriod, turn) => {
    // 복리 계산
    const interest = loanAmount * Math.pow(1 + loanRate / 100, loanPeriod) - loanAmount;
    const remainingLoan = Math.floor(loanAmount);

    const totalInterest = loanAmount * Math.pow(1 + loanRate / 100, loanPeriod) - loanAmount;
    const interestPerTurn = totalInterest / loanPeriod; // 각 턴에 대한 이자
    const totalPayment = turn === loanPeriod ? loanAmount + totalInterest : interestPerTurn;

    if (turn < loanPeriod) {
        return { principal: 0, interest, remainingLoan };
    } else {
        return { principal: Math.floor(loanAmount), interest, remainingLoan: 0, totalPayment };
    }
};

const CapitalRepayTable = ({ repayType, loanAmount, loanPeriod, loanRate }) => {
    console.log(loanAmount, loanPeriod, loanRate);
    const rows = [];
    for (let turn = 1; turn <= loanPeriod; turn++) {
        const maturityInterestResult = getMaturityInterest(loanAmount, loanRate, loanPeriod, turn);
        rows.push({
            turn,
            maturityInterest: maturityInterestResult,
        });
    }

    return (
        <Table>
            <thead>
                <tr>
                    <TableHeader>턴</TableHeader>
                    <TableHeader>납입 원금</TableHeader>
                    <TableHeader>대출 이자</TableHeader>
                    <TableHeader>턴 상환금</TableHeader>
                    <TableHeader>대출 잔금</TableHeader>
                </tr>
            </thead>
            <tbody>
                {rows.map((row, index) => (
                    <TableRow key={`maturityInterest-${index}`}>
                        <TableCell>{row.turn}</TableCell>
                        <TableCell>{row.maturityInterest.principal.toLocaleString()}</TableCell>
                        <TableCell>{row.maturityInterest.interest.toLocaleString()}</TableCell>
                        <TableCell>{row.maturityInterest.totalPayment.toLocaleString()}</TableCell>
                        <TableCell>{row.maturityInterest.remainingLoan.toLocaleString()}</TableCell>
                    </TableRow>
                ))}
            </tbody>
        </Table>
    );
};

export default CapitalRepayTable;
