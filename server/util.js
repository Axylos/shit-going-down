export function parsePhone(phone, country) {
  let intPhone = phone.replace(/\D/g, '');

  if (country === "USA" && phone.match(/^0/)) {
    intPhone = intPhone.slice(1); 
  }

  const countryCode = country === "Israel" ? "972" : "1";
  return `+${countryCode}${intPhone}`;
}
