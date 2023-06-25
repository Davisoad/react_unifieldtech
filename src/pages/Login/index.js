import React, { useState } from 'react';
import { MDBBtn, MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBInput } from 'mdb-react-ui-kit';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import 'bootstrap/dist/css/bootstrap.min.css';
import logoImage from '../../assets/logounifield.png';
import './styleslogin.css';
export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [error, setError] = useState('');

  async function handleLogin(event) {
    event.preventDefault();

    const data = {
      email,
      password,
    };

    try {
      const response = await api.post('api/values/loginuser', data);

      localStorage.setItem('email', email);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('expiration', response.data.expiration);

      navigate('/api/cliente');
    } catch (error) {
      setError('O login falhou ' + error);
    }
  }

  return (
      <MDBContainer fluid className="login-container background-image">
        <MDBRow className='d-flex justify-content-center align-items-center h-100'>
          <MDBCol col='12'>
            <form onSubmit={handleLogin}>
              <MDBCard className='text-white my-5 mx-auto card-custom' style={{ borderRadius: '0.5rem', maxWidth: '400px' }}>
                <MDBCardBody className='p-5 d-flex flex-column align-items-center mx-auto w-100'>
                  <img src={logoImage} alt="Login" id="img1" style={{ width: '100px' }} /> <br /> <br />
                  <h2 className="fw-bold mb-2 text-uppercase">Unifield Tech</h2> <br />

                  <MDBInput
                    wrapperClass='mb-4 mx-5 w-100'
                    labelClass='text-white'
                    id='email'
                    type='email'
                    size='lg'
                    labelSize='lg'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder='Email'
                    style={{ borderColor: '#000000', borderRadius: '0.5rem' }}
                  />
                  <MDBInput
                    wrapperClass='mb-4 mx-5 w-100'
                    labelClass='text-white'
                    id='password'
                    type='password'
                    size='lg'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder='Senha'
                    style={{ borderColor: '#000000', borderRadius: '0.5rem' }}
                  /> <br /> <br />

                  <MDBBtn outline className='mx-2 px-5 btn-custom' style={{ color: 'black' }} color='black' size='lg' type="submit">
                    Login
                  </MDBBtn>
                </MDBCardBody>
              </MDBCard>
            </form>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
  );
}
