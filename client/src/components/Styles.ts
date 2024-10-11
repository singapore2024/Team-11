import styled from "styled-components";
import { Input } from "antd";

interface StyledInputSearchProps {
    col: string | undefined;
}

export const StyledInputSearch = styled(Input)<
    Partial<StyledInputSearchProps>
>`
    && {
        ${({ col }) =>
            col === "black" &&
            `
        color: #bfbfbf;
        .ant-input {
            background: none;
            color: #000;
            margin-left: 0.5rem;
        }
        .anticon {
            color: #000;
            margin-right: 0.5rem;
        }
        `}
        background: none;
        border-radius: 60px;
        height: 42px;
        display: flex;
        flex-direction: row;
        padding: 0.9vw;
        margin: 0.5rem 0rem;
        font-size: 14px;
        width: 100%;
        border-color: transparent;
        box-shadow: 0 2px 10px var(--color-gray-6);

        &:hover {
            border: 1px solid #535bf2;
        }
    }
`;

export const StyledInput = styled(Input)`
    {
        color: #bfbfbf;
        border: 1.5px solid #bfbfbf;
        .ant-input {
            background: none;
            color: #000;
            margin-left: 0.5rem;
        }
        .anticon {
            color: #000;
            margin-right: 0.5rem;
        }
        background: none;
        width: 90%;
        height: 36px;
        display: flex;
        flex-direction: row;
        margin-top: 1rem;
        margin-bottom: 1rem;
        margin-left: 0;
        font-family: Poppins-Medium, sans-serif;
        font-size: calc(10px + 0.4vw);
        border-radius: 60px;

      input {
        background: none;
        border: none;
      }

      select {
        background: none;
        border: none;
      }

      textarea:focus,
      input:focus,
      select:focus {
        outline: none;
      }
    }
`;