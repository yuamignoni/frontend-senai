import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { useTable } from 'react-table';
import './Usuarios.css';

function Usuarios() {
  const [data, setData] = useState([]);

  const fetchData = useCallback(() => {
    const token = localStorage.getItem('token');
    axios.get('http://localhost:8000/usuarios', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(response => {
      setData(response.data);
    })
    .catch(error => {
      console.error('Erro ao buscar usuários:', error);
    });
  }, []);

    const handleProduzidaClick = useCallback(async (id) => {
  const token = localStorage.getItem('token');
  try {
    await axios.post(`http://localhost:8000/produzir_carteirinha/${id}`, {}, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    fetchData();
  } catch (error) {
    console.error('Erro ao atualizar o status de produção:', error);
  }
}, [fetchData]);

const handleEnviadaClick = useCallback(async (id) => {
  const token = localStorage.getItem('token');
  try {
    await axios.post(`http://localhost:8000/enviar_carteirinha/${id}`, {}, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    fetchData();
  } catch (error) {
    console.error('Erro ao atualizar o status de envio:', error);
  }
}, [fetchData]);

  const handleDownloadFoto = async (id) => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.get(`http://localhost:8000/perfil/${id}/foto`, {
        headers: {
          Authorization: `Bearer ${token}`
        },
        responseType: 'arraybuffer',
      });

      const blob = new Blob([response.data], { type: response.headers['content-type'] });

      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = `foto_${id}.png`;
      link.click();
    } catch (error) {
      console.error('Erro ao fazer o download da foto:', error);
    }
  };

useEffect(fetchData, [fetchData]);


  const columns = React.useMemo(
    () => [
      {
        Header: 'ID do Usuário',
        accessor: 'usuarioid',
      },
      {
        Header: 'Nome',
        accessor: 'nome',
      },
      {
        Header: 'Email',
        accessor: 'email',
      },
      {
        Header: 'Telefone',
        accessor: 'telefone',
      },
      {
        Header: 'Data de Solicitação',
        accessor: 'datasolicitacao',
        Cell: ({ value }) => {
            if (value) {
            const date = new Date(value);
            return date.toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' });
        }
        return 'N/A';
        }
    },
    {
      Header: 'Produzida',
      accessor: 'dataproducao',
      Cell: ({ row }) => (
        <div onClick={() => handleProduzidaClick(row.original.usuarioid)}>
          {row.original.dataproducao ? '✔️' : '❌'}
        </div>
      )
    },
    {
      Header: 'Enviada',
      accessor: 'dataenvio',
      Cell: ({ row }) => (
        <div onClick={() => handleEnviadaClick(row.original.usuarioid)}>
          {row.original.dataenvio ? '✔️' : '❌'}
        </div>
      )
    },
    {
        Header: 'Foto de Perfil',
        accessor: 'foto_perfil',
        Cell: ({ row }) => (
          <div onClick={() => handleDownloadFoto(row.original.usuarioid)}>
            📷
          </div>
        ),
      },
    ],
[handleEnviadaClick, handleProduzidaClick]
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data });

  return (
    <table {...getTableProps()} style={{ width: '100%', margin: '0 auto' }}>
      <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th {...column.getHeaderProps()}>{column.render('Header')}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map(row => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map(cell => (
                <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default Usuarios;