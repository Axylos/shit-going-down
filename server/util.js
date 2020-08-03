export function parsePhone(phone, country) {
  const intPhone = phone.replace(/\D/g, '');

  const countryCode = country === "Israel" ? "972" : "1"; 
  return `+${countryCode}${intPhone}`;
}
