import Joi from 'joi-browser';

export function fieldsValidationsChangeModal() {
    return {
        key: Joi.number().required(),
            lastName: Joi.string().required().error(errors => {
        errors.forEach(err => {
            switch (err.type) {
                case "any.empty":
                    err.message = "Фамилия - обязательна к заполнению.";
                    break;
                default:
                    break;
            }
        });
        return errors;
    }),
        firstName: Joi.string().required().error(errors => {
        errors.forEach(err => {
            switch (err.type) {
                case "any.empty":
                    err.message = "Имя - обязательно к заполнению.";
                    break;
                default:
                    break;
            }
        });
        return errors;
    }),
        middleName: Joi.string().required().error(errors => {
        errors.forEach(err => {
            switch (err.type) {
                case "any.empty":
                    err.message = "Отчество - обязательно к заполнению.";
                    break;
                default:
                    break;
            }
        });
        return errors;
    })
    }
}

export function fieldsValidationsAddModal() {
    return {
        lastName: Joi.string().required().error(errors => {
            errors.forEach(err => {
                switch (err.type) {
                    case "any.empty":
                        err.message = "Фамилия - обязательна к заполнению.";
                        break;
                    default:
                        break;
                }
            });
            return errors;
        }),
        firstName: Joi.string().required().error(errors => {
            errors.forEach(err => {
                switch (err.type) {
                    case "any.empty":
                        err.message = "Имя - обязательно к заполнению.";
                        break;
                    default:
                        break;
                }
            });
            return errors;
        }),
        middleName: Joi.string().required().error(errors => {
            errors.forEach(err => {
                switch (err.type) {
                    case "any.empty":
                        err.message = "Отчество - обязательно к заполнению.";
                        break;
                    default:
                        break;
                }
            });
            return errors;
        })
    }
}

export function fieldsValidationsFormLogin(){
    return {
        login: Joi.string().required().error(errors => {
            errors.forEach(err => {
                switch (err.type) {
                    case "any.empty":
                        err.message = "Логин - обязательно к заполнению.";
                        break;
                    default:
                        break;
                }
            });
            return errors;
        }),
            password: Joi.string().alphanum().min(3).max(8).required().error(errors => {
        errors.forEach(err => {
            switch (err.type) {
                case "any.empty":
                    err.message = "Пароль - обязательно к заполнению.";
                    break;
                case "string.min":
                    err.message = `Минимальная длина пароля ${err.context.limit} символов!`;
                    break;
                case "string.max":
                    err.message = `Минимальная длина пароля ${err.context.limit} символов!`;
                    break;
                default:
                    break;
            }
        });
        return errors;
    })
    }
}