export class Videos {
    constructor(
        private id: string,
        private title: string,
        private duracaoEmSegundos: string,
        private dataDoUpload: string
    ) { }

    public getId(): string {
        return this.id;
    }
    public setId(value: string): void {
        this.id = value;
    }

    public getTitle(): string {
        return this.title;
    }
    public setTitle(value: string): void {
        this.title = value;
    }

    public getDuracaoEmSegundos(): number {
        return this.duracaoEmSegundos;
    }
    public setDuracaoEmSegundos(value: number): void {
        this.duracaoEmSegundos = value;
    }

    public getDataDoUpload(): number {
        return this.dataDoUpload;
    }
    public setDataDoUpload(value: number): void {
        this.dataDoUpload = value;
    }
}