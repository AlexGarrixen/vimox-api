import sgMail from '@sendgrid/mail';
import { SENDGRID_API_KEY } from './env';

sgMail.setApiKey(SENDGRID_API_KEY as string);

const isProd = process.env.NODE_ENV === 'production';

const urlCallback = isProd
  ? 'https://gxanime.vercel.app/verify'
  : 'https://localhost:3000/verify';

export { sgMail };

export const templateEmailVerification = (token: string) => `
  <div style='padding: 24px; background: #fdfdfd; box-sizing:border-box; font-family:'Open Sans','Helvetica Neue','Helvetica',Helvetica,Arial,sans-serif'>
    <img src='https://res.cloudinary.com/djiqx3siw/image/upload/v1616550380/logo_eycwgm.png' style='margin: 0; margin-bottom: 12px' />
    <div style='background: #fff; padding: 24px; border: 1px solid #f0f0f0; box-sizing:border-box'>
      <div style='margin-bottom: 32px'>
      <h2 style='margin: 0'>Hola!</h2>
      <p style='margin: 0; margin-top: 12px'>Para completar su registro, verifique su correo electrónico</p>
      </div>
      
    <div style='margin: 32px 0'>
      <a href='${urlCallback}?token=${token}' target='_blank' style='border: none; padding: 12px 24px; background: #348eda; color: white; text-decoration: none; box-sizing:border-box'>Verificar email</a>
    </div>
      
    <p>O verifique usando este link
      <a href='${urlCallback}?token=${token}' target='_blank'>https://gxanime.vercel.app/confirm-email?token=${token}</a>
    </p>
    
    <p style='margin: 0; margin-top: 32px'>Si no creó una cuenta con esta dirección, ignore este correo electrónico.</p>
  </div>
  </div>
`;
