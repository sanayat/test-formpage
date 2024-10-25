import React from 'react';
import { useForm } from 'react-hook-form';


const UserForm = ({ onSubmit }) => {
    const { register, handleSubmit, formState: { errors } } = useForm();

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="form-container">

            <input
                {...register('name', { required: 'Имя обязательно' })}
                placeholder="NAME"
            />
            {errors.name && <span>{errors.name.message}</span>}

            <input
                {...register('email', { required: 'Email обязателен' })}
                placeholder="EMAIL"
            />
            {errors.email && <span>{errors.email.message}</span>}

            <input
                {...register('username', { required: 'Имя пользователя обязательно' })}
                placeholder="USERNAME"
            />
            {errors.username && <span>{errors.username.message}</span>}

            <button type="submit">CREATE</button>
        </form>
    );
};

export default UserForm;
