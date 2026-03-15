import { MercadoPagoConfig, Preference } from 'mercadopago';

let mpConfigInstance: MercadoPagoConfig | null = null;
let mpPreferenceInstance: Preference | null = null;

function getMercadoPagoToken() {
  const accessToken = process.env.MERCADOPAGO_ACCESS_TOKEN;

  if (!accessToken) {
    throw new Error('MERCADOPAGO_ACCESS_TOKEN is not defined');
  }

  return accessToken;
}

export function getMercadoPagoConfig() {
  if (!mpConfigInstance) {
    mpConfigInstance = new MercadoPagoConfig({
      accessToken: getMercadoPagoToken(),
      options: { timeout: 5000 }
    });
  }

  return mpConfigInstance;
}

export function getMercadoPagoPreference() {
  if (!mpPreferenceInstance) {
    mpPreferenceInstance = new Preference(getMercadoPagoConfig());
  }

  return mpPreferenceInstance;
}
