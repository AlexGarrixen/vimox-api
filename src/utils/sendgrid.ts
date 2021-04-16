import sgMail from '@sendgrid/mail';
import { SENDGRID_API_KEY, ORIGIN_CLIENT } from './env';

sgMail.setApiKey(SENDGRID_API_KEY as string);

const urlCallback = `${ORIGIN_CLIENT}/email-verified`;
const urlCallbackResetPassword = `${ORIGIN_CLIENT}/reset-password`;

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
      <a href='${urlCallback}?token=${token}' target='_blank'>${urlCallback}?token=${token}</a>
    </p>
    
    <p style='margin: 0; margin-top: 32px'>Si no creó una cuenta con esta dirección, ignore este correo electrónico.</p>
  </div>
  </div>
`;

export const templateResetPassword = (token: string) => `
  <div style='padding: 24px; background: #fdfdfd; box-sizing:border-box; font-family:'Open Sans','Helvetica Neue','Helvetica',Helvetica,Arial,sans-serif'>
    <img src='https://res.cloudinary.com/djiqx3siw/image/upload/v1616550380/logo_eycwgm.png' style='margin: 0; margin-bottom: 12px' />
    <div style='background: #fff; padding: 24px; border: 1px solid #f0f0f0; box-sizing:border-box'>
      <div style='margin-bottom: 32px'>
      <h2 style='margin: 0'>Hola!</h2>
      <p style='margin: 0; margin-top: 12px'>
        Se ha recibido una solicitud para cambiar la contraseña de su cuenta de GxAnime
      </p>
      </div>
      
    <div style='margin: 32px 0'>
      <a href='${urlCallbackResetPassword}?token=${token}' target='_blank' style='border: none; padding: 12px 24px; background: #348eda; color: white; text-decoration: none; box-sizing:border-box'>Restablecer contraseña</a>
    </div>
      
    <p>O resetea tu contraseña usando este link
      <a href='${urlCallbackResetPassword}?token=${token}' target='_blank'>${urlCallbackResetPassword}?token=${token}</a>
    </p>
    
    <p style='margin: 0; margin-top: 32px'>Si no intento cambiar su constraseña, ignore este correo electrónico.</p>
  </div>
  </div>
`;
