import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import phrasalVerbs from '../../data/phrasal-verbs.json';

export async function POST() {
  try {
    // Verificar se as variáveis de ambiente estão configuradas
    if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
      console.error('Variáveis de ambiente não encontradas:', {
        user: process.env.GMAIL_USER ? 'Definido' : 'Não definido',
        pass: process.env.GMAIL_APP_PASSWORD ? 'Definido' : 'Não definido'
      });
      throw new Error('Configurações de email não encontradas. Verifique o arquivo .env');
    }

    // Selecionar um phrasal verb aleatório
    const randomPhrasalVerb = phrasalVerbs[Math.floor(Math.random() * phrasalVerbs.length)];

    console.log('Configurando transporter com:', {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD ? '****' : 'Não definido'
    });

    // Configurar o transporter do nodemailer com Gmail
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    // Verificar a conexão
    try {
      await transporter.verify();
      console.log('Conexão SMTP verificada com sucesso');
    } catch (verifyError) {
      console.error('Erro ao verificar conexão SMTP:', verifyError);
      throw new Error('Falha na conexão com o servidor de email');
    }

    const currentDate = new Date().toLocaleString('pt-BR');
    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: 'marcospaulobb@gmail.com',
      subject: `🇬🇧 Lição Diária de Phrasal Verb: ${randomPhrasalVerb.verb} - ${currentDate}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #333;">
          <h1 style="text-align: center; color: #1a56db; margin-bottom: 30px;">
            🇬🇧 LIÇÃO DIÁRIA DE INGLÊS 🇬🇧
          </h1>

          <h2 style="color: #2563eb; margin-bottom: 20px;">
            PHRASAL VERB: ${randomPhrasalVerb.verb}
          </h2>

          <p style="font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
            Olá, Marcos Paulo! How are you doing today?
          </p>

          <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <h3 style="color: #1e40af; margin-bottom: 15px;">
              1. Definição e significados do phrasal verb "${randomPhrasalVerb.verb}":
            </h3>
            <p style="margin-bottom: 10px;">
              O phrasal verb "${randomPhrasalVerb.verb}" pode ter diversos significados, como:
            </p>
            <ul style="list-style-type: disc; margin-left: 20px;">
              ${randomPhrasalVerb.meanings.map(meaning => `<li>${meaning}</li>`).join('')}
            </ul>
          </div>

          <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <h3 style="color: #1e40af; margin-bottom: 15px;">
              2. Em quais contextos este phrasal verb é mais comumente utilizado:
            </h3>
            <p>
              ${randomPhrasalVerb.contexts}
            </p>
          </div>

          <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <h3 style="color: #1e40af; margin-bottom: 15px;">
              3. Exemplos de frases com o phrasal verb em contextos diferentes:
            </h3>
            <ul style="list-style-type: none; margin-left: 0;">
              ${randomPhrasalVerb.examples.map(example => `<li style="margin-bottom: 10px;">• ${example}</li>`).join('')}
            </ul>
          </div>

          <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <h3 style="color: #1e40af; margin-bottom: 15px;">
              4. Diálogo curto entre duas pessoas usando o phrasal verb:
            </h3>
            <p style="font-style: italic;">
              A: ${randomPhrasalVerb.dialogue.A}<br>
              B: ${randomPhrasalVerb.dialogue.B}
            </p>
          </div>

          <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <h3 style="color: #1e40af; margin-bottom: 15px;">
              5. Cena famosa de filme, série ou livro onde este phrasal verb é utilizado:
            </h3>
            <p>
              ${randomPhrasalVerb.movieExample}
            </p>
          </div>

          <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <h3 style="color: #1e40af; margin-bottom: 15px;">
              6. Dica para memorizar este phrasal verb:
            </h3>
            <p>
              ${randomPhrasalVerb.memorizationTip}
            </p>
          </div>

          <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <h3 style="color: #1e40af; margin-bottom: 15px;">
              7. Exercícios de gramática para praticar o phrasal verb:
            </h3>
            <p style="margin-bottom: 10px;">
              a) Complete as frases com "${randomPhrasalVerb.verb}" na forma correta:
            </p>
            <ol style="margin-left: 20px;">
              ${randomPhrasalVerb.exercises.map(exercise => `<li style="margin-bottom: 5px;">${exercise}</li>`).join('')}
            </ol>
          </div>

          <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <h3 style="color: #1e40af; margin-bottom: 15px;">
              8. Sentido etimológico do phrasal verb:
            </h3>
            <p>
              ${randomPhrasalVerb.etymology}
            </p>
          </div>

          <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
            <p style="margin-bottom: 10px;">Seu professor de inglês.</p>
            <p style="color: #059669; font-weight: bold;">✅ Pratique este phrasal verb hoje durante o dia!</p>
          </div>
        </div>
      `,
    };

    console.log('Enviando email para:', mailOptions.to);

    // Enviar o email
    const info = await transporter.sendMail(mailOptions);
    console.log('Email enviado:', info);

    return NextResponse.json({ 
      success: true,
      messageId: info.messageId,
      response: info.response
    });
  } catch (error: unknown) {
    let message = 'Erro ao enviar email';
    let details = '';
    if (error instanceof Error) {
      message = error.message;
      details = error.stack || '';
    }
    return NextResponse.json(
      {
        error: message,
        details
      },
      { status: 500 }
    );
  }
} 