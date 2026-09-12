import bcrypt from 'bcrypt';
import * as Yup from 'yup';
import User from '../User.js';

class SessionController {
  async store(request, response) {
    const schema = Yup.object({
      email: Yup.string().email().required(),
      password: Yup.string().min(6).required(),
    });

    const isValid = await schema.isValid(request.body, {
      abortEarly: false,
      strict: true,
    });

    const emailOrPasswordIncorrect = () =>{
      return response
        .status(400)
        .json({ error: 'Email or password incorrect ' });
    }

    if (!isValid) {
        emailOrPasswordIncorrect()
    }

    const { email, password } = request.body;

    // verifica se existe um usuário com o mesmo email //
    const existingUser = await User.findOne({
      where: {
        email,
      },
    });

    //se existir um usuário com o mesmo email //
    if (!existingUser) {
      emailOrPasswordIncorrect();
    }

    const isPasswordCorret = await bcrypt.compare(
      password,
      existingUser.password_hash,
    );

    if (!isPasswordCorret) {
      emailOrPasswordIncorrect();
    }

    return response.json({
      id: existingUser.id,
      name: existingUser.name,
      email: existingUser.email,
      admin: existingUser.admin,
    });
  }
}

export default new SessionController();
