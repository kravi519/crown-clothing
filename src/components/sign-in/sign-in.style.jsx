import styled from 'styled-components';
import CustomButton from '../custom-button/custom-button.component';

export const SignInContainer = styled.div`
  width: 380px;
  display: flex;
  flex-direction: column;
`;

export const SignInTitle = styled.h2`
  margin: 10px 0;
`;

export const ButtonsBarContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const CustomButtonStyle = styled(CustomButton)`
    border:none;
`