import pg from "pg";
const { Pool } = pg;

const config = {
  user: "postgres",
  host: "localhost",
  database: "always music",
  password: "Pauli1989+",
  port: 5432,
};

const pool = new Pool(config);

// Función para manejar errores
function handleError(error) {
  console.error('Error:', error.message);
}

// Función para registrar un nuevo estudiante
async function registrarEstudiante(nombre, rut, curso, nivel) {
  try {
    const query = {
      text: 'INSERT INTO estudiantes(nombre, rut, curso, nivel) VALUES($1, $2, $3, $4)',
      values: [nombre, rut, curso, nivel]
    };
    const result = await pool.query(query);
    console.log('Estudiante registrado correctamente.');
    return result.rows;
  } catch (error) {
    handleError(error);
  }
}

// Función para obtener un estudiante por su rut
async function obtenerEstudiantePorRut(rut) {
  try {
    const query = {
      text: 'SELECT * FROM estudiantes WHERE rut = $1',
      values: [rut]
    };
    const result = await pool.query(query);

    if (result.rows.length === 0) {
      throw new Error('No se encontró ningún estudiante con el rut proporcionado.');
    }

    console.log(result.rows);
    return result.rows;
  } catch (error) {
    handleError(error);
  }
}

// Función para obtener todos los estudiantes
async function obtenerTodosLosEstudiantes() {
  try {
    const query = {
      text: 'SELECT * FROM estudiantes',
      rowMode: 'array'
    };
    const result = await pool.query(query);

    if (result.rows.length === 0) {
      throw new Error('No se encontraron estudiantes.');
    }

    console.log(result.rows);
    return result.rows;
  } catch (error) {
    handleError(error);
  }
}

// Función para actualizar los datos de un estudiante
async function actualizarEstudiante(nombre, rut, curso, nivel) {
  try {
    const query = {
      text: 'UPDATE estudiantes SET nombre = $1, curso = $2, nivel = $3 WHERE rut = $4',
      values: [nombre, curso, nivel, rut]
    };
    const result = await pool.query(query);

    if (result.rowCount === 0) {
      throw new Error('No se encontró ningún estudiante para actualizar.');
    }

    console.log('Estudiante actualizado correctamente.');
    return result.rows;
  } catch (error) {
    handleError(error);
  }
}

// Función para eliminar un estudiante por su rut
async function eliminarEstudiantePorRut(rut) {
  try {
    const query = {
      text: 'DELETE FROM estudiantes WHERE rut = $1',
      values: [rut]
    };
    const result = await pool.query(query);

    if (result.rowCount === 0) {
      throw new Error('No se encontró ningún estudiante para eliminar.');
    }

    console.log('Estudiante eliminado correctamente.');
    return result.rows;
  } catch (error) {
    handleError(error);
  }
}


// Obtener registros de todos los estudiantes registrados en formato de arreglo
async function obtenerRegistrosEstudiantes() {
  try {
    const query = {
      text: 'SELECT array_agg(row_to_json(estudiantes)) AS registros FROM estudiantes'
    };
    const result = await pool.query(query);

    if (!result.rows[0].registros) {
      throw new Error('No se encontraron registros de estudiantes.');
    }

    console.log(result.rows[0].registros);
    return result.rows[0].registros;
  } catch (error) {
    handleError(error);
  }
}


/*CONSULTAS
registrarEstudiante('Camila Salas', '24576891-8', 'Guitarra', 'Principiante');
obtenerEstudiantePorRut('34567890-1'); 
obtenerTodosLosEstudiantes();
actualizarEstudiante('Pedro García', '34567890-1', 'Batería', 'Intermedio');
eliminarEstudiantePorRut('24576891-8');  
*/ 

