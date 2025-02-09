import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { GenerateCertificateUseCase } from './GenerateCertificateUseCase';

class GenerateCertificateController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id: user_id } = request.user;
    const { workshop_id } = request.params;

    const generateCertificateUseCase = container.resolve(
      GenerateCertificateUseCase
    );

    const filePath = await generateCertificateUseCase.execute({
      user_id,
      workshop_id,
    });

    return response.status(200).json({
      message: 'Certificado gerado com sucesso!',
      certificate_url: `${request.protocol}://${request.get(
        'host'
      )}/certificates/${filePath.split('/').pop()}`,
    });
  }
}

export { GenerateCertificateController };
