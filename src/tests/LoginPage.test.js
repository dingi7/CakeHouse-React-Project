import { render, screen, fireEvent } from '@testing-library/react';
import { LoginPage } from '../components/Pages/Login/Login';
import { MemoryRouter } from 'react-router-dom';
import { AuthContext } from '../components/contexts/AuthContext';

jest.mock('../components/utils/request.js');

describe('LoginPage', () => {
    const setAccessDataMock = jest.fn();
    const navigateMock = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should render the login form', () => {
        render(
            <MemoryRouter>
                <AuthContext.Provider
                    value={{ setAccessData: setAccessDataMock }}
                >
                    <LoginPage />
                </AuthContext.Provider>
            </MemoryRouter>
        );
        const emailInput = screen.getByLabelText('Email');
        const passwordInput = screen.getByLabelText('Password');
        const loginButton = screen.getByTestId('login-btn')
        expect(emailInput).toBeInTheDocument();
        expect(passwordInput).toBeInTheDocument();
        expect(loginButton).toBeInTheDocument();
    });

    it('should call setAccessData and navigate to /profile on successful login', async () => {
        const loginReqMock = require('../components/utils/request.js').loginReq;
        loginReqMock.mockResolvedValueOnce({ token: '12345' });

        render(
            <MemoryRouter>
                <AuthContext.Provider
                    value={{ setAccessData: setAccessDataMock }}
                >
                    <LoginPage navigate={navigateMock} />
                </AuthContext.Provider>
            </MemoryRouter>
        );

        const emailInput = screen.getByLabelText('Email');
        const passwordInput = screen.getByLabelText('Password');
        const loginButton = screen.getByTestId('login-btn')

        fireEvent.change(emailInput, { target: { value: 'dingi@abv.bg' } });
        fireEvent.change(passwordInput, { target: { value: '12345' } });
        fireEvent.click(loginButton);

        expect(loginReqMock).toHaveBeenCalledWith('dingi@abv.bg', '12345');
        expect(localStorage.setItem).toHaveBeenCalled()
    });

    it('should display an error message on failed login', async () => {
        const loginReqMock = require('../components/utils/request.js').loginReq;
        loginReqMock.mockRejectedValueOnce(
            new Error('Invalid email or password')
        );

        render(
            <MemoryRouter>
                <AuthContext.Provider
                    value={{ setAccessData: setAccessDataMock }}
                >
                    <LoginPage />
                </AuthContext.Provider>
            </MemoryRouter>
        );

        const emailInput = screen.getByLabelText('Email');
        const passwordInput = screen.getByLabelText('Password');
        const loginButton = screen.getByTestId('login-btn')

        fireEvent.change(emailInput, { target: { value: 'dingi@abv.bg' } });
        fireEvent.change(passwordInput, { target: { value: '12345' } });
        fireEvent.click(loginButton);

        expect(loginReqMock).toHaveBeenCalledWith('dingi@abv.bg', '12345');
        expect(setAccessDataMock).not.toHaveBeenCalled();
        expect(localStorage.setItem).not.toHaveBeenCalled();
        expect(navigateMock).not.toHaveBeenCalled();
        expect(
            screen.getByText('Invalid email or password')
        ).toBeInTheDocument();
    });
});
