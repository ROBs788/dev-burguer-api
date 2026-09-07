import { v4 } from 'uuid';
import User from '../User.js';
import * as Yup from 'yup';
import bcrypt from 'bcrypt';

/*
//  UserController
store -> criar dado
index -> lista todos os dados
show -> lista dados
update -> atualizar dados
delete -> remove dados

*/

class UserController {
  // configuração de formatação de dados //
  async store(request, response) {
    const schema = Yup.object({
      name: Yup.string().required(),
      email: Yup.string().email().required(),
      password: Yup.string().required().min(6),
      admin: Yup.boolean(),
    });

    // valida os dados recebidos //
    try {
      schema.validateSync(request.body, { abortEarly: false, strict: true });
    } catch (err) {
      return response.status(400).json({ error: err.errors });
    }

    // pega os dados do corpo da requisição //
    const { name, email, password, admin } = request.body;

    // verifica se existe um usuário com o mesmo email //
    const existingUser = await User.findOne({
      where: {
        email,
      },
    });

    //se existir um usuário com o mesmo email //
    if (existingUser) {
      return response.status(400).json({ message: 'Email already taken!' });
    }

    // criptografa a senha do usuário //
    const password_hash = await bcrypt.hash(password, 10);

    // cria o usuário //
    const user = await User.create({
      id: v4(),
      name,
      email,
      password_hash,
      admin,
    });

    // retorna os dados do usuário criado //
    return response.status(201).json({
      id: user.id,
      name: user.name,
      email: user.email,
      admin: user.admin,
    });
  }
}

export default new UserController();
