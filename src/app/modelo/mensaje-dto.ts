export class MensajeDTO {
    status!: string;
    error!: boolean;
    result: any;

    constructor(respuesta: string) {
        this.result = respuesta;
    }
}
