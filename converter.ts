export class Converter {
    public convert(dashlaneJSON: any): object[] {
        return dashlaneJSON['AUTHENTIFIANT'].map(record => {
            return {
                'Title': record.title,
                'Username': this.determineUsername(record),
                'URL': record.domain,
                'Password': record.password,
                'Notes': record.note,
                'Type': undefined,
            };
        });
    }

    private determineUsername(record: any) {
        const loginOrSecondaryLogin = record.login ? record.login : record.secondaryLogin;
        return loginOrSecondaryLogin ? loginOrSecondaryLogin : record.email;
    }
}