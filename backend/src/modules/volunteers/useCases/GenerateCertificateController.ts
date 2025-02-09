import { Request, Response } from 'express';
import path from 'path';
import { container } from 'tsyringe';

import { GenerateCertificateUseCase } from './GenerateCertificateUseCase';

class GenerateCertificateController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { volunteer_id } = request.params;

    const generateCertificateUseCase = container.resolve(
      GenerateCertificateUseCase
    );

    // 🛠 Gerar o certificado e obter o caminho do arquivo
    const filePath = await generateCertificateUseCase.execute(volunteer_id);

    // 🔹 Gerar uma URL acessível para o certificado
    const fileName = path.basename(filePath); // Pega apenas o nome do arquivo
    const fileUrl = `${request.protocol}://${request.get(
      'host'
    )}/certificates/${fileName}`;

    return response.status(200).json({
      message: 'Certificado gerado com sucesso!',
      certificate_url: fileUrl,
    });
  }
}

export { GenerateCertificateController };
