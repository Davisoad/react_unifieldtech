import React, { useEffect, useState } from 'react';
import './styles.css';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { FiCornerDownLeft, FiUserPlus } from 'react-icons/fi';
import api from '../../services/api';

export default function NovoFazenda() {
    const [id, setId] = useState(null);
    const [nomeFazenda, setNome] = useState('');
    const [hectar, setHectar] = useState('');
    const [cultivar, setCultivar] = useState('');
    const [rua, setRua] = useState('');
    const [num, setNum] = useState('');
    const [cidade, setCidade] = useState('');
    const [estado, setEstado] = useState('');
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');
    const [tipoPlantio, setPlatio] = useState(false);
    const [areaMecanizada, setMecanizada] = useState(Boolean);
    const [clienteID, setDataClienteID] = useState(0);

    const { fazendaID } = useParams();
    const navigate = useNavigate();

    const token = localStorage.getItem('token');
    const authorization = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    useEffect(() => {
        if (fazendaID === '0') {
            return;
        } else {
            loadFazenda();
        }
    }, fazendaID);

    async function loadFazenda() {
        try {
            const response = await api.get(`/api/fazenda/{id}?fazendaid=${fazendaID}`, authorization);
            setId(response.data.fazendaID);
            setNome(response.data.nomeFazenda);
            setHectar(response.data.hectar);
            setCultivar(response.data.cultivar);
            setRua(response.data.rua);
            setNum(response.data.num);
            setCidade(response.data.cidade);
            setEstado(response.data.estado);
            setLatitude(response.data.latitude);
            setLongitude(response.data.longitude);
            setPlatio(response.data.tipoPlantio);
            setMecanizada(response.data.areaMecanizada);
            setDataClienteID(response.data.clienteID);
        } catch (error) {
            alert('Erro ao recuperar a fazenda ' + error);
            navigate('/api/fazenda');
        }
    }

    async function saveOrUpdate(event) {
        event.preventDefault();

        const data = {
            nomeFazenda,
            hectar,
            cultivar,
            rua,
            num,
            cidade,
            estado,
            latitude,
            longitude,
            tipoPlantio: tipoPlantio, 
            areaMecanizada : areaMecanizada,
            clienteID: clienteID,
        };

        try {
            if (fazendaID === '0') {
                await api.post('api/fazenda', data, authorization);
            } else {
                data.fazendaid = id;
                await api.put(`/api/fazenda/{id}?fazendaid=${fazendaID}`, data, authorization);
            }
        } catch (error) {
            alert('Erro ao gravar a fazenda ' + error);
        }
        navigate('/api/fazenda');
    }

    return (
        <div className="novo-cliente-container">
            <div className="content">
                <section className="form">
                    <FiUserPlus size="105" color="#17202a" />
                    <h1>{fazendaID === '0' ? 'Incluir Nova Fazenda' : 'Atualizar Fazenda'}</h1>
                    <Link className="back-link" to="/api/fazenda">
                        <FiCornerDownLeft size="25" color="#17202a" /> Retornar
                    </Link>
                </section>

                <form onSubmit={saveOrUpdate}>
                    <input
                        placeholder="Nome Fazenda"
                        value={nomeFazenda}
                        onChange={(e) => setNome(e.target.value)}
                    />
                    <input
                        placeholder="Heactar"
                        value={hectar}
                        onChange={(e) => setHectar(e.target.value)}
                    />
                    <input
                        placeholder="Cultivar"
                        value={cultivar}
                        onChange={(e) => setCultivar(e.target.value)}
                    />
                    <input
                        placeholder="Rua"
                        value={rua}
                        onChange={(e) => setRua(e.target.value)}
                    />
                    <input
                        placeholder="Número"
                        value={num}
                        onChange={(e) => setNum(e.target.value)}
                    />
                    <input
                        placeholder="Estado"
                        value={estado}
                        onChange={(e) => setEstado(e.target.value)}
                    />
                    <input
                        placeholder="Latitude"
                        value={latitude}
                        onChange={(e) => setLatitude(e.target.value)}
                    />
                    <input
                        placeholder="Longitude"
                        value={longitude}
                        onChange={(e) => setLongitude(e.target.value)}
                    />
                    <input
                        placeholder="Tipo Plantio"
                        value={tipoPlantio}
                        onChange={(e) => setPlatio(e.target.value)}
                    />
                    <input
                        placeholder="Área Mecanizada"
                        value={areaMecanizada}
                        onChange={(e) => setMecanizada(e.target.value)}
                    />
                    <input
                        placeholder="ClienteId"
                        value={clienteID}
                        onChange={(e) => setDataClienteID(e.target.value)}
                    />
                    <button className="button" type="submit">
                        {fazendaID === '0' ? 'Incluir' : 'Atualizar'}
                    </button>
                </form>
            </div>
        </div>
    );
}
