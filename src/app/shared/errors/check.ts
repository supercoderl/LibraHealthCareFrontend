export class CheckErrorService {
    hasErrors(errors: any): boolean {
        return errors && Object.keys(errors).length > 0;
    }
}