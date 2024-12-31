import React, { useEffect, useState } from "react";
import './Profile.css'; 
import profileImage from '../images/profile.jpg'; // Asegúrate de que la ruta sea correcta

const Profile = () => {
    const [user, setUser] = useState(null); // Estado para almacenar los datos del usuario

    // Obtener el userId de localStorage
    const userId = localStorage.getItem('userId');

    // useEffect para obtener los datos del usuario al cargar el componente
    useEffect(() => {
        if (!userId) return; // Si no hay userId, no hacemos la solicitud

        const fetchUserData = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/users/${userId}`);
                const data = await response.json();
                setUser(data); // Almacenar los datos del usuario en el estado
            } catch (error) {
                console.error("Error al obtener los datos del usuario:", error);
            }
        };

        fetchUserData(); // Llamar a la función para obtener los datos
    }, [userId]);

    // Mostrar un mensaje de carga mientras se obtienen los datos
    if (!user) {
        return <p>Cargando perfil...</p>;
    }

    return (
        <div className="profile-container">
            {/* Contenedor para la imagen de perfil */}
            <div className="profile-image">
                <img src={profileImage} alt="Foto de usuario" /> {/* Usar la imagen importada */}
            </div>
            {/* Contenedor para la información del perfil */}
            <div className="profile-info">
                <h3>Nombre: <span>{user.nombre}</span></h3>
                <p>Correo: <span>{user.email}</span></p>
                <p>ID: <span>{user._id}</span></p>
                <p>Rol: <span>{user.role}</span></p>
                <p>Libros solicitados: <span>{user.librosTomados ? user.librosTomados.length : 0}</span></p>
                {/* Listar los libros tomados si existen */}
                {user.librosTomados && user.librosTomados.length > 0 && (
                    <div className="libros-tomados">
                        <h4>Libros Tomados:</h4>
                        <ul>
                            {user.librosTomados.map((libro, index) => (
                                <li key={index}>
                                    <p>Nombre del libro: {libro.nombreLibro}</p>
                                    <p> Id base de datos:{libro.libroId}</p>        
                                    <p>Fecha tomado: {new Date(libro.fechatomado).toLocaleDateString()}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Profile;
