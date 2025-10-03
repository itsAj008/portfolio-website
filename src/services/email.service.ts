import { sendForm } from "@emailjs/browser";
import { constants } from "@/config";

const { serviceId, templateId, publicKey, notificationTemplateId} = constants.emailjs;

export const sendEmail = async (form: HTMLFormElement) => {
  console.log('Service ID:', serviceId);
  console.log('Template ID:', templateId);
  console.log('Public Key:', publicKey);
  console.log('Form:', form);
  await sendForm(serviceId, templateId, form, publicKey);
   await sendForm(serviceId, notificationTemplateId, form, publicKey);
};