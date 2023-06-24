import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap';
import './styles.css';
import api from '../../services/api';

import logoUnifield from '../../assets/logounifield.png'
import { FiEdit, FiUserX } from 'react-icons/fi'

export default function Clientes() {
    const [searchInput, setSearchInput] = useState('');
    const [filtro, setFiltro] = useState([]);
    const [clientes, setClientes] = useState([]);
    const [hasClientes, setHasClientes] = useState(false);

    const email = localStorage.getItem('email');
    const token = localStorage.getItem('token');

    const navigate = useNavigate();

    const authorization = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const searchClientes = (searchValue) => {
        setSearchInput(searchValue);
        if (searchValue !== '') {
            const dadosFiltrados = clientes.filter((item) => {
                return Object.values(item).join('').toLowerCase()
                    .includes(searchValue.toLowerCase())
            });
            setFiltro(dadosFiltrados);
        } else {
            setFiltro(clientes);
        }
    }

    useEffect(() => {
        api.get('api/cliente', authorization)
            .then(response => {
                setClientes(response.data);
                setHasClientes(response.data.length > 0);
            })
            .catch(error => {
                console.error('Erro ao carregar os clientes:', error);
            });
    }, []);

    async function logout() {
        try {
            localStorage.clear();
            localStorage.setItem('token', '');
            authorization.headers = '';
            navigate('/');
        } catch (err) {
            alert('Não foi possível fazer o logout' + err);
        }
    }

    async function editCliente(clienteID) {
        try {
            navigate(`/api/cliente/${clienteID}`);
        } catch (error) {
            alert('Não foi possível editar o cliente')
        }
    }

    async function deleteCliente(clienteID) {
        try {
            if (window.confirm('Deseja deletar o cliente de id = ' + clienteID + ' ?')) {
                await api.delete(`/api/cliente/{id}?clienteid=${clienteID}`, authorization);
                setClientes(clientes.filter(cliente => cliente.clienteID !== clienteID));
                setHasClientes(clientes.length > 1); // Atualiza o estado hasClientes após a exclusão
            }
        } catch (error) {
            alert('Não foi possível excluir o cliente')
        }
    }

    return (
        <>
            <Navbar expand="lg" className="custom-navbar">
                <img src={logoUnifield} alt="Cadastro" className="brand-logo" />
                <span className='m-span'>
                    <span className='cor1'>Bem-</span>
                    <span className='cor2'>Vindo, </span>
                    <span className='cor3'><strong>{email}</strong></span>
                    <span className='cor4'>!</span>
                </span>

                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav" className='ml-configg'>
                    <Nav className="ml-auto">
                        <Nav.Link onClick={logout}>Logout</Nav.Link>
                        {hasClientes && (
                            <Nav.Link as={Link} to="/api/fazenda">Fazenda</Nav.Link>
                        )}
                        <Nav.Link as={Link} to="/api/cliente/0">Novo Cliente</Nav.Link>
                    </Nav>
                    <Form inline className="ml-auto d-flex justify-content-end">
                        <FormControl
                            type="text"
                            placeholder="Pesquisar por nome..."
                            className="search-input"
                            onChange={(e) => searchClientes(e.target.value)}
                        />
                    </Form>
                </Navbar.Collapse>
            </Navbar>
            <div className="cliente-container">
                <h1>Clientes</h1>
                {searchInput.length > 1 ? (
                    <ul>
                        {filtro.map(cliente => (
                            <li key={cliente.clienteID}>
                                <b>Nome Cliente:</b>{cliente.nomeCliente}<br /><br />
                                <b>cpf:</b>{cliente.cpf}<br /><br />
                                <b>Telefone:</b>{cliente.celularN}<br /><br />
                                <b>Email:</b>{cliente.e_Mail}<br /><br />
                                <b>Data Nascimento:</b>{cliente.dataNacs}<br /><br />
                                <b>Codigo:</b>{cliente.codigo}<br /><br />
                                <button onClick={() => editCliente(cliente.clienteID)} type="button">
                                    <FiEdit size="25" color="#17202a" />
                                </button>
                                <button type="button" onClick={() => deleteCliente(cliente.clienteID)}>
                                    <FiUserX size="25" color="#17202a" />
                                </button>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <ul>
                        {clientes.map(cliente => (
                            <li key={cliente.clienteID}>
                                <div className='teste'>
                                    <b>Nome Cliente: </b>{cliente.nomeCliente}<br /><br />
                                    <b>Cpf: </b>{cliente.cpf}<br /><br />
                                    <b>Telefone: </b>{cliente.celularN}<br /><br />
                                    <b>Email: </b>{cliente.e_Mail}<br /><br />
                                    <b>Data Nascimento: </b>{new Date(cliente.dataNacs).toLocaleDateString('pt-BR')}<br /><br />
                                    <b>Codigo: </b>{cliente.codigo}<br /><br />
                                    <button onClick={() => editCliente(cliente.clienteID)} type="button">
                                        <FiEdit size="25" color="#17202a" />
                                    </button>

                                    <button type="button" onClick={() => deleteCliente(cliente.clienteID)}>
                                        <FiUserX size="25" color="#17202a" />
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </>
    )
}
