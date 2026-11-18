export const CONTACT = {
  name: 'Juliana Angel N. Clado',
  email: 'julianaangel.clado@carsu.edu.ph',
}

export async function copyText(text: string) {
  try {
    await navigator.clipboard.writeText(text)
  } catch {
    const ta = document.createElement('textarea')
    ta.value = text
    document.body.appendChild(ta)
    ta.select()
    document.execCommand('copy')
    ta.remove()
  }
}

/** Downloads a .vcf file that phones and email apps can import as a contact. */
export function saveContact() {
  const vcf = [
    'BEGIN:VCARD',
    'VERSION:3.0',
    'N:Clado;Juliana Angel;N.;;',
    `FN:${CONTACT.name}`,
    `EMAIL;TYPE=INTERNET:${CONTACT.email}`,
    'ORG:Caraga State University',
    'TITLE:BSIT student',
    'END:VCARD',
  ].join('\r\n')
  const url = URL.createObjectURL(new Blob([vcf], { type: 'text/vcard' }))
  const a = document.createElement('a')
  a.href = url
  a.download = 'juliana-clado.vcf'
  document.body.appendChild(a)
  a.click()
  a.remove()
  URL.revokeObjectURL(url)
}
