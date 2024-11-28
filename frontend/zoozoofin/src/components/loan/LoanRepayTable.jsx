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

// 만기
function maturityInterest(loanAmount, loanRate, loanPeriod, turn) {
    const interest = Math.floor((loanAmount * loanRate) / 100);
    const remainingLoan = Math.floor(loanAmount);

    const totalPayment = turn < loanPeriod ? interest : loanAmount + interest;

    if (turn < loanPeriod) {
        return { principal: 0, interest, remainingLoan };
    } else {
        return { principal: Math.floor(loanAmount), interest, remainingLoan: 0, totalPayment };
    }
}

// 원금 균등
function principalRepayment(loanAmount, loanRate, loanPeriod, turn) {
    const principal = Math.floor(loanAmount / loanPeriod);
    const remainingPrincipal = loanAmount - principal * (turn - 1);
    const interest = Math.floor((remainingPrincipal * loanRate) / 100);
    const remainingLoan = Math.floor(remainingPrincipal - principal);

    const totalPayment = principal + interest;

    return { principal, interest, remainingLoan, totalPayment };
}

// 원리금 균등
function principalInterest(loanAmount, loanRate, loanPeriod, turn) {
    const ratePerTurn = loanRate / 100;
    const temp = Math.pow(1 + ratePerTurn, loanPeriod);
    const paymentPerTurn = (loanAmount * ratePerTurn * temp) / (temp - 1);

    const principal = Math.floor(paymentPerTurn - loanAmount * ratePerTurn);
    const remainingLoan = Math.floor(loanAmount - principal * turn);
    const interest = Math.floor(paymentPerTurn - principal);

    const totalPayment = paymentPerTurn;

    return { principal, interest, remainingLoan, totalPayment };
}

const LoanRepayTable = ({ repayType, loanAmount, loanPeriod, loanRate }) => {
    const rows = [];
    for (let turn = 1; turn <= loanPeriod; turn++) {
        const maturityInterestResult = maturityInterest(loanAmount, loanRate, loanPeriod, turn);
        const principalRepaymentResult = principalRepayment(loanAmount, loanRate, loanPeriod, turn);
        const principalInterestResult = principalInterest(loanAmount, loanRate, loanPeriod, turn);

        rows.push({
            turn,
            maturityInterest: maturityInterestResult,
            principalRepayment: principalRepaymentResult,
            principalInterest: principalInterestResult,
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
                    <React.Fragment key={row.turn}>
                        {/* 만기 일시 상환 */}
                        {repayType === '만기' && (
                            <TableRow key={`maturityInterest-${index}`}>
                                {/* <TableRow> */}
                                <TableCell>{row.turn}</TableCell>
                                <TableCell>
                                    {row.maturityInterest.principal.toLocaleString()}
                                </TableCell>
                                <TableCell>
                                    {row.maturityInterest.interest.toLocaleString()}
                                </TableCell>
                                <TableCell>
                                    {row.maturityInterest.totalPayment.toLocaleString()}
                                </TableCell>
                                <TableCell>
                                    {row.maturityInterest.remainingLoan.toLocaleString()}
                                </TableCell>
                            </TableRow>
                        )}

                        {/* 원금 균등 상환 */}
                        {repayType === '원금' && (
                            <TableRow key={`principalRepayment-${index}`}>
                                {/* <TableRow> */}
                                <TableCell>{row.turn}</TableCell>
                                <TableCell>
                                    {row.principalRepayment.principal.toLocaleString()}
                                </TableCell>
                                <TableCell>
                                    {row.principalRepayment.interest.toLocaleString()}
                                </TableCell>
                                <TableCell>
                                    {row.principalRepayment.totalPayment.toLocaleString()}
                                </TableCell>
                                <TableCell>
                                    {row.principalRepayment.remainingLoan.toLocaleString()}
                                </TableCell>
                            </TableRow>
                        )}

                        {/* 원리금 균등 상환 */}
                        {repayType === '원리금' && (
                            <TableRow key={`principalInterest-${index}`}>
                                {/* <TableRow> */}
                                <TableCell>{row.turn}</TableCell>
                                <TableCell>
                                    {row.principalInterest.principal.toLocaleString()}
                                </TableCell>
                                <TableCell>
                                    {row.principalInterest.interest.toLocaleString()}
                                </TableCell>
                                <TableCell>
                                    {row.principalInterest.totalPayment.toLocaleString()}
                                </TableCell>
                                <TableCell>
                                    {row.principalInterest.remainingLoan.toLocaleString()}
                                </TableCell>
                            </TableRow>
                        )}
                    </React.Fragment>
                ))}
            </tbody>
        </Table>
    );
};

export default LoanRepayTable;
