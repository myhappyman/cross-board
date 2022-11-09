import styled from "styled-components";

export const Form = styled.form`
    display: flex;
    margin: 20px 0;
`;

export const Label = styled.label`
    border-radius: 10px;
    margin-right: 5px;
    padding: 10px;
    background-color: ${props => props.theme.buttonColor};
    color: ${props => props.theme.buttonTextColor};
    box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
`;

export const Input = styled.input`
    border: none;
    border-radius: 10px;
    outline: none;
    min-height: 36px;
    font-size: 16px;
    line-height: 36px;
    padding: 0 15px;
    margin: 0 auto;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
`;

export const Button = styled.button`
    border: none;
    border-radius: 10px;
    outline: none;
    background-color: ${props => props.theme.buttonColor};
    color: ${props => props.theme.buttonTextColor};
    box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
`;