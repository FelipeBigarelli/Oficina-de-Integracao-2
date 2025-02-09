import fs from 'fs';
import path from 'path';
import PDFDocument from 'pdfkit';
import { inject, injectable } from 'tsyringe';

import { AppError } from '../../../errors/AppError';
import { IUsersRepository } from '../../users/repositories/IUsersRepository';
import { IWorkshopsRepository } from '../../workshops/repositories/IWorkshopsRepository';
import { IVolunteersRepository } from '../repositories/IVolunteersRepository';

interface IRequest {
  user_id: string;
  workshop_id: string;
}

@injectable()
class GenerateCertificateUseCase {
  constructor(
    @inject('VolunteersRepository')
    private volunteersRepository: IVolunteersRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('WorkshopsRepository')
    private workshopsRepository: IWorkshopsRepository
  ) {}

  async execute({ user_id, workshop_id }: IRequest): Promise<string> {
    const volunteer = await this.volunteersRepository.findByUserAndWorkshop(
      user_id,
      workshop_id
    );

    if (!volunteer) {
      throw new AppError('Usuário não é voluntário neste workshop.', 404);
    }

    const user = await this.usersRepository.findById(user_id);
    const workshop = await this.workshopsRepository.findById(workshop_id);

    if (!user || !workshop) {
      throw new AppError('Usuário ou Workshop não encontrado.', 404);
    }

    const certificatePath = path.resolve(
      __dirname,
      '../../../../certificates',
      `certificate_${user.id}_${workshop.id}.pdf`
    );

    const certificatesDir = path.dirname(certificatePath);
    if (!fs.existsSync(certificatesDir)) {
      fs.mkdirSync(certificatesDir, { recursive: true });
    }

    const doc = new PDFDocument({ size: 'A4', margin: 50 });

    const stream = fs.createWriteStream(certificatePath);
    doc.pipe(stream);

    doc.rect(20, 20, 555, 800).strokeColor('#2C3E50').lineWidth(5).stroke();
    doc.rect(30, 30, 535, 780).strokeColor('#3498DB').lineWidth(3).stroke();

    doc
      .font('Helvetica-Bold')
      .fontSize(24)
      .fillColor('#2C3E50')
      .text('CERTIFICADO DE PARTICIPAÇÃO', {
        align: 'center',
      });
    doc.moveDown(2);

    doc
      .font('Helvetica')
      .fontSize(16)
      .fillColor('#34495E')
      .text(
        `Certificamos que ${user.name}, portador do RA ${user.RA}, participou do workshop:`,
        {
          align: 'center',
        }
      );
    doc.moveDown();

    doc
      .font('Helvetica-Bold')
      .fontSize(18)
      .fillColor('#2C3E50')
      .text(`"${workshop.title}"`, {
        align: 'center',
      });
    doc.moveDown();

    doc
      .font('Helvetica')
      .fontSize(16)
      .fillColor('#34495E')
      .text(`Com duração total de ${workshop.duration} horas.`, {
        align: 'center',
      });
    doc.moveDown(2);

    doc
      .fontSize(14)
      .fillColor('#7F8C8D')
      .text('Emitido em:', { align: 'center' });
    doc
      .font('Helvetica-Bold')
      .text(new Date().toLocaleDateString('pt-BR'), { align: 'center' });
    doc.moveDown(3);

    const signaturePath = path.resolve(
      __dirname,
      '../../../assets/signature.png'
    );
    if (fs.existsSync(signaturePath)) {
      doc.image(signaturePath, 200, 350, { width: 200 });
    }

    doc
      .fontSize(14)
      .fillColor('#2C3E50')
      .text('__________________________', { align: 'center' });
    doc
      .fontSize(12)
      .fillColor('#34495E')
      .text('Coordenador do Workshop', { align: 'center' });

    doc.end();

    return new Promise((resolve, reject) => {
      stream.on('finish', () => resolve(certificatePath));
      stream.on('error', (err) => reject(err));
    });
  }
}

export { GenerateCertificateUseCase };
