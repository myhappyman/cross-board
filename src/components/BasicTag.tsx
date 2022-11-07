import styled from "styled-components";

export const Form = styled.form`
    display: flex;
    margin: 20px 0;
`;

export const Label = styled.label`
    padding: 10px;
    background-color: ${props => props.theme.buttonColor};
    color: ${props => props.theme.buttonTextColor};
`;

export const Input = styled.input`
    border: none;
    outline: none;
    min-height: 36px;
    font-size: 20px;
    line-height: 36px;
    padding: 0 15px;
    margin: 0 auto;
`;

export const Button = styled.button`
    border: none;
    outline: none;
    background-color: ${props => props.theme.buttonColor};
    color: ${props => props.theme.buttonTextColor};
`;

export const MiniTitle = styled.h2`
    text-align: center;
    font-size: 18px;
    font-weight: 700;
    margin-bottom: 10px;
`;