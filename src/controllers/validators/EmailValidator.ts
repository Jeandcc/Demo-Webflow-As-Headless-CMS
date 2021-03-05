export default class EmailValidator {
  static validWorkDomains = ['bain.com'].map(a => a.toLowerCase());

  static isValidWorkEmail(email: string): boolean {
    const splitMail = email.toLowerCase().split('@');
    const emailDomain = splitMail[splitMail.length - 1];

    return this.validWorkDomains.includes(emailDomain);
  }
}
