import React, { useState ,useEffect} from 'react';


const initialFormValues = {
    title: '',
    desc: ''
}


const TodoForm = ({ todoAdd,todoEdit ,todoUpdate}) => {


    const [formValues, setFormValues] = useState(initialFormValues);
    const { title, desc } = formValues;
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);
    const [updatedMessage, setUpdatedMessage] = useState(null);


    useEffect(()=>{
        if(todoEdit){
            setFormValues(todoEdit);
        }else{
            setFormValues(initialFormValues);
        }
        
    },[todoEdit])

    const handleInputChange = (e) => {
        const changedFormValues = {
            ...formValues,
            [e.target.name]: e.target.value
        }
        setFormValues(changedFormValues);
    }

    const handleSubmit = e => {
        e.preventDefault();

        if (title.trim() === '') {

            setError('debes indicar un título');
            return;
        }
        if(desc.trim() ===''){
            setError('debes escribir una descripción')
            return;
        }

        //agregar tarea
        if(todoEdit){
            todoUpdate(formValues);
            setUpdatedMessage('Actualizado con éxito');
            setTimeout(() => {
                setUpdatedMessage(null);                
            }, 2000);
        }else{
            todoAdd(formValues);
            setSuccessMessage('agregado con éxito');
            setTimeout(() => {
                setSuccessMessage(null);
                
            }, 2000);
            
        }
       
        setFormValues(initialFormValues);
       
        
        setError(null);
    }

    return (

        <div>
            <h2 className='text-center dispplay-5'>{todoEdit ? 'Editar tarea':'Nueva tarea'}</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder='Título'
                    className='form-control'
                    value={title}
                    name='title'
                    onChange={handleInputChange}
                />
                <textarea
                    placeholder='Descripción'
                    className='form-control mt-2'
                    value={desc}
                    name='desc'
                    onChange={handleInputChange}
                />
                <button
                    className='btn btn-primary btn-block mt-2 '
                >{todoEdit ? 'Actualizar tarea ':'Agregar tarea'}
                </button>
            </form>
            {
                error &&
                (
                    <div className='alert alert-danger mt-2'>
                        {error}
                    </div> 
                )
            }
            {
                updatedMessage && 
                (
                    <div className='alert alert-success mt-2'>
                        {updatedMessage}
                    </div>  
                )
            }
            {
                successMessage &&
                (
                    <div className='alert alert-success mt-2'>
                        {successMessage}
                    </div> 
                )
            }

        </div>
    );
}

export default TodoForm;