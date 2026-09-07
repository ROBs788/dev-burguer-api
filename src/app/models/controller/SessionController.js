import * as Yup from 'yup';

class SessionController {
    async store(request, response) {
        const schema = Yup.object({
            email: Yup.string().email().required(),
            password: Yup.string().required()
        });

        const isValid = await schema.isValid(request.body, {
            abortEarly: false,
            strict: true,
        });

        if (!isValid) {
            return response
                .status(400)
                .json({ error: 'Email or passsword incorrect ' });
        }

        const { email, password } = request.body;
        return response.status(200).json({ ok: true });
    }
}

export default new SessionController();