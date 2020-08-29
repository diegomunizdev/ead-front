export class Toast {

    public static getInstance(): Toast {
        return new Toast()
    }

    private static instance: Toast

    private _growl: any

    private constructor() {
        if (!Toast.instance) {
            Toast.instance = this
        }
        return Toast.instance
    }

    set growl(value: any) {
        this._growl = value
    }

    public show(type: string, title: any, message: any) {
        this.clear()
        this._growl.show({ life: 5000, severity: type, summary: title, detail: message})
    }

    public clear() {
        this._growl.clear()
    }

}

export default Toast.getInstance()