import fs from 'fs';
import path from 'path';
import PDFDocument from 'pdfkit';
import { inject, injectable } from 'tsyringe';

import { AppError } from '../../../errors/AppError';
import { IVolunteersRepository } from '../repositories/IVolunteersRepository';

@injectable()
class GenerateCertificateUseCase {
  constructor(
    @inject('VolunteersRepository')
    private volunteersRepository: IVolunteersRepository
  ) {}

  async execute(volunteer_id: string): Promise<string> {
    // 🔹 1. Buscar o voluntário pelo ID
    const volunteer = await this.volunteersRepository.findById(volunteer_id);

    if (!volunteer) {
      throw new AppError('Voluntário não encontrado', 404);
    }

    // 🔹 2. Calcular tempo total de voluntariado
    const start = new Date(volunteer.start_date);
    const end = volunteer.end_date ? new Date(volunteer.end_date) : new Date();

    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const diffMonths = Math.floor(diffDays / 30);

    const durationText =
      volunteer.end_date !== null
        ? `Participou do projeto por ${diffMonths} meses (${diffDays} dias).`
        : 'Ainda ativo como voluntário.';

    // 🔹 3. Criar o PDF do certificado
    const doc = new PDFDocument({ size: 'A4', margin: 50 });

    const filePath = path.join(
      __dirname,
      `../../../certificates/certificate_${volunteer.id}.pdf`
    );
    const stream = fs.createWriteStream(filePath);
    doc.pipe(stream);

    // 🔹 4. Adicionar informações ao certificado
    doc
      .fontSize(24)
      .text('CERTIFICADO DE PARTICIPAÇÃO', { align: 'center' })
      .moveDown();

    doc
      .fontSize(16)
      .text(
        `Certificamos que o aluno ${volunteer.name}, portador do RA ${volunteer.RA}, participou como voluntário no projeto de extensão Ensino Lúdico de Lógica e Programação.`,
        { align: 'justify' }
      )
      .moveDown();

    doc.fontSize(14).text(durationText).moveDown();

    doc
      .fontSize(14)
      .text('Assinatura do Coordenador:', { align: 'left' })
      .moveDown();

    doc.image(path.join(__dirname, '../../../assets/signature.png'), {
      fit: [200, 50],
      align: 'center',
    });

    doc.end();

    return filePath;
  }
}

export { GenerateCertificateUseCase };
